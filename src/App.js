import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homescreen/HomeScreen";
import LoginScreen from "./screens/loginscreen/LoginScreen";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionScreen from "./screens/subscriptionScreen/SubscriptionScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar(!sidebar);
  };

  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </div>
  );
};

function App() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { accessToken, loading } = auth;

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/auth" component={LoginScreen} />
      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="/feed/subscriptions">
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>
      <Route path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
