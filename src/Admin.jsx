import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from './firebaseConfig';
import './Admin.css'; // Import a CSS file for styling

const Admin = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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
    setError(''); // Clear previous errors

    if (!name.trim() || !phone.trim() || !subscriptionEndDate.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number validation
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
        {/* Search Bar */}
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
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.subscriptionEndDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;