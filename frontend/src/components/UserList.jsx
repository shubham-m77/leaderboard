import { useState, useEffect } from 'react';
import { api } from '../api';

export default function UserList({ onClaim }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!newUser) return;
    await api.post('/users', { name: newUser });
    setNewUser('');
    fetchUsers();
  };

  const handleClaim = async () => {
    if (!selected) return;
    const res = await api.post('/claim', { userId: selected });
    onClaim(res.data);
    fetchUsers();
  };

  return (
    <div className="userList">
      <select onChange={(e) => setSelected(e.target.value)} className="userSelector">
        <option value="">Select User</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>

      <div className="flex">
        <input
          className=""
          placeholder="New user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button className="addBtn" onClick={handleAddUser}>Add</button>
      </div>

      <button onClick={handleClaim} className="claimBtn">
        Claim Points
      </button>
    </div>
  );
}
