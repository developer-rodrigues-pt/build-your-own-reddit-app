import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Heading from '../components/Heading';
import PopularPostsPreviews from '../features/popularPostsPreviews/PopularPostsPreviews';
import SearchPosts from '../features/searchPosts/SearchPosts';
import Post from '../features/post/Post';
import Comments from '../features/comments/Comments';

function App() {
  return (
    <Router basename="/build-your-own-reddit-app">
      <Heading />
      <Switch>
        <Route path="/search/:term">
          <SearchPosts />
        </Route>
        <Route path="/posts/:article">
          <Post />
          <Comments />
        </Route>
        <Route path="/">
          <PopularPostsPreviews />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
