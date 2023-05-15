import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { projects } from "../Components/ProjectList";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 100px 350px 200px 350px;
`;

const Title = styled.div`
  width: 100%;
  height: 100px;
  font-size: 50px;
  font-weight: 600;
`;

const Writer = styled.div`
  width: auto;
  height: auto;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: start;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

const DetailList = styled.div`
  margin-top: 100px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 80px;
`;

const Detail = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 600;
  h1 {
    margin-right: 30px;
    opacity: 0.5;
  }
  span {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 15px;
      background-color: #7d92e9;
      color: white;
      margin-right: 15px;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }
`;

const Description = styled.div`
  width: 100%;
  margin-top: 100px;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding: 100px 0px 0px 0px;
  h1 {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  span {
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    line-height: 3em;
    font-weight: 600;
  }
`;

const Comment = styled.section`
  margin-top: 100px;
  width: 100%;
  padding: 100px 0px 0px 0px;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  span:last-child {
    margin-left: 20px;
  }
  input {
    width: 100%;
    height: 200px;
    margin-top: 30px;
    border-radius: 15px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button {
    background-color: #7d92e9;
    border: 0;
    padding: 8px 15px;
    color: white;
    font-weight: 600;
    border-radius: 20px;
    float: right;
    margin-top: 20px;
  }
`;

function Project() {
  const { projectId } = useParams();

  return (
    <>
      <Header />
      <Container>
        <Title>{projects[Number(projectId) - 1].title}</Title>
        <Writer>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          <span>
            {projects[Number(projectId) - 1].writer}&nbsp;&nbsp;
            |&nbsp;&nbsp;&nbsp;
            {projects[Number(projectId) - 1].date}
          </span>
        </Writer>
        <DetailList>
          <Detail>
            <h1>모집 인원</h1>
            <span>{projects[Number(projectId) - 1].crew}명</span>
          </Detail>
          <Detail>
            <h1>모집 마감</h1>
            <span>{projects[Number(projectId) - 1].end}일 남음</span>
          </Detail>
          <Detail>
            <h1>모집 분야</h1>
            <ul>
              {projects[Number(projectId) - 1].tag.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>
          </Detail>
          <Detail>
            <h1>예상 기간</h1>
            <span>{projects[Number(projectId) - 1].finish}개월</span>
          </Detail>
          <Detail>
            <h1>사용 스택</h1>
            <span>
              {projects[Number(projectId) - 1].stack.map((stack) => (
                <span>{stack}</span>
              ))}
            </span>
          </Detail>
          <Detail>
            <h1>연락 방법</h1>
            <span>
              1대1 채팅{" "}
              <Link to={"/chat"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
            </span>
          </Detail>
        </DetailList>
        <Description>
          <h1>프로젝트 소개</h1>
          <span>{projects[Number(projectId) - 1].description}</span>
        </Description>
        <Description>
          <h1>이런 파트너를 찾아요</h1>
          <span>{projects[Number(projectId) - 1].want}</span>
        </Description>
        <Comment>
          <div>
            <span>댓글</span>
            <span>{projects[Number(projectId) - 1].comments} Comment</span>
          </div>
          <form>
            <input />
            <button>댓글 등록</button>
          </form>
        </Comment>
      </Container>
    </>
  );
}

export default Project;
