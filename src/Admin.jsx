import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from './firebaseConfig';
import './Admin.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch members from Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      const membersCollection = collection(db, 'members');
      const membersSnapshot = await getDocs(membersCollection);
      const membersList = membersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersList);
    };

    fetchMembers();
  }, []);

  // Add a new member to Firestore
  const handleAddMember = async () => {
    setError('');

    if (!name.trim() || !phone.trim() || !subscriptionEndDate.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const phoneRegex = /^\+91[0-9]{10}$/;
    if (!phone.startsWith('+91')) {
      setPhone('+91' + phone);
    }
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const newMember = { name, phone, subscriptionEndDate };
      const docRef = await addDoc(collection(db, 'members'), newMember);
      setMembers([...members, { ...newMember, id: docRef.id }]);
      setName('');
      setPhone('');
      setSubscriptionEndDate('');
      alert('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Error adding member. Please try again.');
    }
  };

  // Delete a member from Firestore
  const handleDeleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, 'members', id));
      setMembers(members.filter((member) => member.id !== id));
      alert('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Error deleting member. Please try again.');
    }
  };

  // Send WhatsApp notification
  const sendWhatsAppNotification = async (phone, message) => {
    try {
      const response = await fetch('http://localhost:5000/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, message }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Notification sent successfully');
      } else {
        console.error('Failed to send notification:', data.error);
      }
    } catch (error) {
      console.error('Error calling backend:', error);
    }
  };

  // Check for expiring subscriptions and send notifications
  const checkExpiringSubscriptions = async () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    console.log('Today:', today); // Log today's date
    console.log('All members:', members); // Log all members
  
    const expiringMembers = members.filter(
      (member) => member.subscriptionEndDate === today
    );
  
    console.log('Expiring members:', expiringMembers); // Log expiring members
  
    if (expiringMembers.length === 0) {
      console.log('No members with expiring subscriptions today.');
      alert('No members with expiring subscriptions today.');
      return;
    }
  
    expiringMembers.forEach((member) => {
      const message = `Hi ${member.name}, THIS IS FROM BLACK FITNESS GYM, your gym subscription has expired. Please renew to continue enjoying our services!`;
      sendWhatsAppNotification(member.phone, message);
    });

    alert('Notifications sent to members with expiring subscriptions.');
  };

  // Filter members based on search query
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="add-member-form">
        <h3>Add Member</h3>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter member name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subscription End Date:</label>
          <input
            type="date"
            value={subscriptionEndDate}
            onChange={(e) => setSubscriptionEndDate(e.target.value)}
          />
        </div>
        <button className="add-member-button" onClick={handleAddMember}>
          Add Member
        </button>
      </div>
      <div className="member-list">
        <h3>Member List</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Subscription End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers
              .sort(
                (a, b) =>
                  new Date(a.subscriptionEndDate) - new Date(b.subscriptionEndDate)
              )
              .map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.phone}</td>
                  <td>{member.subscriptionEndDate}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Button to check for expiring subscriptions */}
      <button className="check-subscriptions-button" onClick={checkExpiringSubscriptions}>
        Check Expiring Subscriptions
      </button>
    </div>
  );
};

export default Admin;