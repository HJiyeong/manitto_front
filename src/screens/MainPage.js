import React from 'react';
import Layout1 from '../components/Layout1'
import Main from '../assets/images/main.png'
import { useNavigate } from 'react-router-dom';

const MainPage = ({ username = "000", manittoName = "000" }) => {
  const navigate = useNavigate();
  return (
    <Layout1 roomName="몰입캠프1">
        <div style={{ textAlign: 'center' }}>
        <h1>{username}의 마니또는 {manittoName}입니다.</h1>
        <div
        style={{
            backgroundColor: 'white',        
            padding: '20px',                 
            borderRadius: '50px',            
            display: 'inline-block',         
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  
            margin: '20px 0',
        }}
        >
        <button
        onClick={() => console.log('이미지 클릭됨')}
        style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            display: 'inline-block',
            transform: 'scale(1)',
            transition: 'transform 0.1s ease',
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
        <img
            src={Main}
            style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '16px',
            display: 'block',
            }}
        />
        </button>

        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '50px'
        }}>
          <button
          onClick={() => navigate('/mission')} 
          style={{
            backgroundColor: '#000000ff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            미션 기록하기
          </button>
          <button 
          style={{
              backgroundColor: '#000000ff',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              오늘의 미션
          </button>
          <button style={{
              backgroundColor: '#000000ff',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              마니또 맞추기
          </button>

        </div>

        </div>
      </div>
    </Layout1>
  );
};

export default MainPage;
