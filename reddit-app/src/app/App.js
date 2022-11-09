import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PopularPostsPreviews from '../features/popularPostsPreviews/PopularPostsPreviews';

function App() {
  return (
    <Router>
      <Route path="/">
        <PopularPostsPreviews />
      </Route>
    </Router>
  );
}

export default App;
