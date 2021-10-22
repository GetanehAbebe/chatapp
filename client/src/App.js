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
import NewContact from "./pages/NewContact";
import ChatFeed from "./pages/chat/ChatFeed";
function App() {
  const { user } = useSelector(state => state.user)
  let routes
  if (user) {
    routes = (
      <Switch>
        <Route path="/conversations" render={() => <DashboardPage />} exact />
        <Route path="/chatroom" render={() => <LiveChat />} exact />
        <Route
          path="/dashboard"
          render={() => <DashboardPage />}
          exact
        />
        <Route
          path="/contacts"
          render={() => <Contacts />}
          exact
        />
        <Route
          path="/signup"
          exact
          render={() => <Register />}
        />
        <Route path="/group" exact>
          <GroupPage />
        </Route>
        <Route path="/newcontact" render={() => <ChatFeed />} exact />
        <Redirect to="/" />
      </Switch >
    );
  } else {
    routes = (<Switch>
      <Route
        path="/"
        render={() => <ChatFeed />}
        exact />
      <Route path="/register" render={() => <Register />} exact />
      <Route path="/login" render={() => <LoginPage />} exact />
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
