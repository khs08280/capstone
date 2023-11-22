import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import SideNav from "../Components/SideNav";
import MyEditor from "../Components/Editor";
import Editor from "../Components/Editor";
import CustomSelect from "../Components/Select";
import MultiSelect from "../Components/MultiSelect";

const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
`;
const Wrapper = styled.div`
  width: 70%;
  margin: 3.125rem 5% 6.25rem 3%;
  padding: 3%;
  background-color: white;
  border: 0.125rem solid #dadce0;
  border-radius: 0.625rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.125rem solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1.875rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.563rem;
    font-weight: 600;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    margin-right: 1.25rem;
    background-color: #7d92e9;
    color: white;
  }
  h1 {
    font-size: 1.563rem;
    font-weight: 600;
  }
`;

const Info = styled.div`
  margin-top: 3.125rem;
  padding: 0px 6.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 3.125rem;
  margin-bottom: 6.25rem;
`;
const InfoSelect = styled.div`
  h1 {
    font-size: 1.563rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
  select {
    width: 80%;
    border-radius: 0.313rem;
    opacity: 0.8;
    font-weight: 600;
    padding: 0.625rem 0.938rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0.125rem solid #7d92e9;
  }

  input {
    border-radius: 0.313rem;
    width: 80%;
    padding: 0.625rem 0.938rem;
    border: 0.125rem solid #7d92e9;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input[type="date"] {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 600;
    height: 2.5rem;
  }
  input[type="date"]::before {
    content: attr(data-placeholder);
    font-family: "Noto Sans KR", sans-serif;
    width: 100%;
    font-weight: 600;
  }
  input[type="date"]:focus::before,
  input[type="date"]:valid::before {
    display: none;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1.875rem;
  input {
    border-radius: 0.313rem;
    padding: 0.625rem 0.625rem;
    border: 0.125rem solid #7d92e9;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    color: black;
    opacity: 0.8;
  }
  input:first-child {
    height: 2.5rem;
  }
`;

const BtnDiv = styled.form`
  display: flex;
  justify-content: end;
  margin-right: 3.125rem;

  button {
    margin-right: 1.25rem;
    background-color: teal;
    border-radius: 0.313rem;
    border: 0;
    color: white;
    font-weight: 600;
    padding: 0.313rem 1.25rem;
    &.submit {
      cursor: pointer;
      background-color: #7d92e9;
      border-radius: 0.313rem;

      border: 0;
      color: white;
      padding: 0.313rem 1.25rem;
      font-weight: 600;
    }
  }
  input {
    background-color: #7d92e9;
    border-radius: 1.25rem;
    border: 0;
    color: white;
    padding: 0.313rem 1.25rem;
    font-weight: 600;
  }
`;

function CreateProject() {
  const history = useHistory();
  const accessToken = localStorage.getItem("accessToken");

  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [expectedDuration, setExpectedDuration] = useState("예상 기간 1~6개월");
  const [recruitmentPeriod, setRecruitmentPeriod] = useState("");
  const [recruitmentSize, setRecruitmentSize] = useState(0);
  const [position, setPosition] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [connect, setConnect] = useState("1대1 채팅");

  const backendServer = process.env.REACT_APP_BASE_URL;

  const people = ["미정", 1, 2, 3, 4, 5];
  const duration = ["미정", 1, 2, 3, 4, 5, 6];
  const connection = ["1대1 채팅", "카카오톡 오픈채팅"];
  const positionArray = [
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "DEVOPS",
    "ANDROID",
    "IOS",
    "DESIGNER",
    "AI",
  ];
  const stack = [
    "JAVA",
    "JavaScript",
    "React",
    "VUE",
    "Python",
    "Angular",
    "NodeJS",
    "SpringBoot",
    "Django",
    "RubyOnRails",
    "PHP",
    "Laravel",
    "ASPNET",
    "ExpressJS",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Swift",
    "AWS",
    "Kotlin",
    "Git",
    "CSharp",
    "Unity",
    "TensorFlow",
  ];

  const [selectedPeople, setSelectedPeople] = useState("인원 미정 ~ 5명");

  const handlePeopleChange = (option) => {
    setSelectedPeople(option);
  };
  const handleConnectionChange = (option) => {
    setConnect(option);
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const editorChange = (content) => {
    setEditorContent(content);
  };

  const expectedDurationChange = (option) => {
    setExpectedDuration(option);
  };
  const recruitmentPeriodChange = (event) => {
    setRecruitmentPeriod(event.target.value);
  };
  const positionChange = (options) => {
    setPosition(options);
  };
  const techStackChange = (options) => {
    setTechStack(options);
  };

  const body = {
    title,
    content: editorContent,
    expectedDuration,
    recruitmentPeriod,
    recruitmentSize: selectedPeople,
    position,
    techStack,
  };

  const btnPrevent = (event) => {
    event.preventDefault();
    console.log(body);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios({
      method: "post",
      url: `https://jihyuncap.store/api/v1/posts`,
      data: body,
      headers: config.headers,
    })
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Container>
        <SideNav />
        <Wrapper>
          <Title>
            <div>1</div>
            <h1>프로젝트 기본정보</h1>
          </Title>
          <Info>
            <InfoSelect>
              <h1>모집 인원</h1>
              <CustomSelect
                options={people}
                selectedOption={selectedPeople}
                onChange={handlePeopleChange}
              />
            </InfoSelect>
            <InfoSelect>
              <h1>모집 마감일</h1>
              <input
                value={recruitmentPeriod}
                onChange={recruitmentPeriodChange}
                type="date"
                data-placeholder="날짜 선택"
                required
                aria-required="true"
              ></input>
            </InfoSelect>
            <InfoSelect>
              <h1>모집 분야</h1>
              <MultiSelect
                options={positionArray}
                defaultMessage="모집 분야 선택"
                onSelectionChange={positionChange}
              />
            </InfoSelect>
            <InfoSelect>
              <h1>예상기간</h1>
              <CustomSelect
                options={duration}
                selectedOption={expectedDuration}
                onChange={expectedDurationChange}
              />
            </InfoSelect>
            <InfoSelect>
              <h1>사용 스택</h1>
              <MultiSelect
                options={stack}
                defaultMessage="사용 스택 선택"
                onSelectionChange={techStackChange}
              />
            </InfoSelect>
            <InfoSelect>
              <h1>연락 방법</h1>
              <CustomSelect
                options={connection}
                selectedOption={connect}
                onChange={handleConnectionChange}
              />
            </InfoSelect>
          </Info>
          <Title>
            <div>2</div>
            <h1>프로젝트 소개</h1>
          </Title>
          <Description>
            <input
              onChange={titleChange}
              type="text"
              placeholder="제목을 입력해주세요"
            />
          </Description>
          <MyEditor onContentChange={editorChange} />
          <BtnDiv>
            <Link to={"/"}>
              <button>취소</button>
            </Link>
            <button onClick={btnPrevent} className="submit" type="submit">
              글 등록
            </button>
          </BtnDiv>
        </Wrapper>
      </Container>
    </>
  );
}
export default CreateProject;
