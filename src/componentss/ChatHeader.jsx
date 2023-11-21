import React from "react";
import styled from "styled-components";
import CreateRoomButton from "./CreateRoomButton";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  top: 0;
  background-color: dodgerblue;
  color: white;

  .roomname {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const ChatHeader = () => {
  return (
    <StyledHeader>
      <h2 className="roomname">채팅방</h2>
      <CreateRoomButton />
    </StyledHeader>
  );
};

export default ChatHeader;
