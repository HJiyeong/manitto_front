import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../utils/backend";

const OAuthRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(location.search);
    const authCode = params.get("authCode");

    if (!authCode) {
      alert("로그인 인증 코드가 없습니다.");
      navigate("/"); // 로그인 화면으로 돌아가기 (지금은 startPage)
      return;
    }

    const verifyLogin = async () => {
      try {
        const response = await axios.post(`${url}/auth/kakao/verify`, {
          authCode,
        });
        const { accessToken, isNewUser } = response.data;
        localStorage.setItem("accessToken", accessToken);
        navigate(isNewUser ? "/start" : "/home"); // 닉네임이 없는 경우 startPage로, 닉네임이 있으면 homePage로
      } catch (error) {
        console.error("카카오 로그인 검증 실패 ❌", error);
        alert("로그인에 실패했습니다.");
        navigate("/");
      }
    };

    verifyLogin();
  }, []);

  return <div>로그인 중입니다... 잠시만 기다려주세요 🙏</div>;
};

export default OAuthRedirectPage;
