import React, { useState } from "react";
import Layout from "../components/Layout";
import startBg from "../assets/images/basic_background.png";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getGroupMemberInfo } from "../hooks/useMember";
import { createMissionLog } from "../hooks/useMissionLog";

const MissionWritePage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const [missionData, setMissionData] = useState({
    performedAt: "",
    letterToReceiver: "",
    missionContent: "",
  });

  // 상대방 닉네임 가져오기
  const { data: memberInfo, isLoading } = useQuery({
    queryKey: ["missionList"],
    queryFn: () => getGroupMemberInfo(groupCode),
  });

  // 미션 로그 업로드하기
  const mutation = useMutation({
    mutationFn: () => createMissionLog(groupCode, missionData),
    onSuccess: () => {
      // 성공하면 이전 페이지로 이동
      navigate(`/mission/${groupCode}`);
    },
    onError: (error) => {
      console.error("미션 로그 생성 실패", error);
      alert("미션 로그 생성에 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
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
      <div style={{ padding: "20px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            padding: "100px 80px 100px 80px",
            fontWeight: "bold",
            fontSize: "60px",
            textAlign: "center",
            marginTop: "-50px",
            marginLeft: "-40px",
            marginRight: "-50px",
            marginBottom: "70px",
            width: "114%",
            boxSizing: "border-box",
          }}
        >
          미션 기록하기
        </div>

        {/* 안내 텍스트 */}
        <p
          style={{
            fontSize: "16px",
            marginBottom: "30px",
            fontWeight: "500",
          }}
        >
          오늘 {memberInfo?.manittoId.nickname}에게 해준 일을 기록해보세요.
        </p>

        {/* 날짜 입력 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>날짜</span>
          <input
            type="date"
            value={missionData.performedAt}
            onChange={(e) =>
              setMissionData((prev) => ({
                ...prev,
                performedAt: e.target.value,
              }))
            }
            style={{
              border: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </div>

        {/* 하고 싶은 말 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            마니또에게 하고싶은 말
          </div>
          <textarea
            value={missionData.letterToReceiver}
            onChange={(e) =>
              setMissionData((prev) => ({
                ...prev,
                letterToReceiver: e.target.value,
              }))
            }
            placeholder="내 마니또에게 한마디!!"
            style={{
              width: "100%",
              height: "60px",
              border: "none",
              resize: "none",
              fontSize: "14px",
              background: "none",
            }}
          />
        </div>

        {/* 미션 수행 서술 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            미션 수행 서술
          </div>
          <textarea
            value={missionData.missionContent}
            onChange={(e) =>
              setMissionData((prev) => ({
                ...prev,
                missionContent: e.target.value,
              }))
            }
            placeholder="어떤 미션을 수행했는지 적어주세요."
            style={{
              width: "100%",
              height: "100px",
              border: "none",
              resize: "none",
              fontSize: "14px",
              background: "none",
            }}
          />
        </div>

        {/* 작성하기 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "white",
            color: "black",
            fontSize: "28px",
            fontWeight: "bold",
            borderRadius: "20px",
            width: "100%",
            padding: "15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          작성하기
        </button>
      </div>
    </Layout>
  );
};

export default MissionWritePage;
