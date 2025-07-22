import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import startBg from '../assets/images/start_background.png';
import { kakaoLogin } from '../hooks/useAuth';

const LoginPage = () => {
  return (
    <Layout innerBackground={startBg}>
      <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection : 'column',
          justifyContent : 'center',
          alignItems : 'center',
          height : '100vh',
          textAlign: 'center',
          
        }}>
        <h1>John's</h1>
        <h1>Manitto</h1>
        <button onClick={kakaoLogin}>카카오 로그인</button>


      </div>
    </Layout>
  );
};

export default LoginPage;
