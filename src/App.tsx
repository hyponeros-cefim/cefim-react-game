import { useState } from 'react';
import Menu from './components/menu/Menu';
import Game from './components/game/Game';
import { EAppStatus } from './components/types/AppStatus.enum';
import LeaderBoard from './components/game-over/LeaderBoad';

function App() {
  const [status, setStatus] = useState(EAppStatus.MENU);

  const version = '0.0.1';

  const handlePlay = () => {
    if (status === EAppStatus.MENU) {
      setStatus(EAppStatus.GAME);
    }
  };

  const handleLeaderBoard = () => {
    if (status === EAppStatus.GAME) {
      setStatus(EAppStatus.LEADERBOARD);
    }
  };

  return (
    <>
      {status === EAppStatus.MENU && <Menu version={version} onPlay={handlePlay} />}
      {status === EAppStatus.GAME && <Game onGameOver={handleLeaderBoard} />}
      {status === EAppStatus.LEADERBOARD && <LeaderBoard />}
    </>
  );
}

export default App;
