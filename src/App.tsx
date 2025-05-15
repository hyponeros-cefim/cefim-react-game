import Menu from './pages/Menu';
import LeaderBoard from './pages/LeaderBoad';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import { EPages } from './pages/types/Epages.enum';

function App() {
  const version = '0.0.1';

  return (
    <BrowserRouter>
      <Routes>
        <Route path={EPages.MENU} element={<Menu version={version} />} />
        <Route path={EPages.GAME} element={<Game />} />
        <Route path={EPages.LEADERBOARD} element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
