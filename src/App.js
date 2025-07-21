import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StartPage from './screens/StartPage';
import HomePage from './screens/HomePage';
import MyPage from './screens/MyPage';
import HomePageRoomManager from './screens/HomePageRoomManager';
import MainPage from './screens/MainPage';
import RoomListPage from './screens/RoomListPage';
import RoomCodePage from './screens/RoomCodePage';
import OAuthRedirectPage from './screens/OAuthRedirectPage';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/** 로그인 전 접근 가능한 페이지 */}
          <Route path="/" element={<StartPage />} />
          <Route path="/oauth" element={<OAuthRedirectPage />} />

          {/** 로그인 후 접근 가능한 페이지 */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
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
            path="/main"
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
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

