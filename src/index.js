import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Header } from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DataNotFound from './DataNotFound';
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router>
      <Switch>
        <Route component={App} path="/" key={document.location.href}/>
        <Route component={DataNotFound} exact path="/no-data"/>
        {/* <Route component={App} path="/home"/> */}
        {/* <Route component={App} path="/error"/> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
