import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Project() {
  const { projectId } = useParams();

  return (
    <>
      <Header />
      <h1>Project: {projectId}</h1>
      <Footer />
    </>
  );
}

export default Project;
