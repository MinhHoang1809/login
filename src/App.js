import './App.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Redux from './component/Redux/Redux'
import Admin from './admin/Admin';
import Login from './Login';

export default function App() {
  return (//JSX
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Client />
        </Route>
        <Route path="/redux">
          <Redux />
        </Route>
      </Switch>
    </Router>
  );
}

function Client() {
  return <div>
    <h1>Welcome to System!</h1>
    <MenuClient />
    <ClientRoute />
  </div>
}
function MenuClient() {
  return <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/redux">Redux</Link></li>
  </ul>
}
function ClientRoute() {
  return <Switch>
    <Route path="/login">
      <Login />
    </Route>
  </Switch>
}







