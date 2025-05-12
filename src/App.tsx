import { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';

function App() {
  const [status, setStatus] = useState('menu');

  const version = '0.0.1';

  const handlePlay = () => {
    if (status === 'menu') {
      setStatus('game');
    }
  };

  return (
    <>
      {status === 'menu' && <Menu version={version} onPlay={handlePlay} />}
      {status === 'game' && <Game />}
    </>
  );
}

export default App;
