import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

//layout
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";


//auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//redux
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

//dashboard
import Dashboard from "./components/dashboard/Dashboard";
import Tests from "./components/tests/Tests";
import Test from "./components/test/Test";
import TestsResults from "./components/tests/TestsResult";
import MyTests from "./components/tests/MyTests";
import CreateTest from "./components/createTest/CreateTest";
import TestResult from "./components/tests/TestResult";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/tests/" component={Tests} />
            <PrivateRoute exact path="/tests/create" component={CreateTest} />
            <PrivateRoute exact path="/tests/results" component={TestsResults} />
            <PrivateRoute exact path="/tests/my" component={MyTests} />
            <PrivateRoute exact path="/tests/:id" component={Test} />
            <PrivateRoute exact path="/tests/results/:id" component={TestResult} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
