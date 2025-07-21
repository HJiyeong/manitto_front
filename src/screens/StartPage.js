import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import startBg from '../assets/images/start_background.png';
import { kakaoLogin } from '../hooks/useAuth';

const StartPage = () => {
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
        <Link to="/roomlist">
          <button style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#81d2f7ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
            시작하기
          </button>
        </Link>
        <Link to="/roommanager">

          <button style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#81d2f7ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
            방장 기능 사용하기
          </button>
        </Link>


      </div>
    </Layout>
  );
};

export default StartPage;
