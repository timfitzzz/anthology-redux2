import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

function requireAuth(nextState, replaceState) {
  // if(Store.getState().user.tokens === {}) {
  //   replaceState({ nextPathname: nextState.location.pathname }, '/login');
  // }
}


//Redux Smart
import CounterPage from "./containers/CounterPage";
import RedditPage from "./containers/RedditPage";
import TodoPage from "./containers/TodoPage";
import UserHomePage from "./containers/UserHomePage";

//Redux Dumb
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import error404 from "./components/404";

export default (
  <Route name="app" path="/" component={App} onEnter={requireAuth}>
      <Route path="home" component={HomePage} />
      <Route path="userhome" component={UserHomePage} />
      <Route path="reddit" component={RedditPage} />
      <Route path="todo" component={TodoPage} />
      <Route path="counter" component={CounterPage} />
      <Route path="about" component={AboutPage} />
      <Route path="*" component={error404}/>
  </Route>
);
