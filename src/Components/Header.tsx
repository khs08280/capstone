import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 10px;

  padding: 30px 300px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
`;
const NavRoute = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25%;
`;

function Header() {
  return (
    <Nav>
      <Link to={"/"}>
        <span>로고</span>
      </Link>
      <NavRoute>
        <Link to={"/chat"}>채팅</Link>
        <Link to={"/createproject"}>프로젝트 생성</Link>
        <span>알림</span>
        <Link to={"/profile"}>프로필</Link>
      </NavRoute>
    </Nav>
  );
}

export default Header;