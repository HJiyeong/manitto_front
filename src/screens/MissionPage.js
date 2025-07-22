import React from 'react';
import Layout from '../components/Layout';
import startBg from '../assets/images/basic_background.png';
import IC from '../assets/images/ic.png';
import { useNavigate } from 'react-router-dom';

const MissionPage = ({ manittoName = "000" }) => {
  const navigate = useNavigate();

  const missions = [
    { id: 1, text: '오늘 마이쮸를 사줬다~', date: '2025.07.19.' },
    { id: 2, text: '오늘 마이쮸를 사줬다~', date: '2025.07.19.' },
    { id: 3, text: '오늘 마이쮸를 사줬다~', date: '2025.07.19.' }
  ];

  return (
    <Layout innerBackground={startBg}>
      <div style={{ padding: '20px' }}>

      <div style={{
        backgroundColor: 'white',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '50px',
        borderBottomRightRadius: '50px',
        padding: '100px 80px 100px 80px',
        fontWeight: 'bold',
        fontSize: '60px',
        textAlign: 'center',
        marginTop: '-50px',
        marginLeft: '-40px',
        marginRight: '-50px',
        marginBottom: '70px',
        width: '114%',
        boxSizing: 'border-box'
      }}>
        미션 기록하기
      </div>


        {/* 마니또 이름 (백엔드 결과 활용) */}
        <p style={{ fontSize: '30px', marginBottom: '30px', fontWeight: '500', textAlign: 'left', }}>
          오늘도 {manittoName}에게 잘해줍시다 ~
        </p>

        {/* 미션 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {missions.map((mission) => (
            <div key={mission.id} style={{
              fontSize: '25px',
              backgroundColor: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 15px',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={IC} alt="icon" style={{ width: '60px', marginRight: '30px' }} />
                <div>
                  <div style={{ fontWeight: '500' }}>{mission.text}</div>
                  <div style={{ fontSize: '20px', color: '#888' }}>{mission.date}</div>
                </div>
              </div>
              <div style={{ fontSize: '60px', color: '#ccc' }}>⋯</div>
            </div>
          ))}
        </div>

        {/* 플러스 버튼 */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => navigate('/missionwrite')}
            style={{
              backgroundColor: '#888888',
              color: 'white',
              fontSize: '30px',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              border: 'none',
              cursor: 'pointer'
            }}>
            +
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default MissionPage;
