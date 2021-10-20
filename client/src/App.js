import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import io from "socket.io-client";
import NavBar from "./components/Navigation/NavBar";
import { useSelector } from 'react-redux'
import GroupPage from './pages/GroupPage'
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import LiveChat from "./pages/LiveChat";
function App() {
  const { user } = useSelector(state => state.user)
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token && !socket) {
      const newSocket = io("http://localhost:5000", {
        query: {
          token: localStorage.getItem("token"),
        },
      });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    return () => { }
  }, []);
  let routes
  if (user) {
    routes = (
      <Switch>
        <Route path="/conversations" render={() => <DashboardPage />} exact socket={socket} />
        <Route path="/chatroom" render={() => <LiveChat socket={socket} />} exact />
        <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        <Route
          path="/contacts"
          render={() => <Contacts socket={socket} />}
          exact
        />
        <Route
          path="/signup"
          exact
          render={() => <Register socket={socket} />}
        />
        <Route path="/group" exact>
          <GroupPage />
        </Route>
        <Redirect to="/" />
      </Switch >
    );
  } else {
    routes = (<Switch>
      <Route
        path="/"
        render={() => <IndexPage socket={socket} />}
        exact />
      <Route path="/register" component={Register} exact />
      <Route path="/login" render={() => <LoginPage setupSocket={setSocket} />} exact />
      <Redirect to="/" />
    </Switch>
    );
  }
  return (
    <Router>
      <NavBar />
      <main>
        {routes}
      </main>
    </Router>
  );
}

export default App;
