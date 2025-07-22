import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Layout from '../components/Layout';
import startBg from '../assets/images/roomlist_background.png';
import IC from '../assets/images/ic.png';
import ICimage from '../assets/images/basic_background.png';

const ResultDetailPage = () => {
  const { groupCode } = useParams();

  const dummyMissions = [
    {
      _id: '1',
      letterToReceiver: '오늘도 힘내! 😊',
      missionContent: '몰래 좋아하는 음료수 주기',
      performedAt: '2025-07-20',
    },
    {
      _id: '2',
      letterToReceiver: '응원할게!',
      missionContent: '기습 칭찬 한마디 건네기',
      performedAt: '2025-07-18',
    },
    {
      _id: '3',
      letterToReceiver: '화이팅!',
      missionContent: '눈 마주치고 웃어주기',
      performedAt: '2025-07-15',
    },
  ];

  const [missionsToMe, setMissionsToMe] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    setMissionsToMe(dummyMissions);
  }, []);

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

        {/* 제목 */}
        <div style={{
          fontSize: '60px',
          fontWeight: 'bold',
          marginTop: '5px',
          marginBottom: '20%',
          textAlign: 'left',
        }}>
          000은 000님의 마니또입니다.
        </div>

        {/* 미션 카드 리스트 */}
        {missionsToMe.length > 0 ? (
          missionsToMe.map((mission) => (
            <div
              key={mission._id}
              onClick={() => setSelectedMission(mission)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                padding: '16px',
                width: '90%',
                maxWidth: '400px',
                margin: '10px 0',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div>
                <img src={IC} alt="아이콘" style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '10px',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  {mission.letterToReceiver}
                </div>
                <div style={{ margin: '8px 0', fontSize: '16px' }}>
                  {mission.missionContent}
                </div>
                <div style={{ fontSize: '12px', color: '#555' }}>
                  받은 날: {dayjs(mission.performedAt).format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>받은 미션이 없습니다.</p>
        )}

        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => window.history.back()}
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
          }}
        >
          뒤로가기
        </button>

        {/* 모달 */}
        {selectedMission && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
            onClick={() => setSelectedMission(null)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '30px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>미션 상세보기</h2>
              <p><strong>편지 내용:</strong><br />{selectedMission.letterToReceiver}</p>
              <p><strong>미션 내용:</strong><br />{selectedMission.missionContent}</p>
              <p><strong>받은 날짜:</strong><br />{dayjs(selectedMission.performedAt).format('YYYY-MM-DD')}</p>

              <button
                onClick={() => setSelectedMission(null)}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#333',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default ResultDetailPage;
