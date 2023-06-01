import styled from "styled-components";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProjectList from "../Components/ProjectList";

const Notice = styled.div`
  width: auto;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #fff088;
  margin: 30px 300px 30px 300px;
  display: flex;

  border-radius: 20px;

  font-size: 50px;
  font-weight: 800;
  color: ${(props) => props.theme.textColor};
`;

const DotBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
`;

// const Filter = styled.div`
//   width: auto;
//   height: 350px;
//   background-color: #7d92e9;
//   margin: 30px 300px 30px 300px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   border-radius: 20px;

//   font-size: 50px;
//   font-weight: 800;
//   color: ${(props) => props.theme.bgColor};
// `;

function Home() {
  return (
    <>
      <Header />
      <Notice>
        <p>공 지 사 항</p>
      </Notice>
      <DotBox>
        <Dot />
      </DotBox>

      <ProjectList />
      <Footer></Footer>
    </>
  );
}

export default Home;
