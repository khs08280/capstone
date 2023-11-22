import axios from "axios";

/**
 * HTTP Request: 채팅방 데이터 가져오는 모듈입니다.
 * @param {String} roomName 방 이름
 * @param {object} user {username, token}
 * @param {number} id 방 id
 * @returns {object} {id, roomName, data}
 */
export const getChatRoom = async (roomName, user, id, callback) => {
  if (user.token && id) {
    try {
      const response = await axios.get(
        `https://jihyuncap.store/chatroom/chatList?roomId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response.data.data);
      console.log(`방 ID: ${id}`);

      if (callback) {
        callback({
          id: id,
          roomName: roomName,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(
      "에러: 채팅방 데이터를 가져오는 데 실패했습니다. user 토큰 혹은 Id가 전달되지 않았습니다."
    );
  }
};
