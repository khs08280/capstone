import styled from "styled-components";
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorMessage, showErrorMessage } from "../_actions/user_action";
import { ErrorMessage } from "./Login";
import React from "react";

import { RootState } from "../_reducers";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
`;

const Box = styled.div`
  width: 37.5rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 6.25rem 6.25rem;
  background-color: white;
  border-radius: 0.938rem;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1.875rem;
`;
const InputId = styled.input`
  width: 100%;
  height: 3.125rem;
  border: 0.063rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.313rem;
  outline: none;
  padding: 0px 5%;
  margin-top: 0.5rem;
  &::placeholder {
    font-size: 0.938rem;
  }
`;
const Btn = styled.input`
  width: 100%;
  height: 3.125rem;
  background-color: #7d92e9;
  color: white;
  font-size: 1.063rem;
  font-weight: 600;

  border: none;
  text-align: center;
  margin-top: 1.875rem;
  border-radius: 0.313rem;
  cursor: pointer;
`;

function Join() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  let errorMessage = useSelector(
    (state: RootState) => state.errorReducer.errorMessage
  );

  const backendServer = process.env.REACT_APP_BASE_URL;

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);

  const btnPrevent = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `https://jihyuncap.store/api/v1/users/sign-up`,
      data: formData,
    })
      .then((res) => {
        console.log(res);
        dispatch(showErrorMessage("회원가입 성공"));
        history.push("/login");
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response) {
          dispatch(showErrorMessage(error.response.data.message));
        } else {
          dispatch(showErrorMessage("오류가 발생했습니다."));
        }
      });
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, dispatch]);

  return (
    <>
      <Header></Header>
      <Container>
        <Box>
          <Title>회원가입</Title>
          <FormBox onSubmit={btnPrevent}>
            <InputId
              onChange={usernameChange}
              type="text"
              placeholder="아이디"
            ></InputId>
            <InputId
              onChange={passwordChange}
              type="password"
              placeholder="비밀번호"
            ></InputId>
            <InputId
              onChange={emailChange}
              type="email"
              placeholder="이메일"
            ></InputId>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Btn type="submit" value={"회원가입"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default Join;
