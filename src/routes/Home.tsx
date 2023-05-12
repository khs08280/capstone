import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Notice = styled.div`
  width: auto;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: whitesmoke;
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
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;

  font-size: 50px;
  font-weight: 800;
  color: ${(props) => props.theme.bgColor};
`;

const projects = [
  {
    id: 1,
    title: "프로젝트 하실분",
    writer: "닉네임",
    view: 1,
    comments: 1,
    end: 3,
    tag: ["프론트엔드", "백엔드"],
    stack: ["리액트", "스프링"],
  },
  {
    id: 2,
    title: "사이드 프로젝트 디자이너 구해요",
    writer: "닉네임2",
    view: 2,
    comments: 2,
    end: 4,
    tag: ["프론트엔드", "디자이너"],
    stack: ["자바", "스프링"],
  },
  {
    id: 3,
    title: "프로젝트 하실분3",
    writer: "닉네임3",
    view: 3,
    comments: 3,
    end: 5,
    tag: ["프론트엔드", "안드로이드"],
    stack: ["NodeJS", "스프링"],
  },
  {
    id: 4,
    title: "프로젝트 하실분3",
    writer: "닉네임3",
    view: 3,
    comments: 3,
    end: 5,
    tag: ["프론트엔드", "안드로이드"],
    stack: ["NodeJS", "스프링"],
  },
  {
    id: 5,
    title: "프로젝트 하실분3",
    writer: "닉네임3",
    view: 3,
    comments: 3,
    end: 5,
    tag: ["프론트엔드", "안드로이드"],
    stack: ["NodeJS", "스프링"],
  },
  {
    id: 6,
    title: "프로젝트 하실분3",
    writer: "닉네임3",
    view: 3,
    comments: 3,
    end: 5,
    tag: ["프론트엔드", "안드로이드"],
    stack: ["NodeJS", "스프링"],
  },
  {
    id: 7,
    title: "프로젝트 하실분3",
    writer: "닉네임3",
    view: 3,
    comments: 3,
    end: 5,
    tag: ["프론트엔드", "안드로이드"],
    stack: ["NodeJS", "스프링"],
  },
];

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 80px;
  column-gap: 30px;
  margin: 100px 10%;
`;
const Project = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: whitesmoke;
  border-radius: 10%;
  padding: 20px;
  padding-bottom: 0px;
  color: rgba(0, 0, 0, 0.5);
`;

const Detail = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    font-weight: 600;
  }
`;

const Tag = styled.div`
  display: flex;
  margin-top: 15px;
`;

const Ee = styled.div`
  width: auto;
  height: auto;
  background-color: teal;
  padding: 5px 7px;
  font-size: 10px;
  color: white;
  margin-right: 15px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stack = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  span {
    margin-right: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 120px;
  border-radius: 25px;
  padding: 10px;

  font-size: 23px;

  font-weight: 600;
  text-align: center;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-top: 1px solid;
`;

const UserDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    min-width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  span {
    font-size: 15px;
  }
`;

const ProjectDetail = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin-right: 10px;
  }
`;

function Home() {
  return (
    <>
      <Header />
      <Notice>
        <p>공 지 사 항</p>
        <p>
          반응형 grid로 수정, 프로젝트 페이지(기본정보, 댓글), 프로젝트
          생성(기본 form),프로필, 채팅은 후순위
        </p>
      </Notice>
      <DotBox>
        <Dot />
      </DotBox>
      <Filter>
        <p>정 렬 컴 포 넌 트</p>
        <p>입 주 예 정</p>
      </Filter>
      <ProjectList>
        {projects.map((project) => (
          <Link to={`/${project.id}`}>
            <Project key={project.id}>
              <Detail>
                <TagBox>
                  <span>마감일 | {project.end}일 남음</span>
                  <Tag>
                    <Ee>{project.tag[0]}</Ee>
                    <Ee>{project.tag[1]}</Ee>
                  </Tag>
                </TagBox>
                <Stack>
                  <span>{project.stack[0]}</span>
                  <span>{project.stack[1]}</span>
                </Stack>
              </Detail>
              <Title>{project.title}</Title>
              <User>
                <UserDetail>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                  </svg>
                  <span>{project.writer}</span>
                </UserDetail>
                <ProjectDetail>
                  <span>조회 수 {project.view}</span>
                  <span>댓글 수 {project.comments}</span>
                </ProjectDetail>
              </User>
            </Project>
          </Link>
        ))}
      </ProjectList>
      <Footer></Footer>
    </>
  );
}

export default Home;
