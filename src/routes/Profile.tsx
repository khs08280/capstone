import { styled } from "styled-components";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const users = {
  id: 1,
  email: "eifjei@gmail.com",
  name: "홍길동",
  password: 1234,
  produce: "안녕하세요",
  stacks: ["Java", "React"],
  hopePro: ["육아 다이어리", "프로젝트 매칭"],
  image: "프로필사진",
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 100px;
  display: flex;
`;

const ProfileBox = styled.div`
  width: 25%;
  height: 80%;
  background-color: black;
  border: 3px solid white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  span {
    margin-bottom: 30px;
  }
`;

const Chat = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  background-color: yellow;
  padding: 10px 20px;
  color: black;
`;

const Subbox = styled.div`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: white;
  font-weight: 600;
  p {
    margin: 18px 0px;
  }
`;
const ProduceBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  height: auto;
  padding: 20px;
  border-top: 2px solid gray;
  color: white;
  font-weight: 600;
  p:first-child {
    margin-bottom: 20px;
    opacity: 0.5;
  }
`;

const EtcBox = styled.div`
  width: 60%;
  height: 100%;
  background-color: black;
  border-radius: 30px;
  border: 3px solid white;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 50%;
  border-bottom: 1px solid white;
  display: flex;
  padding: 20px;
`;

const StackBox = styled.div`
  border-right: 1px solid white;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  color: white;
  span {
    margin-bottom: 30px;
    &:first-child {
      font-size: 1.6rem;
    }
  }
  ul {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }
  ul > span {
    background-color: #7d92e9;
    padding: 3px 20px;
    font-size: 1.6rem;
    border-radius: 30px;
    appearance: none;
    color: black;
  }
  align-items: center;
  font-weight: 600;
`;

const HopePro = styled.div`
  font-weight: 600;
  padding-left: 30px;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  color: white;
  span {
    &:first-child {
      font-size: 1.6rem;
      margin-bottom: 20px;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  ul > span {
    padding: 3px 12px;
    font-size: 15px;
    border-radius: 15px;
  }
  align-items: center;
`;
const CircleStyle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: yellowgreen;
  margin-right: 10px;
`;

const CircleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

function Profile() {
  return (
    <>
      <Header />
      <Wrapper>
        <ProfileBox>
          <Subbox>
            <span>{users.image}</span>
            <p>{users.name}</p>
            <p style={{ marginBottom: "50px" }}>{users.email}</p>
            <Link to={"/chat"}>
              <Chat>1대1 채팅</Chat>
            </Link>
          </Subbox>
          <ProduceBox>
            <p>자기소개</p>
            <p>{users.produce}</p>
          </ProduceBox>
        </ProfileBox>
        <EtcBox>
          <TopDiv>
            <StackBox>
              <span>선호하는 기술</span>
              <ul>
                {users.stacks.map((stack) => (
                  <span>{stack}</span>
                ))}
              </ul>
            </StackBox>
            <HopePro>
              <span>프로젝트 목록</span>
              <ul>
                {users.hopePro.map((hope) => (
                  <CircleBox>
                    <CircleStyle></CircleStyle>
                    <span>{hope}</span>
                  </CircleBox>
                ))}
              </ul>
            </HopePro>
          </TopDiv>
          <div
            style={{
              padding: "20px",
              color: "white",
              fontWeight: "600",
              fontSize: "1.7rem",
            }}
          >
            Github Contribution
          </div>
        </EtcBox>
      </Wrapper>
    </>
  );
}
export default Profile;
