import React from "react";
import styled from "styled-components";
import CreateRoomButton from "./CreateRoomButton";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 15px;
  top: 0;
  color: dodgerblue;
  border-radius: 10px;
  margin-bottom: 10px;

  .roomname {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;
const ToHome = styled.span`
  color: dodgerblue;
  font-weight: 800;
  font-size: 30px;
  cursor: pointer;
  border: none;
  background-color: none;
  box-shadow: none;
`;

const ChatHeader = () => {
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  };
  return (
    <StyledHeader>
      <ToHome onClick={goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </ToHome>
      <CreateRoomButton />
    </StyledHeader>
  );
};

export default ChatHeader;
