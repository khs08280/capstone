import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChatListContext } from "../contexts/chatListContext";
import { ChatRoomContext } from "../contexts/chatRoomContext";
import { UserContext } from "../contexts/userContext";
import { useWebSocketContext } from "../contexts/webSocketContext";
import { getChatList } from "../modules/getChatList";
import { getChatRoom } from "../modules/getChatRoom";
import Bubble from "./Bubble";

const StyledChatRoom = styled.div`
  height: 100%;
  position: relative;
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 20px;

  .button-exit {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 5px 10px;
    border: 3px solid dodgerblue;
    color: dodgerblue;
    border-radius: 10px;
    box-shadow: 0 0 15px white;
    background-color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:disabled,
    &:disabled:hover {
      border: 3px solid #eee;
      background-color: #eee;
      color: #888;
      font-weight: normal;
      cursor: not-allowed;
    }

    &:hover {
      background-color: dodgerblue;
      color: white;
    }
  }

  .cont-content {
    padding: 10px 5px 0;
    flex: 1 1 0;
    overflow-y: auto;

    .chat-list {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      li {
        margin-bottom: 20px;
      }
    }
  }

  form {
    width: 100%;
    margin: 10px 0 0;
    padding: 0;
  }
  .input {
    bottom: 0px;
    width: 100%;
    margin: 0;
    padding: 15px;
    border-radius: 20px;
    border: 0;
    background-color: #eee;
    font-size: inherit;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #ddd;
    }
  }
`;

const ChatRoom = () => {
  const { chatRoom, setChatRoom } = useContext(ChatRoomContext);
  const { user } = useContext(UserContext);
  const { subscribe, publish } = useWebSocketContext();
  const { setChatList } = useContext(ChatListContext);
  const chatListDOM = useRef();

  // chat: 현재 채팅방 데이터 저장
  const [chat, setChat] = useState();
  // newMessage: 입력할 때마다 채팅 메시지가 저장됨
  const [newMessage, setNewMessage] = useState("");

  const chatScrollDown = () => {
    // 스크롤 아래로 내리는 함수
    if (chatListDOM.current) {
      console.dir(chatListDOM.current);
      chatListDOM.current.scrollTop = chatListDOM.current.scrollHeight;
    }
  };

  useEffect(() => {
    // 현재 보고 있는 채팅방 정보를 담은 chatRoom 전역 상태가 업데이트 될 때마다 대화내역 업데이트
    setChat(chatRoom.data);
    if (chatRoom.id) {
      // WebSocket 구독
      subscribe(
        `/sub/chat/${chatRoom.id}`,
        (message) => {
          console.log(message);
          getChatRoom(chatRoom.roomName, user, chatRoom.id, (data) => {
            setChatRoom(data);
          });
        },
        { Authorization: `Bearer ${user.token}` }
      );
    }
    chatScrollDown(); // 변경이 있을 때마다 스크롤 내리기
  }, [chatRoom]);

  // 메시지 전송자 = 로그인된 유저인지 판별하는 함수
  const isMe = (sender) => {
    return sender === user.username;
  };

  // 메시지 입력되면 실행하는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("입력됨: " + newMessage);

    // 유효성 검사
    if (newMessage === "") {
      console.log("메시지가 입력되지 않았습니다.");
      return;
    }

    setNewMessage("");

    // ========= Start: WebSocket 메시지 전송 =========
    const body = {
      type: "TALK",
      roomId: chatRoom.id,
      username: user.username,
      message: newMessage,
    };
    console.log(body);

    try {
      // publish 시도
      publish(`/pub/chat/${chatRoom.id}`, body, {
        Authorization: `Bearer ${user.token}`,
      });
      getChatRoom(chatRoom.roomName, user, chatRoom.id, (data) => {
        setChatRoom(data);
      });
    } catch (error) {
      console.log("통신 실패: 메시지 전송에 실패했습니다.");
    }
    // ========= End: WebSocket 메시지 전송 =========
  };

  const exitHandler = async () => {
    if (!(chatRoom.id && user.username)) {
      console.log("채팅방에 입장하지 않은 채 나갈 수 없음");
      return;
    }
    try {
      // 현재 채팅방에서 유저 삭제
      axios.get(
        `https://jihyuncap.store/chatroom/exitUser?roomId=${chatRoom.id}&username=${user.username}`
      );
      // 유저 삭제 후 채팅방 목록 다시 조회
      getChatList(user.token, (data) => {
        setChatList(data);
      });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <StyledChatRoom>
      <button className={`button-exit`} onClick={exitHandler}>
        채팅방 나가기
      </button>
      {chat && (
        <div className="cont-content">
          <ol className="chat-list" ref={chatListDOM}>
            {chat.map(({ sender, message, createDate }) => (
              <Bubble
                isMe={isMe(sender)}
                sender={sender}
                message={message}
                createDate={createDate}
              />
            ))}
          </ol>
        </div>
      )}
      <form className="cont-input" onSubmit={handleSubmit}>
        <input
          className="input"
          type={"text"}
          placeholder={"메시지 입력 후 Enter"}
          required
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
      </form>
    </StyledChatRoom>
  );
};

export default ChatRoom;
