import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout1 from "../components/Layout1";
import Layout from "../components/Layout";
import startBg from "../assets/images/roomlist_background.png";
import IC from "../assets/images/ic.png";
import ICimage from "../assets/images/basic_background.png";
import { listMyGroups } from "../hooks/useGroup";
import { getNickname } from "../hooks/useAuth";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"; 

dayjs.extend(isSameOrAfter);

const RoomListPage = () => {
  const navigate = useNavigate();

  const { data: username, isLoading: isNicknameLoading } = useQuery({
    queryKey: ["myNickname"],
    queryFn: getNickname,
  });

  const { data: roomList = [], isLoading: isRoomListLoading } = useQuery({
    queryKey: ["myRooms"],
    queryFn: listMyGroups,
  });

  if (isNicknameLoading || isRoomListLoading) {
    return (
      <Layout innerBackground={startBg}>
        <p>로딩 중...</p>
      </Layout>
    );
  }

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
            marginBottom: "20%",
            textAlign: "center",
          }}
        >
          {username}님의
          <br />방 목록
        </div>

        {/* 서버에서 받은 방 카드 리스트 */}
        {roomList.length > 0 ? (
          roomList.map((room) => (
            <div
              key={room._id} // 서버가 주는 고유 ID 사용 권장
              onClick={() => {
                if (dayjs().isSameOrAfter(dayjs(room.revealDate), "day")) {
                  navigate(`/result/${room.inviteCode}`);
                } else {
                  navigate(`/home/${room.inviteCode}`);
                }
              }}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "10px 16px",
                width: "90%",
                maxWidth: "400px",
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div className="blingbling-effect">
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
                <div style={{ fontWeight: "bold" }}>{room.name}</div>
                <div style={{ fontSize: "12px", color: "#555" }}>
                  {room.revealDate
                    ? `마니또 공개일: ${new Date(
                        room.revealDate
                      ).toLocaleDateString()}`
                    : ""}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>참여 중인 방이 없습니다.</p>
        )}

        {/* 방 추가하기 버튼 */}
        <button
          onClick={() => navigate("/roomcode")}
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
          새로운 방 참여하기
        </button>
      </div>
    </Layout1>
  );
};

export default RoomListPage;
