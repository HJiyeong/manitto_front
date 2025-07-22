import axiosInstance from "../utils/axiosInstance";

// 미션 로그 생성하기
export const createMissionLog = async (groupCode, missonLogDto) => {
  try {
    await axiosInstance.post(`mission-logs/${groupCode}`, missonLogDto);
  } catch (error) {
    console.error("미션 로그 업로드 실패 ❌", error);
    throw error;
  }
};

// 미션 로그 완료 표시하기 (1일차, 2일차 공통 미션)
export const markMissionComplete = async (missionLogId) => {
  try {
    await axiosInstance.patch(`mission-logs`, missionLogId);
  } catch (error) {
    console.error("미션 로그 완료 상태 업데이트 실패 ❌", error);
    throw error;
  }
};
