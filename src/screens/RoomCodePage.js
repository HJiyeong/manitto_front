import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout1 from "../components/Layout";
import startBg from "../assets/images/roomcode_background.png";
import IC from "../assets/images/ic.png";
import ICimage from "../assets/images/basic_background.png";
import { joinGroup } from "../hooks/useGroup";
import { useMutation } from "@tanstack/react-query";

const RoomCodePage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  // 마니또 방 참여하기
  const { mutate, isPending } = useMutation({
    mutationFn: () => joinGroup(roomCode),
    onSuccess: () => {
      navigate(`/home/${roomCode}`);
    },
    onError: (error) => {
      console.error("마니또 방 입장 실패", error);
      alert("방 입장에 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!roomCode.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }
    mutate();
  };

  return (
    <Layout1 innerBackground={startBg}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* 상단 멘트 */}
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "30%",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          방 참여하기
        </div>

        {/* 코드 입력 영역 */}
        <div
          style={{
            backgroundColor: "white",
            width: "90%",
            maxWidth: "400px",
            borderRadius: "20px",
            padding: "30px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="코드를 입력해주세요..."
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            style={{
              width: "90%",
              fontSize: "18px",
              border: "none",
              borderBottom: "2px solid #ccc",
              padding: "10px",
              marginBottom: "30px",
              textAlign: "center",
              outline: "none",
            }}
          />

          {/* 확인 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={isPending}
            style={{
              backgroundImage: `url(${ICimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              borderRadius: "30px",
              padding: "14px 24px",
              width: "80%",
              maxWidth: "300px",
              cursor: "pointer",
            }}
          >
            {isPending ? "처리중..." : "확인"}
          </button>
        </div>
      </div>
    </Layout1>
  );
};

export default RoomCodePage;
