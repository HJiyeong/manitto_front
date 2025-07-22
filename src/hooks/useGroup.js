import axiosInstance from "../utils/axiosInstance";

// 새로운 마니또 방 생성
export const createGroup = async (groupDto) => {
  try {
    const res = await axiosInstance.post("/groups", groupDto);
    return res.data.inviteCode;
  } catch (error) {
    console.error("방 만들기 실패 ❌", error);
    throw error;
  }
};

// 로그인한 사용자가 참여중인 방 목록 가져오기
export const listMyGroups = async () => {
  try {
    const res = await axiosInstance.get("/groups");
    return res.data;
  } catch (error) {
    console.error("참여중인 방 목록 가져오기 실패 ❌", error);
    throw error;
  }
};

// 방 세부 정보 가져오기
export const getGroupDetails = async (groupCode) => {
  try {
    const res = await axiosInstance.get(`/groups/${groupCode}`);
    return res.data;
  } catch (error) {
    console.error("방 정보 가져오기 실패 ❌", error);
    throw error;
  }
};

// 마니또 방 참여하기
export const joinGroup = async (groupCode) => {
  try {
    await axiosInstance.post(`/groups/${groupCode}/members`);
  } catch (error) {
    console.error("마니또 방 참여하기 실패 ❌", error);
    throw error;
  }
};

// 마니또 방 잠그기 (방장)
export const lockGroup = async (groupCode) => {
  try {
    await axiosInstance.patch(`/groups/${groupCode}/lock`);
  } catch (error) {
    console.error("방 잠그기 실패 ❌", error);
    throw error;
  }
};

// 마니또 매칭하기 (방장)
export const matchGroup = async (groupCode) => {
  try {
    await axiosInstance.post(`/groups/${groupCode}/match`);
  } catch (error) {
    console.error("마니또 매칭 실패 ❌", error);
    throw error;
  }
};

// 마니또 방 삭제하기 (방장)
export const deleteGroup = async (groupCode) => {
  try {
    await axiosInstance.delete(`/groups/${groupCode}`);
  } catch (error) {
    console.error("마니또 방 삭제 실패 ❌", error);
    throw error;
  }
};

// 마니또 방 나가기
export const leaveGroup = async (groupCode) => {
  try {
    await axiosInstance.delete(`/groups/${groupCode}/members`);
  } catch (error) {
    console.error("마니또 방 나가기 실패 ❌", error);
    throw error;
  }
};
