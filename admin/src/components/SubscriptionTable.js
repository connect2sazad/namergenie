import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:5001/subscriptions')
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subscriptions!", error);
      });
  }, []);

  // Handle editing a subscription
  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingSubscription({
      ...editingSubscription,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5001/subscriptions/${editingSubscription._id}`, editingSubscription)
      .then(response => {
        const updatedSubscriptions = subscriptions.map(sub =>
          sub._id === editingSubscription._id ? response.data : sub
        );
        setSubscriptions(updatedSubscriptions);
        setEditingSubscription(null);
      })
      .catch(error => {
        console.error("Error updating subscription", error);
      });
  };

  return (
    <div>
      <h2>Subscriptions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(sub => (
            <tr key={sub._id}>
              <td>{sub._id}</td>
              <td>{sub.email}</td>
              <td>{sub.status}</td>
              <td>
                <button onClick={() => handleEdit(sub)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSubscription && (
        <div>
          <h3>Edit Subscription</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input
              type="text"
              name="email"
              value={editingSubscription.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="status"
              value={editingSubscription.status}
              onChange={handleChange}
              placeholder="Status"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTable;
