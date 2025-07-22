import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import startBg from '../assets/images/start_background.png';

const StartPage = () => {
  // 닉네임을 백엔드에서 받아오는 구조로 교체 예정
  const [nickname, setNickname] = useState(null); // 닉네임이 없으면 null
  const [showModal, setShowModal] = useState(false);
  const [inputNickname, setInputNickname] = useState('');

  useEffect(() => {
    // TODO: 카카오 로그인 후 백엔드에서 닉네임 확인
    const fetchNickname = async () => {
      // 예시:
      // const response = await fetch('/api/user');
      // const data = await response.json();
      // setNickname(data.nickname);

      // 현재는 더미로 진행:
      setNickname(null);  // 닉네임 없다고 가정
    };

    fetchNickname();
  }, []);

  // 닉네임 저장 후 모달 닫기
  const handleSaveNickname = () => {
    if (inputNickname.trim() !== '') {
      setNickname(inputNickname.trim());
      setShowModal(false);

      // TODO: 닉네임 백엔드로 저장 API 호출
    }
  };

  useEffect(() => {
    if (nickname === null) {
      setShowModal(true);
    }
  }, [nickname]);

  return (
    <Layout innerBackground={startBg}>
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center'
        }}>

        {nickname ? (
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{nickname}님 안녕하세요!</h2>
        ) : (
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>환영합니다!</h2>
        )}

        <h1 style={{ marginTop: '10px' }}>John's Manitto</h1>

        <Link to="/roomlist">
          <button style={buttonStyle}>시작하기</button>
        </Link>

        <Link to="/roommanager">
          <button style={buttonStyle}>방장 기능 사용하기</button>
        </Link>

        {showModal && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3>닉네임을 입력해주세요</h3>
              <input
                type="text"
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                style={{
                  width: '80%',
                  padding: '10px',
                  margin: '20px 0',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc'
                }}
              />
              <button onClick={handleSaveNickname} style={buttonStyle}>
                저장하기
              </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

const buttonStyle = {
  marginTop: '20px',
  padding: '12px 24px',
  fontSize: '16px',
  backgroundColor: '#81d2f7ff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalBox = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '30px 20px',
  textAlign: 'center',
  width: '300px'
};

export default StartPage;
