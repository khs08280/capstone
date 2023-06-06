import styled from "styled-components";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProjectList from "../Components/ProjectList";
import { useEffect, useState } from "react";

const parts = [
  ["프론트엔드", ["React", "JavaScript", "Vue", "Python"]],
  ["백엔드"],
  ["디자이너"],
  ["안드로이드"],
];

const Notice = styled.div`
  width: auto;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #fff088;
  margin: 30px 300px 30px 300px;
  display: flex;

  border-radius: 20px;
  font-size: 50px;
  font-weight: 800;
  color: ${(props) => props.theme.textColor};
`;

const DotBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
`;

const Filter = styled.div`
  width: auto;
  height: 350px;
  background-color: #7d92e9;
  margin: 30px 300px 30px 300px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 20px;
  padding: 20px 20px;
  font-weight: 600;
  color: ${(props) => props.theme.bgColor};
`;

const Part = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 23px;
    padding: 0px 10px;
    border-right: 2px solid white;
    margin-right: 10px;
    cursor: pointer;

    &:last-child {
      border: none;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Home() {
  const [part, setpart] = useState();
  const onClick = (event) => {
    setpart(event.target.innerText);
  };
  useEffect(() => {
    console.log(part);
  }, [part]);

  return (
    <>
      <Header />
      <Notice>
        <p>공 지 사 항</p>
        <p>
          디자인 갈아엎기(+반응형), 페이징처리, 프로젝트 수정 페이지,정렬
          컴포넌트
        </p>
      </Notice>
      <DotBox>
        <Dot />
      </DotBox>
      <Filter>
        <Part>
          <span onClick={onClick}>프론트엔드</span>
          <span onClick={onClick}>백엔드</span>
          <span onClick={onClick}>디자이너</span>
          <span onClick={onClick}>안드로이드</span>
        </Part>
      </Filter>

      <ProjectList />
      <Footer></Footer>
    </>
  );
}

export default Home;
