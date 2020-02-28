import React from "react";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import store from './redux/store'

import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/shards-dashboards.1.1.0.min.css";

export default () => (
  <Provider store={store}>
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </>
    </Router>
  </Provider>
);
