import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { ChatListContext } from "../contexts/chatListContext";
import { useWebSocketContext } from "../contexts/webSocketContext";
import { getChatList } from "../modules/getChatList";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CreateBtn = styled.div`
  border: 3px solid white;
  color: white;
  background-color: dodgerblue;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  display: inline-block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9ac5f4;
  }
`;

const CreateRoomButton = () => {
  const { user } = useContext(UserContext);
  const { publish } = useWebSocketContext();
  const { setChatList } = useContext(ChatListContext);
  const history = useHistory();
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const myUsername = userData ? userData.data.username : null;
  const accessToken = localStorage.getItem("accessToken");

  /**
   * 새 대화방을 생성하는 함수입니다.
   */

  const createRoom = async () => {
    const targetUsername = prompt("채팅 할 username을 입력하세요.");

    if (!targetUsername) {
      // 사용자가 "취소"를 눌렀을 때 함수 실행 종료
      console.error("채팅방 생성이 취소되었습니다.");
      return;
    }
    const roomTitle = prompt("채팅방 이름을 입력하세요.");

    if (!roomTitle) {
      // 사용자가 "취소"를 눌렀을 때 함수 실행 종료
      console.error("채팅방 생성이 취소되었습니다.");
      return;
    }

    if (!(myUsername && targetUsername && roomTitle)) {
      // 필요한 데이터 없을 시 함수 실행 종료합니다.
      console.error(
        "채팅방을 생성할 대화상대 혹은 채팅방 이름을 정확히 입력해주세요."
      );
      return;
    }

    // 필요한 데이터가 존재할 경우 계속합니다.
    try {
      const response = await axios.post(
        `https://jihyuncap.store/chatroom/CreateRoom`,
        {
          roomName: roomTitle,
          username: targetUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // response.data.data는 다음과 같은 형식의 객체가 담깁니다.
      // { id: number, roomName: String, username: String, ownUserName: String, userCount: number }
      const data = response.data.data;
      const { id, roomName, username, ownUserName } = data;

      const destination = `/pub/chat/${id}`;
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      // 대화 상대 및 로그인한 유저를 대화방에 입장시킵니다.
      if (id && roomName && username && ownUserName) {
        // 로그인된 유저 입장
        publish(
          destination,
          {
            type: "ENTER",
            roomId: id,
            username: username,
            message: "enter",
          },
          headers
        );
        // 대화상대 입장
        publish(
          destination,
          {
            type: "ENTER",
            roomId: id,
            username: ownUserName,
            message: "enter",
          },
          headers
        );
        // 입장한 채팅방 목록을 다시 불러옵니다.
        getChatList(user.token, (data) => {
          setChatList(data);
        });
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateBtn
      onClick={() => {
        createRoom();
      }}
    >
      새 채팅방 생성하기
    </CreateBtn>
  );
};

export default CreateRoomButton;
