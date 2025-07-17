import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import History from './components/History';
import { useState } from 'react';

function App() {
  const [lastClaim, setLastClaim] = useState(null);

  return (
    <div className="main-div">
      <h1 className="leaderboard-header">Leaderboard System</h1>

      <UserList onClaim={(data) => setLastClaim(data)} />

      {lastClaim && (
        <div className="claimDtl">
          Awarded {lastClaim.points} points!
        </div>
      )}

      <Leaderboard />
      <History />
    </div>
  );
}

export default App;
