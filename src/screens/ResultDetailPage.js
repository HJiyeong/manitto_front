import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Layout from "../components/Layout";
import startBg from "../assets/images/roomlist_background.png";
import IC from "../assets/images/ic.png";
import ICimage from "../assets/images/basic_background.png";
import { getMyManittoInfo } from "../hooks/useMember";
import { useQuery } from "@tanstack/react-query";

const ResultDetailPage = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const { groupCode } = useParams();

  // 글자 20자 이상일 경우 자르고 말줄임표 붙이기
  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  // 나의 멤버 정보 불러오기
  const { data: manittoInfo, isLoading } = useQuery({
    queryKey: ["manittoInfo"],
    queryFn: () => getMyManittoInfo(groupCode),
    enabled: !!groupCode,
  });

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
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* 제목 */}
        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "20%",
            textAlign: "left",
          }}
        >
          {manittoInfo.userId.nickname}님은 {manittoInfo.manittoId.nickname}님의
          마니또입니다.
        </div>

        {/* 미션 카드 리스트 */}
        {manittoInfo.completedMissions.length > 0 ? (
          manittoInfo.completedMissions.map((mission) => (
            <div
              key={mission._id}
              onClick={() => setSelectedMission(mission)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "20px",
                padding: "16px",
                width: "90%",
                maxWidth: "400px",
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div>
                <img
                  src={IC}
                  alt="아이콘"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {truncateText(mission.letterToReceiver)}
                </div>
                <div style={{ margin: "8px 0", fontSize: "16px" }}>
                  {truncateText(mission.missionContent)}
                </div>
                <div style={{ fontSize: "12px", color: "#555" }}>
                  받은 날: {dayjs(mission.performedAt).format("YYYY-MM-DD")}
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "30px",
            padding: "16px 24px",
            marginTop: "50px",
            width: "80%",
            maxWidth: "400px",
          }}
        >
          뒤로가기
        </button>

        {/* 모달 */}
        {selectedMission && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setSelectedMission(null)}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                width: "90%",
                maxWidth: "400px",
                textAlign: "center",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                미션 상세보기
              </h2>
              <p>
                <strong>편지 내용:</strong>
                <br />
                {selectedMission.letterToReceiver}
              </p>
              <p>
                <strong>미션 내용:</strong>
                <br />
                {selectedMission.missionContent}
              </p>
              <p>
                <strong>받은 날짜:</strong>
                <br />
                {dayjs(selectedMission.performedAt).format("YYYY-MM-DD")}
              </p>

              <button
                onClick={() => setSelectedMission(null)}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#333",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  cursor: "pointer",
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
