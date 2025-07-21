import url from "../utils/backend";

export const kakaoLogin = async () => {
  window.location.href = `${url}/auth/kakao/login`;
};
