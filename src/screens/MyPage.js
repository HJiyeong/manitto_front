import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout1';
import defaultProfileImg from '../assets/images/profile.png';  // 네가 사용하는 캐릭터 이미지로 교체

const MyPage = () => {
  // 백엔드에서 불러올 유저 정보 (더미 데이터)
  const [userInfo, setUserInfo] = useState({
    name: '이름',
    userId: 'jiyeong0105',
    joinDate: '2025.07.21',
    profileImg: defaultProfileImg
  });

  // TODO: 나중에 백엔드에서 데이터 받아오기
  useEffect(() => {
    // 예시) fetchUserInfo().then(data => setUserInfo(data))
  }, []);

  return (
    <Layout1>
      <div style={{ padding: '20px' }}>

        {/* 페이지 타이틀 */}
        <div style={{
          fontWeight: 'bold',
          fontSize: '20px',
          marginBottom: '30px'
        }}>
          마이페이지
        </div>

        {/* 프로필 영역 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px 20px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '10px'
          }}>
            {userInfo.name}
          </div>

          <img
            src={userInfo.profileImg}
            alt="프로필 이미지"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '20px',
              objectFit: 'cover',
              marginBottom: '20px'
            }}
          />
        </div>

        {/* 아이디 / 가입일자 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '20px',
          fontSize: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <div style={{ fontWeight: 'bold' }}>아이디</div>
            <div>{userInfo.userId}</div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontWeight: 'bold' }}>가입날짜</div>
            <div>{userInfo.joinDate}</div>
          </div>
        </div>

      </div>
    </Layout1>
  );
};

export default MyPage;
