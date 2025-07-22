import axiosInstance from "../utils/axiosInstance";

// 그룹에서 나의 정보 가져오기
// 내가 챙겨줘야 하는 마니또 정보, 미션 로그 포함
export const getGroupMemberInfo = async (groupCode) => {
  try {
    const res = await axiosInstance.get(`members/${groupCode}/myInfo`);
    return res.data;
  } catch (error) {
    console.error(`해당 그룹(${groupCode})의 내 정보 가져오기 실패 ❌`, error);
    throw error;
  }
};

// 내가 예상하는 마니또 이름 업데이트
export const updateManittoGuess = async (groupCode, manittoGuess) => {
  try {
    await axiosInstance.post(`members/${groupCode}/guess`, {
      predictionManitto: manittoGuess,
    });
  } catch (error) {
    console.error("나의 예상 마니또 업데이트 실패 ❌", error);
    throw error;
  }
};

// 나의 마니또 정보 공개
export const getMyManittoInfo = async (groupCode) => {
  try {
    const res = await axiosInstance.get(`members/${groupCode}/manitto`);
    return res.data;
  } catch (error) {
    console.error("마니또 공개 정보 가져오기 실패 ❌", error);
    throw error;
  }
};

// 그룹에 참여하고 있는 멤버 목록 가져오기
export const listGroupMembers = async (groupCode) => {
  try {
    const res = await axiosInstance.get(`members/${groupCode}`);
    return res.data;
  } catch (error) {
    console.error("마니또 방 참여 멤버 목록 불러오기 실패 ❌", error);
    throw error;
  }
};
