import React from 'react';
import Layout from '../components/Layout';
import startBg from '../assets/images/start_background.png';
import { kakaoLogin } from '../hooks/useAuth';
import kakaoLoginBtn from '../assets/images/buttons/kakao_login_large_wide.png';

const LoginPage = () => {
  return (
    <Layout innerBackground={startBg}>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <h1>John's</h1>
        <h1>Manitto</h1>
        <img
          src={kakaoLoginBtn}
          onClick={kakaoLogin}
          style={{ width: '400px', cursor: 'pointer' }}
        />
      </div>
    </Layout>
  );
};

export default LoginPage;
