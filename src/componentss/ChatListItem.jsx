import React, { useContext } from "react";
import styled from "styled-components";
import { ChatRoomContext } from "../contexts/chatRoomContext";
import { UserContext } from "../contexts/userContext";
import { getChatRoom } from "../modules/getChatRoom";

const StyledItem = styled.li`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
  &:active {
    background-color: dodgerblue;
  }

  .roomname {
    font-weight: bold;
  }
  .usercount {
    color: #555;
    font-size: 1rem;
  }
`;

const ChatListItem = ({ id, roomName }) => {
  const { user } = useContext(UserContext);
  const { chatRoom, setChatRoom } = useContext(ChatRoomContext);

  const onClick = () => {
    console.log(id);
    console.log(chatRoom.id);
    if (id !== chatRoom.id) {
      getChatRoom(roomName, user, id, (result) => {
        setChatRoom(result);
      });
    }
  };

  return (
    <StyledItem onClick={onClick}>
      <span className="roomname">{roomName}</span>
    </StyledItem>
  );
};

export default ChatListItem;
