import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgFull from "../assets/images/web_background.png";
import bgInner from "../assets/images/basic_background.png";
import sidebarBg from "../assets/images/side_background.png";
import backIcon from "../assets/images/back.png";
import sideIcon from "../assets/images/ic_side.png";

const Layout1 = ({ children, innerBackground, roomName, roomDescription }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const menuButtonStyle = {
    fontFamily: 'MyCustomFont, sans-serif',
    color: "#fff", // 흰색 텍스트
    fontWeight: "600", // 굵게
    letterSpacing: "-0.5px", // 시각적으로 좀 더 깔끔하게

    width: "100%",
    fontSize: "20px",
    color: "black",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 8px",
    margin: "20px 0",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bgFull})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "618px",
          minHeight: "100vh",
          backgroundImage: `url(${innerBackground || bgInner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "16px",
          boxSizing: "border-box",
          backgroundColor: "#ffffffcc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "5%",
              backgroundImage: `url(${sideIcon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          />

          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/"); // fallback route
              }
            }}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5%",
              backgroundImage: `url(${backIcon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>

        <div style={{ margin: 50 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {roomName}
          </h2>
          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              fontSize: "16px",
              color: "#666",
            }}
          >
            {roomDescription}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: sidebarVisible ? "0" : "-200px",
            width: "200px",
            height: "100%",
            backgroundImage: `url(${sidebarBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "left 0.3s ease",
            padding: "16px",
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSidebarVisible(false)}
            style={{
              width: "60px",
              height: "60px",
              marginBottom: "20px",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "20px",
              color: "black",
              cursor: "pointer",
            }}
          >
            ✖
          </button>

          <button style={menuButtonStyle} onClick={() => navigate("/start")}>
            시작화면
          </button>

          <button style={menuButtonStyle} onClick={() => navigate("/roomlist")}>
            참여중인 방
          </button>

          <button
            style={menuButtonStyle}
            onClick={() => navigate("/roommanager")}
          >
            방 만들기
          </button>
          <button style={menuButtonStyle} onClick={() => navigate("/mypage")}>
            마이페이지
          </button>
          <button
            style={menuButtonStyle}
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout1;
