import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import url from "../utils/backend";

const joinRoom = async (code) => {
  const response = await axios.post(`${url}/groups/${code}/members`);
  return response.data;
};

const useMutateJoinRoom = () => {
  return useMutation({
    mutationFn: joinRoom,
  });
};

export default useMutateJoinRoom;
