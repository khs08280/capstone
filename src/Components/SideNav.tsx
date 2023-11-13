import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../_reducers";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 15.625rem;
  height: calc(100vh - 5rem);
  border-right: 0.063rem solid #dadce0;
  position: sticky;
  top: 5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  color: #586672;
`;

const NavBox = styled.ul`
  font-weight: 600;
  padding-top: 1.875rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  &::last-child {
    margin-top: 1.875rem;
  }
`;

const Nav = styled.li`
  padding: 0.75rem;
  border-radius: 0.5;
  margin-bottom: 0.313rem;
  cursor: pointer;
  transition-property: background-color;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: #d1f5e6;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  line-height: 3;
`;

function SideNav() {
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  return (
    <Container>
      {isLogin == true ? (
        <NavBox>
          <Link to={"/"}>
            <Nav>홈</Nav>
          </Link>
          <Link to={"/createproject"}>
            <Nav>모집 글 작성</Nav>
          </Link>
          <Link to={"/chat"}>
            <Nav>채팅방</Nav>
          </Link>
          <br />
          <Link to={"/profile"}>
            <Nav>마이 페이지</Nav>
          </Link>
        </NavBox>
      ) : (
        <NavBox>
          <Link to={"/"}>
            <Nav>홈</Nav>
          </Link>
          <Link to={"/login"}>
            <Nav>로그인</Nav>
          </Link>
        </NavBox>
      )}

      <Footer>
        2023 ~ &copy; Synergy <br />
        캡스톤 디자인{" "}
      </Footer>
    </Container>
  );
}
export default SideNav;
