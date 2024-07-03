import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../_actions/user_action";
import { RootState } from "../_reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MenuItem = styled.div`
  display: flex;
  color: #333;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  margin-top: 0.625rem;
  &:last-child {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: #dadce0;
  }
`;

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(accessToken));
      localStorage.clear();
      history.push("/");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenuItem onClick={handleLogout}>
      <span>로그아웃</span>
      <FontAwesomeIcon
        style={{ width: "0.938rem", height: "0.938rem", marginLeft: "1.25rem" }}
        icon={faRightFromBracket}
      />
    </MenuItem>
  );
}

export default LogoutButton;
