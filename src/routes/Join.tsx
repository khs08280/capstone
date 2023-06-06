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
  margin-top: 8px;
  &::placeholder {
    font-size: 15px;
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

function Login() {
  return (
    <>
      <Header></Header>
      <Container>
        <Box>
          <Title>회원가입</Title>
          <FormBox>
            <InputId placeholder="아이디"></InputId>
            <InputId placeholder="비밀번호"></InputId>
            <InputId placeholder="비밀번호 확인"></InputId>
            <Btn type="submit" value={"회원가입"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default Login;
