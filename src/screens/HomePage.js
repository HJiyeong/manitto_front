import React, { useState } from "react";
import Layout from "../components/Layout";
import Layout1 from "../components/Layout1";
import startBg from "../assets/images/start_background.png";
import Getmanitto from "../assets/images/get_manitto.png";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupDetails, lockGroup, matchGroup } from "../hooks/useGroup";
import { getGroupMemberInfo } from "../hooks/useMember";
import { listGroupMembers } from "../hooks/useMember"; // ✅ 여기서 가져옴
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  // 그룹 정보 불러오기
  const {
    data: groupDetail,
    isLoading: isGroupDetailLoading,
    refetch: refetchGroupDetail,
  } = useQuery({
    queryKey: ["groupDetail"],
    queryFn: () => getGroupDetails(groupCode),
    enabled: !!groupCode,
  });

  // 나의 멤버 정보 불러오기
  const { data: memberInfo, isLoading: isMemberInfoLoading } = useQuery({
    queryKey: ["missionList"],
    queryFn: () => getGroupMemberInfo(groupCode),
    enabled: !!groupCode,
  });

  // 모달 상태
  const [showModal, setShowModal] = useState(false);

  // 멤버 목록 불러오기
  const { data: members = [] } = useQuery({
    queryKey: ["groupMembers", groupCode],
    queryFn: () => listGroupMembers(groupCode),
    enabled: !!groupCode && showModal, // 모달 열릴 때만 로드
  });

  const { hostId, isLocked, isMatched } = groupDetail || {};

  const roomName = groupDetail?.name || "";
  const roomDescription = groupDetail?.description || "";

  if (isGroupDetailLoading || isMemberInfoLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

  return (
    <Layout1 roomName={roomName} roomDescription={roomDescription}>
      <div style={{ padding: "0 10px" }}>
        {/* 타이틀 + 모집상태 배지 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "25px",
              fontWeight: "bold",
              marginLeft: "40px",
            }}
          >
            방코드: {groupCode}
          </h1>

          <div
            style={{
              display: "inline-block",
              backgroundColor: isLocked ? "#ff4d4f" : "#81d2f7",
              color: "white",
              fontWeight: "bold",
              fontSize: "10px",
              padding: "8px 20px",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
          >
            {isLocked ? "모집 마감" : "모집 중"}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
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
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => navigate(`/main/${groupCode}`)}
              disabled={!isMatched}
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
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="effect-layer blingbling-effect hologram-effect">
                <img
                  src={Getmanitto}
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

          {/* 버튼 영역 */}
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {isLocked ? (
              <button
                onClick={() => {
                  if (hostId._id === memberInfo.userId._id) {
                    if (members.length < 3) {
                      alert("매칭하려면 최소 3명 이상의 멤버가 필요합니다.");
                    } else {
                      matchGroup(groupCode);
                      refetchGroupDetail();
                    }
                  } else {
                    alert("방장만 잠글 수 있습니다.");
                  }
                }}
                style={{
                  ...buttonStyle,
                  opacity: isMatched ? 0.5 : 1,
                  cursor: isMatched ? "default" : "pointer",
                }}
                disabled={isMatched}
              >
                {isMatched ? "매칭 완료" : "매칭하기"}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (hostId._id === memberInfo.userId._id) {
                    lockGroup(groupCode);
                    refetchGroupDetail();
                  } else {
                    alert("방장만 잠글 수 있습니다.");
                  }
                }}
                style={buttonStyle}
              >
                방 잠그기
              </button>
            )}

            <button onClick={() => setShowModal(true)} style={buttonStyle}>
              멤버 보기
            </button>
          </div>
        </div>
      </div>

      {/* ✅ 모달 */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>참여 멤버 목록</h2>
            <div style={{ margin: "20px 0", textAlign: "left" }}>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    {index + 1}. {member.userId.nickname || "알 수 없음"}
                  </div>
                ))
              ) : (
                <p>멤버 정보를 불러오는 중...</p>
              )}
            </div>
            <button onClick={() => setShowModal(false)} style={buttonStyle}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Layout1>
  );
};

// 버튼 스타일
const buttonStyle = {
  backgroundColor: "#000000ff",
  color: "white",
  padding: "10px 20px",
  borderRadius: "20px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

// 모달 스타일
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "20px",
  width: "300px",
  maxHeight: "80vh",
  overflowY: "auto",
  textAlign: "center",
};

export default HomePage;
