// 현재 보고있는 채팅방 정보 관리
import { createContext, useState } from "react";

export const ChatRoomContext = createContext();

export const ChatRoomProvider = ({ children }) => {
  const [chatRoom, setChatRoom] = useState({
    id: 0,
    roomName: "",
    data: [],
  });

  return (
    <ChatRoomContext.Provider value={{ chatRoom, setChatRoom }}>
      {children}
    </ChatRoomContext.Provider>
  );
};
