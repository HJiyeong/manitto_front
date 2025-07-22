import url from "../utils/backend";
import axiosInstance from "../utils/axiosInstance";

// 카카오 로그인 페이지로 리다이렉션
export const kakaoLogin = async () => {
  window.location.href = `${url}/auth/kakao/login`;
};

// 로그인한 사용자의 닉네임 가져오기
export const getNickname = async () => {
  try {
    const res = await axiosInstance.get("/users/nickname");
    return res.data.nickname;
  } catch (error) {
    console.error("닉네임 가져오기 실패 ❌", error);
    throw error;
  }
};

// 로그인한 사용자의 닉네임 생성 혹은 변경
export const updateNickname = async (newNickname) => {
  try {
    await axiosInstance.patch("/users/nickname", { nickname: newNickname });
  } catch (error) {
    console.error("닉네임 업데이트 실패 ❌", error);
    throw error;
  }
};

// 로그인한 사용자 회원 탈퇴
export const deleteUser = async () => {
  try {
    await axiosInstance.delete("/users");
  } catch (error) {
    console.error("사용자 삭제 실패 ❌", error);
    throw error;
  }
};
