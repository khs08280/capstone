import React from "react";
import { useContext, useEffect } from "react";
import { UserContext, UserProvider } from "../contexts/userContext";
import {
  useWebSocketContext,
  WebSocketProvider,
} from "../contexts/webSocketContext";
import ChatArea from "../componentss/ChatArea";
import { ChatListProvider } from "../contexts/chatListContext";
import ChatHeader from "../componentss/ChatHeader";
import Header from "../Components/Header";
import SideNav from "../Components/SideNav";
import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   background-color: #f8f9fa;
// `;
const Wrapper = styled.div`
  display: flex;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  width: 100%;
  margin: 3.125rem 8% 6.25rem 3%;
  padding: 1%;
  background-color: white;
  border: 0.125rem solid #dadce0;
  border-radius: 0.625rem;
`;

function Chat() {
  return (
    <>
      <UserProvider>
        <ChatListProvider>
          <WebSocketProvider>
            <Auth>
              <Header />
              <Wrapper>
                <SideNav />
                <Container>
                  <ChatHeader />
                  <ChatArea />
                </Container>
              </Wrapper>
            </Auth>
          </WebSocketProvider>
        </ChatListProvider>
      </UserProvider>
    </>
  );
}

const Auth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const { connect, disconnect } = useWebSocketContext();

  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const username = userData ? userData.data.username : null;

  useEffect(() => {
    // 세션스토리지에서 token과 username을 불러오고, null이면 전역 상태로 저장
    if (user.token || user.username) {
      console.log("토큰이 저장되어있습니다.");
    } else {
      console.log("토큰을 불러옵니다.");
    }

    const token = localStorage.getItem("accessToken");

    // 세션스토리지에서 불러온 username, token을 전역 상태로 저장
    setUser({ token, username });
    // WebSocket 연결(StompJS)
    connect(token);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 끊기
      disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default Chat;
