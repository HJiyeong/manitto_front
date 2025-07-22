import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import Layout1 from "../components/Layout1";
import Main from "../assets/images/main.png";
import startBg from "../assets/images/start_background.png";
import Dumpling from "../assets/images/ic.png"; // 만두 PNG 추가
import { getGroupMemberInfo } from "../hooks/useMember";
import { generateRandomPositions } from "../utils/generateRandomPositions";

const MainPage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const { data: memberInfo, isLoading } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: () => getGroupMemberInfo(groupCode),
    onError: (error) => {
      console.error("멤버 정보 불러오기 실패", error);
      alert("멤버 정보를 불러오는 데 실패했습니다.");
    },
  });

  if (isLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  const missionCount = memberInfo.completedMissions.length;
  const dumplingPositions = generateRandomPositions(missionCount);

  return (
    <Layout1 roomName="몰입캠프1">
      <div style={{ textAlign: "center" }}>
        <h1>
          {memberInfo.userId.nickname}의 마니또는{" "}
          {memberInfo.manittoId?.nickname || ""}입니다.
        </h1>

        <div
          style={{
            position: "relative",
            display: "inline-block",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "50px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            margin: "20px 0",
          }}
        >
          {/* 배경 이미지 */}

          <img
            src={Main}
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "16px",
              display: "block",
            }}
          />

          {/* 만두 PNG 여러개 뿌리기 */}
          {dumplingPositions.map((pos, index) => (
            <img
              key={index}
              src={Dumpling}
              className="dumpling-animated"
              style={{
                position: "absolute",
                width: "50px",
                top: pos.top,
                left: pos.left,
                zIndex: 5,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}

          {/* 버튼 영역 */}
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <button
              onClick={() => navigate(`/mission/:dddd`)}
              style={buttonStyle}
            >
              미션 기록하기
            </button>
            <button style={buttonStyle}>마니또 맞추기</button>
          </div>
        </div>
      </div>
    </Layout1>
  );
};

const buttonStyle = {
  backgroundColor: "#000000ff",
  color: "white",
  padding: "10px 20px",
  borderRadius: "20px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "30px 20px",
  textAlign: "center",
  width: "300px",
};

export default MainPage;
