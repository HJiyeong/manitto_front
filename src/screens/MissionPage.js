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

  const {
    data: memberInfo,
    isLoading,
    refetch: refetchNickname,
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
                    {mission.letterToReceiver}
                  </div>
                  <div style={{ fontWeight: "500" }}>
                    {mission.missionContent}
                  </div>
                  <div style={{ fontSize: "10px", color: "#888" }}>
                    {dayjs(mission.performedAt).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "40px", color: "#ccc", cursor: "pointer" }}
                onClick={() => {
                  markMissionComplete(mission._id);
                  refetchNickname();
                }}
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
      </div>
    </Layout1>
  );
};

export default MissionPage;
