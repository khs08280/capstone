import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";

const MenuContainer = styled.div`
  background-color: whitesmoke;
  opacity: 1;
  padding: 0.313rem;
  width: 12.5rem;
  display: "block";
  border-radius: 0.625rem;
  position: absolute;
  top: 2.5rem;
  right: -3.25rem;
  box-shadow: 0px 0.188rem 0.188rem rgba(0, 0, 0, 0.2);
`;
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

const Button = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Writer = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.875rem;
  border-radius: 50%;
  background-color: #a0f1d0;
`;
const UserImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.625rem;
  border-radius: 50%;
  object-fit: cover;
`;

const HandleUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = localStorage.getItem("isLogin") === "true";
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const user = userData ? userData.data : null;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleMenu}>
        {user ? (
          <>
            {user?.image ? (
              <UserImage src={user?.image} />
            ) : (
              <Writer>{user?.username[0]}</Writer>
            )}
            {isOpen === false ? null : (
              <MenuContainer ref={menuRef}>
                <Link to={"/profile"}>
                  <MenuItem>
                    <span>마이 페이지</span>
                  </MenuItem>
                </Link>
                <LogoutButton />
              </MenuContainer>
            )}
          </>
        ) : (
          // 사용자 데이터가 없을 때의 처리
          <div>비로그인 상태</div>
        )}
      </Button>
    </>
  );
};

export default HandleUser;
