import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Layout from "../components/Layout";
import Layout1 from "../components/Layout1";
import Main from "../assets/images/main.png";
import startBg from "../assets/images/start_background.png";
import Dumpling from "../assets/images/ic.png";
import { getGroupDetails, lockGroup, matchGroup } from "../hooks/useGroup";
import { getGroupMemberInfo, updateManittoGuess } from "../hooks/useMember";
import { generateRandomPositions } from "../utils/generateRandomPositions";

const MainPage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [manittoGuess, setManittoGuess] = useState("");

  // 나의 멤버 정보 불러오기
  const {
    data: memberInfo,
    isLoading: isMemberInfoLoading,
    refetch: refetchMemberInfo,
  } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: () => getGroupMemberInfo(groupCode),
    onError: (error) => {
      console.error("멤버 정보 불러오기 실패", error);
      alert("멤버 정보를 불러오는 데 실패했습니다.");
    },
  });

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

  // 추측 등록
  const { mutate: saveManittoGuess, isPending } = useMutation({
    mutationFn: ({ groupCode, guess }) => updateManittoGuess(groupCode, guess),
    onSuccess: async () => {
      refetchMemberInfo(); // 백엔드 서버에서 다시 멤버 정보 불러오기
      setShowModal(false);
    },
  });

  const handleSaveGuess = () => {
    if (manittoGuess.trim() !== "") {
      saveManittoGuess({ groupCode, guess: manittoGuess.trim() });
    }
  };

  const missionCount = memberInfo?.completedMissions.length || 0;


  const dumplingData = useMemo(() => {
  return memberInfo?.completedMissions.map((mission, idx) => ({
    ...generateRandomPositions(1)[0], // top, left
    content: mission.missionContent,
    id: mission._id,
  }));
}, [memberInfo?.completedMissions]);

  const [activeDumplingId, setActiveDumplingId] = useState(null);




  const roomName = groupDetail?.name || "";
  const roomDescription = groupDetail?.description || "";

  useEffect(() => {
    if (memberInfo?.predictionManitto) {
      setManittoGuess(memberInfo.predictionManitto);
    }
  }, [memberInfo]);

  if (isMemberInfoLoading || isGroupDetailLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

    return (
    <Layout1 roomName={roomName} roomDescription={roomDescription}>
      <div style={{ textAlign: "center", fontSize: "10px" }}>
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
          <p
            style={{
              fontSize: "10px",
              color: "gray",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            마니또에게 매일 미션을 수행하고 만두를 쌓아보세요!
          </p>

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

           <p
            style={{
              fontSize: "10px",
              color: "gray",
              textAlign: "center",
            }}
          >
            만두를 눌러보세요!
          </p>


          {/* 만두 + 말풍선 */}
          {dumplingData.map((pos) => (
            <div
              key={pos.id}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                zIndex: 2,
              }}
            >
              {/* 만두 이미지 */}
              <img
                src={Dumpling}
                className="dumpling-animated"
                style={{
                  width: "50px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setActiveDumplingId(activeDumplingId === pos.id ? null : pos.id)
                }
              />

              {/* 말풍선 */}
              {activeDumplingId === pos.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "60px", // 만두 위로
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 3,
                  }}
                >
                  {pos.content}
                </div>
              )}
            </div>
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
              onClick={() => navigate(`/mission/${groupCode}`)}
              style={buttonStyle}
            >
              미션 기록하기
            </button>
            <button style={buttonStyle} onClick={() => setShowModal(true)}>
              마니또 맞추기
            </button>
          </div>
        </div>

        {/* 마니또 맞추기 모달 */}
        {showModal && (
          <div style={modalOverlay}>
            <div style={{ ...modalBox, position: "relative" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
              <h3>누가 나의 마니또일지 예상해보세요.</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveGuess();
                }}
              >
                <input
                  type="text"
                  value={manittoGuess}
                  onChange={(e) => setManittoGuess(e.target.value)}
                  style={{
                    width: "80%",
                    padding: "10px",
                    margin: "20px 0",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <button type="submit" style={buttonStyle}>
                  저장하기
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout1>
  );

};

const buttonStyle = { 
  fontFamily: 'MyCustomFont, sans-serif',
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
  zIndex: 1000,
};

const modalBox = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "30px 20px",
  textAlign: "center",
  width: "300px",
};

export default MainPage;
