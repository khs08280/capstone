import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 600px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 100px;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;
const InputId = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  outline: none;
  padding: 0px 5%;
  &::placeholder {
    font-size: 15px;
  }
  &:nth-child(2) {
    margin-top: 8px;
  }
`;
const Btn = styled.input`
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 17px;
  text-align: center;
  margin-top: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

const GoogleLogin = styled.div`
  width: 400px;
  height: 50px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  svg {
    margin-right: 10px;
  }
`;
const KakaoLogin = styled.div`
  width: 400px;
  height: 50px;
  background-color: #fee500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`;
const Wrapper = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  return (
    <>
      <Header></Header>
      <Container>
        <Box>
          <Title>로그인</Title>
          <FormBox>
            <InputId placeholder="아이디"></InputId>
            <InputId placeholder="비밀번호"></InputId>
            <Btn type="submit" value={"로그인"}></Btn>
          </FormBox>
          <SocialBox>
            <GoogleLogin>
              <Link to={"/login"}>
                <Wrapper>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                  구글 로그인
                </Wrapper>
              </Link>
            </GoogleLogin>
            <KakaoLogin>
              <a href={"/login"}>
                <Wrapper>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                  </svg>{" "}
                  카카오 로그인
                </Wrapper>
              </a>
            </KakaoLogin>
          </SocialBox>
        </Box>
      </Container>
    </>
  );
}

export default Login;
