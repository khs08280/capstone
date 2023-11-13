import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const MenuContainer = styled.div`
  background-color: white;
  border: 0.063rem solid rgba(0, 0, 0, 0.1);
  width: 12.5rem;
  border-radius: 0.625rem;
  padding: 0.625rem;
  display: "block";
  position: absolute;
  left: 1.25rem;
  top: 3.125rem;
`;
const XBox = styled.div`
  width: auto;
  height: 1.563rem;
`;

const MenuItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
  margin-top: 0.625rem;
  border-radius: 0.313rem;

  &:hover {
    background-color: #ddd;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  float: left;
  position: absolute;
  left: 9.375rem;
  top: 1.875rem;
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoginString = localStorage.getItem("isLogin");
  const isLogin = isLoginString === "true";
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
        <FontAwesomeIcon
          icon={faBars}
          style={{ float: "left", fontSize: "1.563rem" }}
        />
        {isOpen === false ? null : (
          <MenuContainer ref={menuRef}>
            <XBox>
              <FontAwesomeIcon
                onClick={toggleMenu}
                icon={faXmark}
                style={{
                  float: "right",
                  cursor: "pointer",
                  fontSize: "1.875rem",
                  display: "block",
                }}
              />
            </XBox>
            {isLogin === true ? (
              <>
                <Link to={"/chat"}>
                  <MenuItem>
                    <span>채팅</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </MenuItem>
                </Link>
                <Link to={"/createproject"}>
                  <MenuItem>
                    <span>프로젝트 생성</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </MenuItem>
                </Link>
              </>
            ) : null}

            {isLogin === true ? (
              <MenuItem>
                <LogoutButton />
                <FontAwesomeIcon
                  style={{ width: "1.25rem" }}
                  icon={faRightFromBracket}
                />
              </MenuItem>
            ) : (
              <Link to={"/login"}>
                <MenuItem>
                  <span>로그인</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MenuItem>
              </Link>
            )}
          </MenuContainer>
        )}
      </Button>
    </>
  );
};

export default Menu;
