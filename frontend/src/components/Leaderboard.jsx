import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 className="leaderboard-heading">Leaderboard</h2>
      <div className="sub-heading-leaderboard">
        {users.map(user => (
          <div key={user._id} className="leaderboard-list">
            <span>{user.rank}. {user.name}</span>
            <span>{user.totalPoints} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
