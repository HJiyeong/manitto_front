import React, { useState } from 'react';
import Layout1 from '../components/Layout1';
import Main from '../assets/images/main.png';
import Dumpling from '../assets/images/ic.png';  // 만두 PNG 추가
import { useNavigate } from 'react-router-dom';

const MainPage = ({ username = "000", manittoName = "000" }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [missions, setMissions] = useState({
    eatTogether: false,
    giveCompliment: false
  });

  const missionCount = 5;  // ✅ 하드코딩으로 미션 수 고정 (추후 API에서 불러오면 여기에 반영)

  const generateRandomPositions = (count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
    positions.push({
      top: `calc(50% + ${Math.random() * 50 - 40}%)`,    // 50% 기준으로 위아래 -20% ~ +20% 퍼지게
      left: `calc(50% + ${Math.random() * 50 - 40}%)`    // 50% 기준으로 좌우 -20% ~ +20% 퍼지게
    });

    }
    return positions;
  };

  const dumplingPositions = generateRandomPositions(missionCount);

  return (
    <Layout1 roomName="몰입캠프1">
      <div style={{ textAlign: 'center' }}>
        <h1>{username}의 마니또는 {manittoName}입니다.</h1>

        <div style={{
          position: 'relative',
          display: 'inline-block',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '50px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          margin: '20px 0',
        }}>

          {/* 배경 이미지 */}
          
          <img
            src={Main}
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '16px',
              display: 'block'
            }}
          />

          {/* 만두 PNG 여러개 뿌리기 */}
        {dumplingPositions.map((pos, index) => (
        <img
          key={index}
          src={Dumpling}
          className="dumpling-animated"
          style={{
            position: 'absolute',
            width: '50px',
            top: pos.top,
            left: pos.left,
            zIndex: 5,
            animationDelay: `${Math.random() * 2}s`
          }}

        />

        ))}


          {/* 버튼 영역 */}
          <div style={{
            marginTop: '5px',
            display: 'flex',
            justifyContent: 'center',
            gap: '30px'
          }}>
            <button onClick={() => navigate(`/mission/:dddd`)} style={buttonStyle}>
              미션 기록하기
            </button>
            <button onClick={() => setShowModal(true)} style={buttonStyle}>
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
                <input type="checkbox" checked={missions.eatTogether}
                  onChange={() => toggleMission('eatTogether')} />
                &nbsp; 함께 식사하기 (1:1 아니어도 됨)
              </label>
              <br /><br />
              <label>
                <input type="checkbox" checked={missions.giveCompliment}
                  onChange={() => toggleMission('giveCompliment')} />
                &nbsp; 칭찬하기
              </label>
            </div>
            <button onClick={() => setShowModal(false)} style={{ ...buttonStyle, marginTop: '20px' }}>
              닫기
            </button>
          </div>
        </div>
      )}

    </Layout1>
  );

  function toggleMission(missionKey) {
    setMissions(prev => ({
      ...prev,
      [missionKey]: !prev[missionKey]
    }));
  }
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
