import { useEffect, useState } from 'react';
import { api } from '../api';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/history');
      setHistory(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 className="history-header">Claim History</h2>
      <div className="history-div">
        {history.map((entry, i) => (
          <div key={i} className="history-map">
            <span>{entry.userId.name}</span>
            <span>{entry.points} pts</span>
            <span>{new Date(entry.claimedAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
