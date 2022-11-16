import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Heading from '../components/Heading';
import PopularPostsPreviews from '../features/popularPostsPreviews/PopularPostsPreviews';
import SearchPosts from '../features/searchPosts/SearchPosts';

function App() {
  return (
    <Router>
      <Heading />
      <Switch>
        <Route path="/search">
          <SearchPosts />
        </Route>
        <Route path="/">
          <PopularPostsPreviews />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
