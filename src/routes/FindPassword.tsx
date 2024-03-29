import styled from "styled-components";
import Header from "../Components/Header";
import axios from "axios";
import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  hideErrorMessage,
  loginUser,
} from "../_actions/user_action";
import { Link, Redirect, useHistory } from "react-router-dom";
import { RootState, store } from "../_reducers";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 1.25rem;
`;

const JoinString = styled.span`
  font-size: 1.063rem;
  font-weight: 800;
`;
const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
`;

const Sub = styled.span`
  font-size: 0.938rem;
  color: #838486;
  margin-top: 3.438rem;
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
  &::placeholder {
    font-size: 0.938rem;
  }
  &:nth-child(2) {
    margin-top: 0.5rem;
  }
`;
const Btn = styled.input`
  width: 100%;
  height: 3.125rem;
  background-color: #7d92e9;
  outline: none;
  color: white;
  border: 0 solid black;
  font-size: 1.063rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1.875rem;
  border-radius: 0.313rem;
  cursor: pointer;
`;
export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 1.25rem;
`;

function FindPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [findedId, setFindedId] = useState({ username: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const backendServer = process.env.REACT_APP_BASE_URL;

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const btnPrevent = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `https://jihyuncap.store/api/v1/users/forgot-password`,
        null,
        {
          params: {
            email,
          },
        }
      );
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message?.split(",")[0] || "오류가 발생했습니다"
      );
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Title>비밀번호 찾기</Title>
          <Sub>임시 비밀번호를 보낼 이메일을 입력해주세요</Sub>
          <FormBox onSubmit={btnPrevent}>
            <InputId
              onChange={emailChange}
              type="email"
              placeholder="이메일"
              value={email}
            ></InputId>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Btn type="submit" value={"비밀번호 찾기"}></Btn>
          </FormBox>
        </Box>
      </Container>
    </>
  );
}

export default FindPassword;
