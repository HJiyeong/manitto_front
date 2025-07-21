import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import url from '../utils/backend';  // https://api.example.com

const joinRoom = async (code) => {
  const token = localStorage.getItem('accessToken');  // ✅ 저장해둔 토큰 읽기

  const response = await axios.post(
    `${url}/groups/${code}/members`,   // ✅ 코드 주의
    {},                                // POST body는 비어있음
    {
      headers: {
        Authorization: `Bearer ${token}`,   // ✅ 토큰 포함
      },
    }
  );

  return response.data;
};

const useMutateJoinRoom = () => {
  return useMutation({
    mutationFn: joinRoom,
  });
};

export default useMutateJoinRoom;
