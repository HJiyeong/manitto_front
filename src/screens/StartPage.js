import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/Layout';
import startBg from '../assets/images/start_background.png';
import { getNickname, updateNickname } from '../hooks/useAuth';

const StartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState(location.state?.isNewUser);

  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(isNewUser === true); // isNewUser일 때만 모달

  // 닉네임 조회
  const {
    data: nickname,
    isLoading,
    isError,
    refetch: refetchNickname,
  } = useQuery({
    queryKey: ['myNickname'],
    queryFn: getNickname,
    enabled: isNewUser === false,
  });

  // 닉네임 등록
  const [inputNickname, setInputNickname] = useState('');
  const { mutate: saveNickname, isPending: isSaving } = useMutation({
    mutationFn: updateNickname,
    onSuccess: async () => {
      setIsNewUser(false);
      await queryClient.invalidateQueries(['myNickname']);
      refetchNickname(); // 백엔드 서버에서 다시 닉네임 불러오기
      setShowModal(false);
    },
  });

  // 닉네임 저장 후 모달 닫기
  const handleSaveNickname = () => {
    if (inputNickname.trim() !== '') {
      saveNickname(inputNickname.trim());
      setShowModal(false);
    }
  };

  return (
    <Layout innerBackground={startBg}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        {nickname ? (
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {nickname}님 안녕하세요!
          </h2>
        ) : (
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>환영합니다!</h2>
        )}

        <h1 style={{ marginTop: '10px' }}>John's Manitto</h1>

        <Link to="/roomlist">
          <button style={buttonStyle}>시작하기</button>
        </Link>

        <Link to="/roommanager">
          <button style={buttonStyle}>방 만들기</button>
        </Link>

        {showModal && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3>닉네임을 입력해주세요</h3>
              <p style={{ fontSize: "14px", color: "gray", marginTop: "-10px" }}>
                다른 사용자가 본인임을 알아볼 수 있는 닉네임이면 좋아요!
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveNickname();
                }}
              >
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
                    border: '1px solid #ccc',
                  }}
                />
                <button type="submit" style={buttonStyle}>
                  저장하기
                </button>
              </form>
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
  cursor: 'pointer',
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
  alignItems: 'center',
};

const modalBox = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '30px 20px',
  textAlign: 'center',
  width: '300px',
};

export default StartPage;
