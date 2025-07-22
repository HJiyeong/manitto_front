import React, { useState } from 'react';
import Layout from '../components/Layout';
import startBg from '../assets/images/makeroom_background.png';
import ICimage from '../assets/images/basic_background.png';

const MakeRoomPage = ({ nickname = '홍길동' }) => {
  const [roomName, setRoomName] = useState('');
  const [revealDate, setRevealDate] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Layout innerBackground={startBg}>
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 20px',
        boxSizing: 'border-box',
      }}>
        {/* 상단 제목 */}
        <h1 style={{ fontSize: '64px', fontWeight: 'bold' , marginBottom: '40px' }}>
          방 파기
        </h1>

        {/* 방 이름 */}
        <div style={{ width: '100%', maxWidth: '400px',marginTop: '50px', marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}>방 이름</div>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="방 이름을 입력하세요"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: 'none',
              borderBottom: '2px solid #aaa',
              outline: 'none',
              background: 'transparent',
              textAlign: 'center',
            }}
          />
        </div>

        {/* 방장 이름 */}
        <div style={{ width: '100%', maxWidth: '400px',  marginBottom: '60px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}>방장</div>
          <div style={{
            fontWeight: 'bold',
            fontSize: '20px',
            textAlign: 'center',
          }}>
            {nickname}
          </div>
        </div>

        {/* 마니또 마감 기간 */}
        <div style={{ width: '100%', maxWidth: '400px', marginTop: '100px', marginBottom: '30px' }}>
          <div style={{ fontSize: '28px', color: '#666', marginBottom: '8px' }}>마니또 마감 기간</div>
          <input
            type="date"
            value={revealDate}
            onChange={(e) => setRevealDate(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: 'none',
              borderBottom: '2px solid #aaa',
              background: 'transparent',
              textAlign: 'center',
              outline: 'none',
            }}
          />
        </div>

        {/* 설명 */}
        <div style={{ width: '100%', maxWidth: '400px', marginTop: '100px', marginBottom: '50px' }}>
          <div style={{ fontSize: '28px', color: '#666', marginBottom: '8px' }}>설명</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="그룹에 대한 설명을 입력하세요"
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: 'none',
              borderBottom: '2px solid #aaa',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
            }}
          />
        </div>

        {/* 버튼 */}
        <button
          style={{
            backgroundImage: `url(${ICimage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginTop: '100px',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            borderRadius: '30px',
            padding: '16px 24px',
            width: '80%',
            maxWidth: '400px',
            cursor: 'pointer',
          }}
          onClick={() => {
            console.log({ roomName, revealDate, description });
          }}
        >
          코드 생성
        </button>
      </div>
    </Layout>
  );
};

export default MakeRoomPage;
