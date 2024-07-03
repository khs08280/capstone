import styled from "styled-components";
import Header from "../Components/Header";
import ProjectList from "../Components/ProjectList";
import { useContext, useEffect, useState } from "react";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "../Components/LoadingContext";

import axios from "axios";
import SideNav from "../Components/SideNav";
import { useDispatch, useSelector } from "react-redux";

interface parts {
  name: string;
  stack: [string];
}

const parts = [
  { name: "프론트엔드", stack: ["React", "JavaScript", "Vue", "Python"] },
  { name: "백엔드", stack: ["Spring", "NodeJS", "Django", "Go"] },
  { name: "디자이너", stack: ["Figma", "그림판", "PhotoShop"] },
  {
    name: "모바일",
    stack: ["Kotlin", "Java", "Swift", "Flutter", "ReactNative"],
  },
];

const Container = styled.div`
  position: relative;
  background-color: #f8f9fa;
`;

const FlexBox = styled.div`
  display: flex;
`;

const DotBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.625rem;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: gray;
`;

const ScrollUp = styled.div`
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 2.188rem;
  background-color: white;
  border: 0.25rem solid #9ac5f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem;
  color: #9ac5f4;
  cursor: pointer;
  position: fixed;
  bottom: 1.875rem;
  right: 1.875rem;
  z-index: 999;
  transition: transform 0.3s ease;
  span {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  width: 86%;
`;
const NoticeBox = styled.div`
  width: auto;
  height: 21.875rem;
  align-items: flex-start;
  background-color: #a0f1d0;
  margin: 0px 0px 1.875rem 0px;
  padding: 1.875rem;
  padding-left: 3.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 2.188rem;
  font-weight: 800;
  background-image: url(https://squeezegrowth.com/wp-content/uploads/2022/09/ID-2268-297-tools-to-create-interactive-infographics-2048x956.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
`;
const Notice = styled.div`
  padding: 0.625rem;
  border-radius: 0.625rem;
  background-color: #17e2db;
  font-size: 1.125rem;
  color: #586672;
`;
const NoticeString = styled.span`
  line-height: 1.5;
`;

const Toggle = styled.label`
  margin: 3.125rem 5% 0px 77%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  [type="checkbox"] {
    appearance: none;
    position: relative;
    border: max(0.125rem, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
    margin-right: 0.625rem;
  }
  [type="checkbox"]::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: #9ac5f4;
    transition: left 250ms linear;
  }
  [type="checkbox"]:checked::before {
    background-color: white;
    left: 1em;
  }

  [type="checkbox"]:checked {
    background-color: #1361e7;
    border-color: #1361e7;
  }
  [type="checkbox"]:disabled {
    border-color: lightgray;
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type="checkbox"]:disabled:before {
    background-color: lightgray;
  }

  [type="checkbox"]:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type="checkbox"]:focus-visible {
    outline-offset: max(0.125rem, 0.1em);
    outline: max(0.125rem, 0.1em) solid #1361e7;
  }

  [type="checkbox"]:enabled:hover {
    box-shadow: 0 0 0 max(0.25rem, 0.2em) lightgray;
  }
  .span {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

function Home() {
  const [part, setPart] = useState("프론트엔드");
  const [stack, setStack] = useState<any[]>([]);
  const [select, setSelect] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const ee = ["1", "2", "3", "4"];
  const loading = useContext(LoadingContext);

  const scrollUp = () => {
    const scrollToTop = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        const distance = Math.max(40, currentPosition * 0.2);
        window.scrollTo(0, currentPosition - distance);
        requestAnimationFrame(scrollToTop);
      }
    };

    scrollToTop();
  };

  useEffect(() => {
    switch (part) {
      case "프론트엔드":
        setStack(parts[0].stack);
        break;
      case "백엔드":
        setStack(parts[1].stack);
        break;
      case "디자이너":
        setStack(parts[2].stack);
        break;
      case "모바일":
        setStack(parts[3].stack);
        break;
    }
  }, [part]);

  interface Project {
    id: number;
    position: string[];
    recruitmentPeriod: string;
    techStack: string[];
    title: string;
    content: string;
    totalCommentsAndReplies: number;
    userId: number;
    username: string;
    view: number;
    isBookmark: boolean;
  }

  const dispatch = useDispatch();
  const backendServer = process.env.REACT_APP_BASE_URL;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [size, setSize] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState<Project[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const handleSearch = (searchResults: any) => {
    setProjects(searchResults);
  };

  async function fetchData(pageNumber): Promise<Project[]> {
    try {
      const endpoint = isChecked
        ? `https://jihyuncap.store/api/v1/posts/recruiting`
        : `https://jihyuncap.store/api/v1/posts`;

      const res = await axios.get(endpoint, {
        params: { page: pageNumber, size },
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function loadAllData() {
    let allData: Project[] = [];
    let newData: Project[] = await fetchData(pageNumber);

    while (newData.length > 0) {
      allData = allData.concat(newData);

      const nextPageNumber = pageNumber + 1;
      const nextPageData = await fetchData(nextPageNumber);

      if (nextPageData.length > 0) {
        setPageNumber(nextPageNumber);
        newData = nextPageData;
      } else {
        newData = [];
      }
    }

    setLoadedData(allData);
    setProjects(allData.slice(0, size));
  }

  const btnClick = () => {
    setIsChecked((prevState) => !prevState);
    setPageNumber(0);
  };

  useEffect(() => {
    const fetchDataAndLoadData = async () => {
      try {
        await loadAllData();
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAndLoadData();
  }, [isChecked, startPage, size]);

  // useEffect(() => {
  //   dispatch(setProjectss(projects));
  // }, [projects]);
  return (
    <>
      <Container>
        <Header />
        <FlexBox>
          <SideNav />
          <Wrapper>
            <NoticeBox>
              <Notice>안내 사항</Notice>
              <NoticeString>
                IT관련 프로젝트
                <br /> 매칭 사이트 Synergy입니다
              </NoticeString>
            </NoticeBox>

            <DotBox>
              <Dot />
            </DotBox>
            {/* <Filter /> */}
            <Toggle>
              <input
                checked={isChecked}
                onChange={btnClick}
                role="switch"
                type="checkbox"
              />
              <span>모집 중인 글만 보기</span>
            </Toggle>
            <ProjectList projectss={projects} onSearch={handleSearch} />
            <ScrollUp onClick={scrollUp}>
              <FontAwesomeIcon icon={faAngleUp} />
              <span>Top</span>
            </ScrollUp>
          </Wrapper>
        </FlexBox>
      </Container>
    </>
  );
}

export default Home;
