import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import MlIndex from './components/MlIndex';
import Success from './components/Success';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/passwordReset" component={PasswordReset}></Route>
          <Route path="/forgotYourpass/check" component={ForgotPassword}></Route>
          <Route path="/success" component={Success}></Route>
          <Route path="/loggedIn" component={MlIndex}></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
