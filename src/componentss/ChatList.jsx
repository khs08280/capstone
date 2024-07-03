import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
import { ChatListContext } from "../contexts/chatListContext";
import { getChatList } from "../modules/getChatList";
import ChatListItem from "./ChatListItem";

const StyledChatRoomList = styled.div`
  height: 100%;
  padding: 20px 10px;
  flex: 3 1 450px;
  border-radius: 30px;

  .list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const ChatList = () => {
  const { user } = useContext(UserContext);
  const { chatList, setChatList } = useContext(ChatListContext);

  useEffect(() => {
    getChatList(user.token, (data) => {
      setChatList(data);
    });
  }, [user]);

  return (
    <StyledChatRoomList>
      <ul className="list">
        {chatList &&
          chatList.map(({ id, roomName, userCount }) => (
            <ChatListItem id={id} roomName={roomName} userCount={userCount} />
          ))}
      </ul>
    </StyledChatRoomList>
  );
};

export default ChatList;
