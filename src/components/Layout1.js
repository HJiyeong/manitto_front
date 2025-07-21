import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bgFull from '../assets/images/web_background.png';
import bgInner from '../assets/images/basic_background.png';
import sidebarBg from '../assets/images/side_background.png';
import mypageIcon from '../assets/images/ic_mypage.png';
import sideIcon from '../assets/images/ic_side.png';

const Layout1 = ({ children, innerBackground, roomName = '(나중에 백엔드에서 받는 방 이름)' }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const menuButtonStyle = {
  width: '100%',
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'black',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 8px',
  margin: '50px 0',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
};



  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${bgFull})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '618px',
        minHeight: '100vh',
        backgroundImage: `url(${innerBackground || bgInner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffffcc',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            style={{
              width: '40px',
              height: '40px',
              marginLeft : '5%',
              backgroundImage: `url(${sideIcon})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          />

        <button
        onClick={() => navigate('/mypage')}
        style={{
            width: '40px',
            height: '40px',
            marginRight: '5%',
            backgroundImage: `url(${mypageIcon})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
        }}
        />

        </div>

        <div style={{ margin: 50 }}>
        <h2 style={{
            margin: 0,               
            fontSize: '50px',
            fontWeight: 'bold',
            color: '#333',
        }}>
            Hi Manitto
        </h2>
        <p style={{
            marginTop: '8px',        
            marginBottom: 0,
            fontSize: '14px',
            color: '#666',
        }}>
            {roomName}
        </p>
        </div>


        <div
        style={{
            position: 'absolute',
            top: 0,
            left: sidebarVisible ? '0' : '-200px',
            width: '200px',
            height: '100%',
            backgroundImage: `url(${sidebarBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'left 0.3s ease',
            padding: '16px',
            boxSizing: 'border-box',
            zIndex: 10,
        }}
        >
        <button
            onClick={() => setSidebarVisible(false)}
            style={{
            width: '60px',
            height: '60px',
            marginBottom: '100px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            color: 'black',
            cursor: 'pointer',
            }}
        >
            ✖
        </button>

        <button 
            style={menuButtonStyle}
            onClick={() => navigate('/')}
        >
            시작화면
        </button>

        <button style={menuButtonStyle}>
            미션 기록하기
        </button>

        <button style={menuButtonStyle}>
            로그아웃
        </button>
        </div>


       <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout1;
