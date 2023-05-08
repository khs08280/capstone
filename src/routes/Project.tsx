import { useParams } from "react-router-dom";
import Header from "../Components/Header";

function Project() {
  const { projectId } = useParams();

  return (
    <>
      <Header />
      <h1>Project: {projectId}</h1>;
    </>
  );
}

export default Project;
