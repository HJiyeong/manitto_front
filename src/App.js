import React from 'react';
import './App.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginPage from './screens/LoginPage'
import StartPage from './screens/StartPage';
import HomePage from './screens/HomePage';
import MyPage from './screens/MyPage';
import HomePageRoomManager from './screens/HomePageRoomManager';
import MainPage from './screens/MainPage';
import RoomListPage from './screens/RoomListPage';
import RoomCodePage from './screens/RoomCodePage';
import OAuthRedirectPage from './screens/OAuthRedirectPage';
import ProtectedRoute from './components/ProtectedRoute';
import MakeRoom from './screens/MakeRoomPage'
import MissionPage from './screens/MissionPage'
import MissionWritePage from './screens/MissionWritePage'


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/** 로그인 전 접근 가능한 페이지 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/start" element={<StartPage />} />

          <Route path="/oauth" element={<OAuthRedirectPage />} />

          {/** 로그인 후 접근 가능한 페이지 */}
          <Route
            path="/home/:groupCode"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/makeroom"
            element={
              <ProtectedRoute>
                <MakeRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roommanager"
            element={
              <ProtectedRoute>
                <HomePageRoomManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/:groupCode"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roomlist"
            element={
              <ProtectedRoute>
                <RoomListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roomcode"
            element={
              <ProtectedRoute>
                <RoomCodePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mission/:groupCode"
            element={
              <ProtectedRoute>
                <MissionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missionwrite/:groupCode"
            element={
              <ProtectedRoute>
                <MissionWritePage />
              </ProtectedRoute>
            }
          />


          
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

