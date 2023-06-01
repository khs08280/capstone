import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Chat from "./routes/Chat";
import CreateProject from "./routes/CreateProject";
import Profile from "./routes/Profile";
import Project from "./routes/Project";
import Login from "./routes/Login";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
