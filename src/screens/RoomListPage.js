import React from 'react';
import Layout from '../components/Layout';
import startBg from '../assets/images/roomlist_background.png'; 
import IC from '../assets/images/ic.png';
import ICimage from '../assets/images/basic_background.png';
import { useNavigate } from 'react-router-dom';

const RoomListPage = ({ username = '지영', roomList = [{ name: '몰입캠프 1', date: '2025.07.19.' }] }) => {
  const navigate = useNavigate();
  return (
    <Layout innerBackground={startBg}>   

      <div style={{ 
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        
        {/* 1. 상단 멘트 */}
        <div style={{
          fontSize: '80px',
          fontWeight: 'bold',
          marginTop: '40px',
          marginBottom: '40%',
          textAlign: 'center',
        }}>
          {username}님의<br />방 목록
        </div>

        {/* 2. 방 카드 리스트 */}
        {roomList.length > 0 && roomList.map((room, index) => (
          <div key={index} 
          onClick={() => navigate('/home')}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            padding: '10px 16px',
            width: '90%',
            maxWidth: '400px',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
          }}>
            <img src={IC} alt="아이콘" style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{room.name}</div>
              <div style={{ fontSize: '12px', color: '#555' }}>{room.date}</div>
            </div>
          </div>
        ))}

        {/* 3. 방 추가하기 버튼 */}
        <button 
        onClick={() => navigate('/roomcode')}
        style={{
          backgroundImage: `url(${ICimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          borderRadius: '30px',
          padding: '16px 24px',
          marginTop: '50px',
          width: '80%',
          maxWidth: '400px',
        }}>
          방 추가하기
        </button>

      </div>

    </Layout>
  );
};

export default RoomListPage;
