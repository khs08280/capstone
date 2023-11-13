import React from "react";
import styled from "styled-components";
import CreateRoomButton from "./CreateRoomButton";

const ChatHeader = () => {
  return (
    <StyledHeader>
      <h2 className="roomname">채팅방</h2>
      <CreateRoomButton />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  position: fixed;
  top: 0;
  background-color: dodgerblue;
  color: white;

  .roomname {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export default ChatHeader;
