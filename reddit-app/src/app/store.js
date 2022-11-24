import { configureStore } from '@reduxjs/toolkit';
import popularPostsPreviewsReducer from '../features/popularPostsPreviews/popularPostsPreviewsSlice';
import searchPostsReducer from '../features/searchPosts/searchPostsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import postReducer from '../features/post/postSlice';

export default configureStore({
  reducer: {
    popularPostsPreviews: popularPostsPreviewsReducer,
    searchPosts: searchPostsReducer,
    comments: commentsReducer,
    post: postReducer
  },
});
