import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";
import { ChatRoomProvider } from "../contexts/chatRoomContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div``;

const StyledArea = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  padding: 85px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  & > * {
    max-height: 700px;
    background-color: white;
    border: 3px solid dodgerblue;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
`;

const ToHome = styled.span`
  color: dodgerblue;
  font-weight: 800;
  margin-top: 200px;
  font-size: 35px;
  position: absolute;
  top: -40px;
  left: 300px;
  cursor: pointer;
  border: none;
  background-color: inherit;
`;

const ChatArea = () => {
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  };

  return (
    <Container>
      <StyledArea>
        <ChatRoomProvider>
          <ToHome onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ToHome>
          <ChatRoom />
          <ChatList />
        </ChatRoomProvider>
      </StyledArea>
    </Container>
  );
};

export default ChatArea;
