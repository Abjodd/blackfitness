import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from './firebaseConfig';

const Admin = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [members, setMembers] = useState([]);

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
    if (name.trim() && phone.trim()) {
      const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      try {
        const newMember = { name, phone };
        await addDoc(collection(db, 'members'), newMember);
        setMembers([...members, { ...newMember, id: Date.now() }]);
        setName('');
        setPhone('');
        alert('Member added successfully');
      } catch (error) {
        console.error('Error adding member:', error);
        alert('Error adding member. Please try again.');
      }
    } else {
      alert('Please enter both name and phone number.');
    }
  };

  return (
    <div className="content">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Member</h3>
        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddMember}>Add Member</button>
      </div>
      <div>
        <h3>Member List</h3>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} - {member.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
