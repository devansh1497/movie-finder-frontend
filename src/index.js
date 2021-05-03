import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/utilities.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Header } from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DataNotFound from './DataNotFound';
ReactDOM.render(
  <React.StrictMode>
    <div className="header py-bottom-5">
    <Header/>
    </div>
    <div style={{backgroundColor: '#f1f3f6'}}>
    <Router>
      <Switch>
        <Route component={App} path="/" key={document.location.href}/>
        <Route component={DataNotFound} exact path="/no-data"/>
      </Switch>
    </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
