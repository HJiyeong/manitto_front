import React, { useState } from 'react';
import Layout1 from '../components/Layout1';
import Main from '../assets/images/main.png';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ username = "000", manittoName = "000" }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [missions, setMissions] = useState({
    eatTogether: false,
    giveCompliment: false
  });

  const toggleMission = (missionKey) => {
    setMissions(prev => ({
      ...prev,
      [missionKey]: !prev[missionKey]
    }));

    // TODO: 여기에 백엔드로 체크 상태 저장 (API 호출)
  };

  return (
    <Layout1 roomName="몰입캠프1">
      <div style={{ textAlign: 'center' }}>
        <h1>{username}의 마니또는 {manittoName}입니다.</h1>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '50px',
          display: 'inline-block',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          margin: '20px 0',
        }}>
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
            marginTop: '5px',
            display: 'flex',
            justifyContent: 'center',
            gap: '30px'
          }}>
            <button
              onClick={() => navigate('/mission')}
              style={buttonStyle}>
              미션 기록하기
            </button>

            <button
              onClick={() => setShowModal(true)}
              style={buttonStyle}>
              필수 미션
            </button>

            <button style={buttonStyle}>
              마니또 맞추기
            </button>
          </div>
        </div>
      </div>

      {/* 필수 미션 모달 */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>필수 미션</h3>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={missions.eatTogether}
                  onChange={() => toggleMission('eatTogether')}
                />
                &nbsp; 함께 식사하기 (1:1 아니어도 됨)
              </label>
              <br /><br />
              <label>
                <input
                  type="checkbox"
                  checked={missions.giveCompliment}
                  onChange={() => toggleMission('giveCompliment')}
                />
                &nbsp; 칭찬하기
              </label>
            </div>

            <button
              onClick={() => setShowModal(false)}
              style={{ ...buttonStyle, marginTop: '20px' }}>
              닫기
            </button>
          </div>
        </div>
      )}

    </Layout1>
  );
};

const buttonStyle = {
  backgroundColor: '#000000ff',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '20px',
  border: 'none',
  fontSize: '16px',
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
  borderRadius: '15px',
  padding: '30px 20px',
  textAlign: 'center',
  width: '300px'
};

export default MainPage;
