import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
// import logo from '../logo.svg';
import '../index.css';

function App() {
  return (
    <Router>
      <Route path="/">
        <Homepage />
      </Route>
    </Router>
  );
}

export default App;
