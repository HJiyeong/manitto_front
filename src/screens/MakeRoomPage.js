import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Layout from "../components/Layout";
import startBg from "../assets/images/makeroom_background.png";
import ICimage from "../assets/images/basic_background.png";
import { createGroup } from "../hooks/useGroup";
import { getNickname } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MakeRoomPage = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    revealDate: "",
  });

  // 닉네임 불러오기
  const { data: nickname, isLoading } = useQuery({
    queryKey: ["myNickname"],
    queryFn: getNickname,
  });

  // 마니또 방 만들기
  const mutation = useMutation({
    mutationFn: () => createGroup(roomData),
    onSuccess: (groupCode) => {
      // 성공하면 홈 페이지로 이동
      navigate(`/home/${groupCode}`);
    },
    onError: (error) => {
      console.error("방 생성 실패", error);
      alert("방 생성에 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    mutation.mutateAsync();
  };

  if (isLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  return (
    <Layout innerBackground={startBg}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* 상단 제목 */}
        <h1
          style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "40px" }}
        >
          방 파기
        </h1>

        {/* 방 이름 */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            방 이름
          </div>
          <input
            type="text"
            value={roomData.name}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="방 이름을 입력하세요"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #aaa",
              outline: "none",
              background: "transparent",
              textAlign: "center",
            }}
          />
        </div>

        {/* 방장 이름 */}
        <div style={{ width: "100%", maxWidth: "400px", marginBottom: "60px" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            방장
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            {nickname}
          </div>
        </div>

        {/* 마니또 마감 기간 */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            marginTop: "100px",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "28px", color: "#666", marginBottom: "8px" }}>
            마니또 마감 기간
          </div>
          <input
            type="date"
            value={roomData.revealDate}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                revealDate: e.target.value,
              }))
            }
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #aaa",
              background: "transparent",
              textAlign: "center",
              outline: "none",
            }}
          />
        </div>

        {/* 설명 */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            marginTop: "100px",
            marginBottom: "50px",
          }}
        >
          <div style={{ fontSize: "28px", color: "#666", marginBottom: "8px" }}>
            설명
          </div>
          <textarea
            value={roomData.description}
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="그룹에 대한 설명을 입력하세요"
            rows={3}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "none",
              borderBottom: "2px solid #aaa",
              background: "transparent",
              resize: "none",
              outline: "none",
            }}
          />
        </div>

        {/* 버튼 */}
        <button
          style={{
            backgroundImage: `url(${ICimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop: "100px",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "30px",
            padding: "16px 24px",
            width: "80%",
            maxWidth: "400px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          코드 생성
        </button>
      </div>
    </Layout>
  );
};

export default MakeRoomPage;
