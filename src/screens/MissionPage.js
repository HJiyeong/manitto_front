import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Layout1 from "../components/Layout1";
import startBg from "../assets/images/basic_background.png";
import IC from "../assets/images/ic.png";
import { getGroupMemberInfo } from "../hooks/useMember";
import { markMissionComplete } from "../hooks/useMissionLog";

const MissionPage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const [selectedMission, setSelectedMission] = useState(null);

  // 글자 20자 이상일 경우 자르고 말줄임표 붙이기
  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  // 미션 완료 상태로 변경하기
  const saveMissionComplete = async (mission) => {
    const confirmResult = window.confirm(
      "해당 미션을 완료 처리할까요? 완료 후에는 수정이 어려워요🙂"
    );
    if (!confirmResult) return;

    try {
      await markMissionComplete(mission._id);
      await refetchMemberInfo();
    } catch (error) {
      alert("미션 완료 상태 변경에 실패했습니다.");
      console.error(error);
    }
  };

  // 나의 멤버 정보 불러오기
  const {
    data: memberInfo,
    isLoading,
    refetch: refetchMemberInfo,
  } = useQuery({
    queryKey: ["missionList"],
    queryFn: () => getGroupMemberInfo(groupCode),
  });

  if (isLoading) {
    return (
      <Layout1 innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout1>
    );
  }

  return (
    <Layout1>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            textAlign: "left",
            marginBottom: "70px",
            width: "100%",
          }}
        >
          미션 기록하기
        </div>

        {/* 마니또 이름 (백엔드 결과 활용) */}
        <p
          style={{
            fontSize: "25px",
            marginBottom: "30px",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          오늘도 {memberInfo?.manittoId.nickname}에게 잘해줍시다 ~
        </p>

        {/* 미션 리스트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {memberInfo?.completedMissions.map((mission) => (
            <div
              key={mission._id}
              onClick={() => setSelectedMission(mission)}
              style={{
                fontSize: "14px",
                backgroundColor: "white",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 15px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={IC}
                  alt="icon"
                  style={{ width: "40px", marginRight: "30px" }}
                />
                <div>
                  <div style={{ fontWeight: "500" }}>
                    {truncateText(mission.letterToReceiver)}
                  </div>
                  <div style={{ fontWeight: "500" }}>
                    {truncateText(mission.missionContent)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#888" }}>
                    {dayjs(mission.performedAt).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "40px", color: "#ccc", cursor: "pointer" }}
                onClick={() => saveMissionComplete(mission)}
              >
                {mission.isCompleted ? "🙆‍♀️" : "🙅‍♀️"}
              </div>
            </div>
          ))}
        </div>

        {/* 플러스 버튼 */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate(`/missionwrite/${groupCode}`)}
            style={{
              backgroundColor: "#888888",
              color: "white",
              fontSize: "30px",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              border: "none",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
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
    </Layout1>
  );
};

export default MissionPage;
