import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartPage from './screens/StartPage';
import HomePage from './screens/HomePage';
import MyPage from './screens/MyPage';
import HomePageRoomManager from './screens/HomePageRoomManager'
import MainPage from './screens/MainPage';
import RoomListPage from './screens/RoomListPage'
import RoomCodePage from './screens/RoomCodePage'
import OAuthRedirectPage from './screens/OAuthRedirectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/oauth" element={<OAuthRedirectPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/roommanager" element={<HomePageRoomManager />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/roomlist" element={<RoomListPage />} />
        <Route path="/roomcode" element={<RoomCodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
