import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { StyledComponentProps } from "styled-components";
import ListPagenation from "./Paging";
import React from "react";
import StackMapping from "./StackMapping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faBookmark,
  faComment,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_reducers";
import { useHistory } from "react-router-dom";

const ProjectString = styled.div`
  padding: 0px 5%;
  font-size: 1.563rem;
  font-weight: 600;
  span {
    margin-right: 0.313rem;
  }
`;

const ProjectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". . .";
  grid-auto-rows: minmax(0, 1fr);
  row-gap: 5rem;
  column-gap: 1.875rem;
  margin: 3% 2% 3% 2%;
`;
const Box = styled.div`
  display: flex;
  margin-top: 2.5rem;
  width: 100%;
  justify-content: space-between;
  padding-right: 5%;
`;

const SearchForm = styled.div`
  display: flex;
  width: 20%;
  height: 2.5rem;
  padding: 0px 2%;
  border: 0.125rem solid #1361e7;
  outline: none;
  border-radius: 3.125rem;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: inherit;
  &::placeholder {
    font-size: 0.75rem;
    color: black;
    opacity: 0.5;
    font-weight: 600;
  }
`;
const SearchBtn = styled.button`
  border: none;
  outline: none;

  background-color: rgba(0, 0, 0, 0);
  font-size: 1rem;
  opacity: 0.5;
  cursor: pointer;
`;

type BookmkProps = StyledComponentProps<
  "button",
  any,
  { bookmarked?: boolean },
  never
>;

const Bookmk = styled.button<BookmkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.875rem;
  width: 1.875rem;
  border-radius: 0.938rem;
  background-color: #9ac5f4;
  svg {
    color: ${({ bookmarked }) => (bookmarked ? "yellow" : "white")};
  }
  cursor: pointer;
  z-index: 99;
  border: none;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 18.75rem;
  border: 0.188rem solid #c2dedc;
  border-radius: 0.938rem;
  background-color: white;
  padding: 1.3em;
  padding-bottom: 0px;
  color: rgba(0, 0, 0, 0.5);
`;

const Detail = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: start;
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
  margin-top: 0.938rem;
`;

const Range = styled.div`
  width: auto;
  height: auto;
  background-color: #a0f1d0;
  padding: 0.375rem 0.5rem;
  font-size: 0.5rem;
  color: rgba(0, 0, 0, 1);
  font-weight: 600;
  margin-right: 0.5rem;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    margin-right: 0px;
  }
`;

const Stack = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  margin-top: 0.938rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.5rem;
  border-radius: 0.8rem;
  color: rgba(0, 0, 0, 1);
  line-height: 3.125rem;
  padding: 0.625rem;
  font-weight: 600;
  font-size: 1.563rem;
  text-align: center;
  cursor: pointer;
`;
const Writer = styled.div`
  width: 1.563rem;
  height: 1.563rem;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.875rem;
  border-radius: 50%;
  background-color: #a0f1d0;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.125rem;
  border-top: 0.063rem solid #c2dedc;
`;
const UserImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.625rem;
  border-radius: 50%;
  object-fit: cover;
`;
const UserDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    min-width: 1.563rem;
    height: 1.563rem;
    margin-right: 0.625rem;
  }

  span {
    font-size: 0.938rem;
  }
  cursor: pointer;
`;

const ProjectDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 3.125rem;
  line-height: 1.5;
  span {
    margin-right: 0.625rem;
    vertical-align: middle;
  }
`;
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

interface ProjectListProps {
  projectss: Project[];
  onSearch?: (searchResults: any) => void;
}

interface BookmarkData {
  postsId: number;
  id: number;
  name: string;
  title: string;
}

function ProjectList({ projectss, onSearch }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [size, setSize] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [counts, setCounts] = useState(0);
  const [searchContent, setSearchContent] = useState("");
  const [blockNum, setBlockNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState({});

  const [bookmkData, setBookmkData] = useState<BookmarkData[]>([]);
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const user = userData ? userData.data : null;

  const accessToken = localStorage.getItem("accessToken");
  const history = useHistory();
  const backendServer = process.env.REACT_APP_BASE_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    setProjects(projectss);
    setCounts(projectss.length);
  }, [projectss]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      if (onSearch) {
        axios({
          method: "get",
          url: `https://jihyuncap.store/api/v1/posts/search`,
          params: { query: searchContent },
        })
          .then((res) => {
            const searchData = res.data.data;
            onSearch(searchData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchContent]);

  const searchChange = (event) => {
    setSearchContent(event.target.value);
  };

  const toggleBookmark = (projectId, isBookmarked) => {
    if (isLogin) {
      if (isBookmarked == false) {
        axios
          .post(`https://jihyuncap.store/bookmark`, null, {
            params: {
              postId: projectId,
            },
            headers: {
              Authorization: config.headers.Authorization,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            window.alert("해당 글을 북마크하였습니다.");
            history.go(0);
            setBookmarkStatus((prevState) => ({
              ...prevState,
              [projectId]: !prevState[projectId],
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (isBookmarked) {
        const bookmarkToDelete = bookmkData.find(
          (bookmark) => bookmark.postsId === projectId
        );
        if (bookmarkToDelete) {
          if (window.confirm("북마크를 해제하시겠습니까?")) {
            const bookmarkId = bookmarkToDelete.id;

            axios({
              method: "delete",
              url: `https://jihyuncap.store/bookmark/${bookmarkId}`,
              headers: config.headers,
            })
              .then((res) => {
                history.go(0);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
      setProjects((prevProjects) => {
        return prevProjects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              isBookmark: !isBookmarked,
            };
          }
          return project;
        });
      });
    }
  };

  const navigateToProjectDetail = (projectId) => {
    const projectDetailURL = `/${projectId}`;
    window.location.href = projectDetailURL;
  };

  const fetchDataAndSetBookmarks = async () => {
    try {
      const res = await axios.get(`https://jihyuncap.store/bookmark`, config);
      setBookmkData(res.data.data);
      const updatedProjects = projectss.map((project) => {
        const isBookmarked = bookmkData.some(
          (bookmark) => bookmark.postsId == project.id
        );
        return { ...project, isBookmark: isBookmarked };
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      const initialBookmarkStatus = {};
      projectss.forEach((project) => {
        initialBookmarkStatus[project.id] = false;
      });
      fetchDataAndSetBookmarks();
    }
  }, [isLogin, projectss]);

  return (
    <>
      <Box>
        <ProjectString>
          <span>프로젝트 찾기</span>

          <FontAwesomeIcon
            icon={faBoltLightning}
            style={{ color: "yellowgreen", marginLeft: "10px" }}
          />
        </ProjectString>

        <SearchForm>
          <SearchInput
            onChange={searchChange}
            value={searchContent}
            type="text"
            placeholder="검색"
          ></SearchInput>
          <SearchBtn>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchBtn>
        </SearchForm>
      </Box>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProjectBox>
          {projects.reverse().map((project) => (
            <Project key={project.id}>
              <Detail>
                <TagBox>
                  <span>마감일 | {project.recruitmentPeriod}</span>
                  <Tag>
                    {project.position.map((ps, index) => (
                      <Range key={index}>{ps}</Range>
                    ))}
                  </Tag>
                  <Stack>
                    {project.techStack.map((stack, index) => (
                      <StackMapping key={index} stack={stack} />
                    ))}
                  </Stack>
                </TagBox>
                <Bookmk
                  bookmarked={project.isBookmark}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(project.id, project.isBookmark);
                  }}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </Bookmk>
              </Detail>
              <Title onClick={() => navigateToProjectDetail(project.id)}>
                {project.title}
              </Title>
              <User>
                <UserDetail>
                  {user?.image && user.id === project.userId ? (
                    <UserImage src={user?.image} />
                  ) : (
                    <Writer>{project?.username[0]}</Writer>
                  )}
                  <span>{project.username}</span>
                </UserDetail>
                <ProjectDetail>
                  <span>
                    <FontAwesomeIcon icon={faEye} /> {project.view}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faComment} />{" "}
                    {project.totalCommentsAndReplies}
                  </span>
                </ProjectDetail>
              </User>
            </Project>
          ))}
        </ProjectBox>
      )}
      <ListPagenation
        limit={size}
        page={startPage}
        setPage={setStartPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        counts={counts}
      />
    </>
  );
}

export default ProjectList;
