import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Chat from "./routes/Chat";
import CreateProject from "./routes/CreateProject";
import Profile from "./routes/Profile";
import Project from "./routes/Project";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/createproject">
          <CreateProject />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/:projectId">
          <Project />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
