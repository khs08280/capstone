import axios from "axios";

/**
 * 현재 로그인된 사용자가 참여한 채팅방 목록을 가져옵니다.
 * @param {String} token 로그인된 사용자 토큰
 * @param {function} callback 채팅 리스트를 불러온 뒤 실행할 함수
 */
export const getChatList = async (token, callback) => {
  if (token) {
    try {
      const response = await axios.get(
        `https://jihyuncap.store/chatroom/chatRoomList`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);

      if (callback) {
        callback(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
