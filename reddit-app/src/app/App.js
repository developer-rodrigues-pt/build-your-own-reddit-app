import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home';
// import logo from '../logo.svg';
import '../index.css';

function App() {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
