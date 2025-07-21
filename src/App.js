import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StartPage from './screens/StartPage';
import HomePage from './screens/HomePage';
import MyPage from './screens/MyPage';
import HomePageRoomManager from './screens/HomePageRoomManager'
import MainPage from './screens/MainPage';
import RoomListPage from './screens/RoomListPage'
import RoomCodePage from './screens/RoomCodePage'
import MakeRoomPage from './screens/MakeRoomPage'

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/roommanager" element={<HomePageRoomManager />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/roomlist" element={<RoomListPage />} />
          <Route path="/roomcode" element={<RoomCodePage />} />
          <Route path="/makeroom" element={<MakeRoomPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

