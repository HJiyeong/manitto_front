import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Layout1 from "../components/Layout1";
import startBg from "../assets/images/start_background.png";
import defaultProfileImg from "../assets/images/profile.png";
import { getNickname, updateNickname } from "../hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser } from "../hooks/useAuth";

const MyPage = () => {
  // 닉네임 조회
  const {
    data: nickname,
    isLoading,
    isError,
    refetch: refetchNickname,
  } = useQuery({
    queryKey: ["myNickname"],
    queryFn: getNickname,
  });

  const [editing, setEditing] = useState(false);
  const [inputNickname, setInputNickname] = useState(nickname);

  // 닉네임 등록
  const { mutate: saveNickname, isPending } = useMutation({
    mutationFn: updateNickname,
    onSuccess: async () => {
      //await queryClient.invalidateQueries(['myNickname']);
      refetchNickname(); // 백엔드 서버에서 다시 닉네임 불러오기
    },
  });

  const handleSaveNickname = () => {
    if (inputNickname.trim() !== "") {
      saveNickname(inputNickname);
      setEditing(false);
    }
  };

  if (isLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  return (
    <Layout1>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "60px",
            marginBottom: "120px",
          }}
        >
          마이페이지
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "30px",
            padding: "50px 20px",
            textAlign: "center",
          }}
        >
          <img
            src={defaultProfileImg}
            alt="프로필 이미지"
            style={{
              width: "240px",
              height: "240px",
              borderRadius: "80px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />

          {/* 닉네임 표시 or 수정 */}
          {editing ? (
            <>
              <input
                type="text"
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                style={{
                  fontSize: "24px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
              <br />
              <button onClick={handleSaveNickname} style={buttonStyle}>
                저장
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  marginBottom: "10px",
                }}
              >
                {nickname}
              </div>
              <button onClick={() => setEditing(true)} style={buttonStyle}>
                닉네임 수정
              </button>
            </>
          )}

          {/* 탈퇴 버튼은 완전히 아래로 분리 */}
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button style={withdrawButtonStyle} onClick={deleteUser}>
          탈퇴하기
        </button>
      </div>
    </Layout1>
  );
};

const buttonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  fontSize: "14px",
  backgroundColor: "#81d2f7ff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const withdrawButtonStyle = {
  marginTop: "100px",
  padding: "12px 100px",
  fontSize: "14px",
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default MyPage;
