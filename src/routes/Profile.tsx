import styled from "styled-components";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import SideNav from "../Components/SideNav";
import FileUpload from "../Components/FileUpload";
const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 3.125rem 5% 6.25rem 3%;
  display: flex;
`;
const MyInfo = styled.div`
  width: 31.25rem;
  height: 18.75rem;
  margin-right: 6.25rem;

  h1 {
    font-size: 1.688rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 0.063rem solid #dadce0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 3%;
  border-radius: 0.625rem;
  border-bottom: 0.063rem solid #a0f1d0;
`;

const UserCircle = styled.div`
  width: 4.688rem;
  height: 4.688rem;
  border-radius: 50%;
  background-color: #a0f1d0;
  margin-right: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.563rem;
  font-weight: 600;
`;

const UserImage = styled.img`
  width: 4.688rem;
  height: 4.688rem;
  border-radius: 50%;
  margin-right: 1.25rem;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3.125rem;
  span:first-child {
    margin-bottom: 0.625rem;
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
  }
`;
const EditProfile = styled.div`
  padding: 2% 5%;
  font-size: 1.125rem;
  font-weight: 600;
  color: #287657;
  border: 2px solid #a0f1d0;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const EtcBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 13.125rem);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 1.25rem;
  padding: 5%;
  span:nth-child(odd) {
    font-weight: 600;
    font-size: 1.125rem;
  }
`;

const MyEtc = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyProject = styled.div`
  width: 31.25rem;
  margin-left: 1.25rem;
  margin-bottom: 6.25rem;
  h1 {
    font-size: 1.688rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
`;

const ProejctBox = styled.div`
  background-color: white;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadce0;
`;

const DeleteUser = styled.div`
  display: flex;
  width: 7.5rem;
  justify-content: end;
  align-items: center;
  font-size: 0.938rem;
  color: red;
  padding: 5%;
  cursor: pointer;
  display: inline-block;
`;

const BookmarkBox = styled.div`
  background-color: white;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadce0;
`;

const Bookmark = styled.span`
  margin-top: 0.625rem;
  border-bottom: 0.063rem solid #dadce0;
  padding-bottom: 0.625rem;
`;

function Profile() {
  interface User {
    username: string;
    email: string;
    id: number;
    introduction: string;
    image: string;
  }
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

  const backendServer = process.env.REACT_APP_BASE_URL;

  const history = useHistory();
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const [size, setSize] = useState(15);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://jihyuncap.store/api/v1/posts`;

        const res = await axios.get(endpoint, {
          params: { page: pageNumber, size },
        });

        const filteredProjects = res.data.data.filter(
          (project) => project.username === user?.username
        );

        setProjects(filteredProjects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNumber, size, user]);

  useEffect(() => {
    axios
      .get(`https://jihyuncap.store/api/v1/users/me`, config)
      .then((res) => {
        const userData = res.data.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
        window.alert("로그인이 필요한 페이지입니다.");
        history.push("/login");
      });
  }, [accessToken]);

  useEffect(() => {
    axios
      .get(`https://jihyuncap.store/bookmark`, config)
      .then((res) => {
        setBookmarks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <SideNav />
        <Wrapper>
          <MyInfo>
            <h1>내 프로필</h1>
            <InfoBox>
              <Info>
                {user?.image ? (
                  <UserImage src={user?.image} />
                ) : (
                  <UserCircle>{user?.username[0]}</UserCircle>
                )}

                <UserInfo>
                  <span>{user?.username}</span>
                  <span>{user?.email}</span>
                </UserInfo>

                <EditProfile>
                  <Link to={"/editprofile"}>
                    <FontAwesomeIcon icon={faPencil} /> 수정
                  </Link>
                </EditProfile>
              </Info>
              <EtcBox>
                <span>닉네임</span>
                <span>{user?.username}</span>
                <span>이메일</span>
                <span>{user?.email}</span>
                <span>자기소개</span>
                <span>{user?.introduction}</span>
              </EtcBox>

              <FileUpload />
              <DeleteUser>
                <Link to={"/deleteuser"}>회원 탈퇴</Link>
              </DeleteUser>
            </InfoBox>
          </MyInfo>
          <MyEtc>
            <MyProject>
              <h1>내 프로젝트</h1>
              <ProejctBox>
                {projects.length === 0 ? (
                  <span>북마크한 프로젝트가 없어요</span>
                ) : (
                  projects.map((project) => (
                    <Bookmark>
                      <Link to={`/${project.id}`}>{project.title}</Link>
                    </Bookmark>
                  ))
                )}
              </ProejctBox>
            </MyProject>
            <MyProject>
              <h1>내가 북마크한 프로젝트</h1>
              <BookmarkBox>
                {bookmarks.length === 0 ? (
                  <span>북마크한 프로젝트가 없어요</span>
                ) : (
                  bookmarks.map((bookmark) => (
                    <Bookmark>
                      <Link to={`/${bookmark.postsId}`}>{bookmark.title}</Link>
                    </Bookmark>
                  ))
                )}
              </BookmarkBox>
            </MyProject>
          </MyEtc>
        </Wrapper>
      </Container>
    </>
  );
}
export default Profile;
