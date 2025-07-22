import React, { useState } from 'react';
import Layout from '../components/Layout';
import startBg from '../assets/images/basic_background.png';

const MissionWritePage = ({ manittoName = "000" }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [missionDetail, setMissionDetail] = useState('');

  const handleSubmit = () => {
    const missionData = {
      date,
      message,
      missionDetail,
    };

    console.log('작성한 미션:', missionData);

    // TODO: 여기에 백엔드 API 연결 예정
    // 예시: axios.post('/api/missions', missionData)
  };

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

        {/* 안내 텍스트 */}
        <p style={{
          fontSize: '16px',
          marginBottom: '30px',
          fontWeight: '500'
        }}>
          오늘 {manittoName}에게 해준 일을 기록해보세요.
        </p>

        {/* 날짜 입력 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '15px',
          marginBottom: '20px',
          fontSize: '28px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>날짜</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              border: 'none',
              background: 'none',
              fontSize: '16px',
              fontWeight: 'normal'
            }}
          />
        </div>

        {/* 하고 싶은 말 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '28px',fontWeight: 'bold', marginBottom: '10px' }}>
            마니또에게 하고싶은 말
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="내 마니또에게 한마디!!"
            style={{
              width: '100%',
              height: '60px',
              border: 'none',
              resize: 'none',
              fontSize: '14px',
              background: 'none'
            }}
          />
        </div>

        {/* 미션 수행 서술 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '15px',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '28px',fontWeight: 'bold', marginBottom: '10px' }}>
            미션 수행 서술
          </div>
          <textarea
            value={missionDetail}
            onChange={(e) => setMissionDetail(e.target.value)}
            placeholder="어떤 미션을 수행했는지 적어주세요."
            style={{
              width: '100%',
              height: '100px',
              border: 'none',
              resize: 'none',
              fontSize: '14px',
              background: 'none'
            }}
          />
        </div>

        {/* 작성하기 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: 'white',
            color: 'black',
            fontSize: '28px',
            fontWeight: 'bold',
            borderRadius: '20px',
            width: '100%',
            padding: '15px',
            border: 'none',
            cursor: 'pointer'
          }}>
          작성하기
        </button>

      </div>
    </Layout>
  );
};

export default MissionWritePage;
