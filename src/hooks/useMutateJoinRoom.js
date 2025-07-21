import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const joinRoom = async (code) => {
  const response = await axios.post('/api/join-room', { code });
  return response.data;    // 성공 시 반환되는 데이터 (예: 방 정보)
};

const useMutateJoinRoom = () => {
  return useMutation({
    mutationFn: joinRoom,
  });
};

export default useMutateJoinRoom;
