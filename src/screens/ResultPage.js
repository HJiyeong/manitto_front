import React from "react";
import Layout from "../components/Layout";
import Layout1 from "../components/Layout1";
import startBg from "../assets/images/start_background.png";
import Result from "../assets/images/result.png";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroupMemberInfo } from "../hooks/useMember";

const ResultPage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  // 나의 멤버 정보 불러오기
  const { data: memberInfo, isLoading } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: () => getGroupMemberInfo(groupCode),
    enabled: !!groupCode,
  });

  const roomName = memberInfo?.groupId.name || "";
  const myNickname = memberInfo?.userId.nickname || "";
  const predictionManitto = memberInfo?.predictionManitto || "";

  if (isLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }
  return (
    <Layout1 roomName={roomName}>
      <div style={{ textAlign: "center" }}>
        <h1>두근두근 결과 확인</h1>
        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            fontSize: "16px",
            color: "#666",
          }}
        >
          {predictionManitto !== ""
            ? `과연 ${myNickname}님의 마니또는 ${predictionManitto}님이었을까요?`
            : `과연 ${myNickname}님의 마니또는 누구였을까요?`}
        </p>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "50px",
            display: "inline-block",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            margin: "20px 0",
          }}
        >
          <button
            onClick={() => navigate(`/resultdetail/${groupCode}`)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "inline-block",
              transform: "scale(1)",
              transition: "transform 0.1s ease",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.95)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="effect-layer blingbling-effect hologram-effect">
              <img
                src={Result}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "16px",
                  display: "block",
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </Layout1>
  );
};

export default ResultPage;
