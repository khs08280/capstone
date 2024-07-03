// 참여중인 채팅방 목록 관리하는 전역 상태
import { createContext, useState } from "react";

export const ChatListContext = createContext();

export const ChatListProvider = ({ children }) => {
  const [chatList, setChatList] = useState();

  return (
    <ChatListContext.Provider value={{ chatList, setChatList }}>
      {children}
    </ChatListContext.Provider>
  );
};
