import { configureStore } from '@reduxjs/toolkit';
import popularPostsPreviewsReducer from '../features/popularPostsPreviews/popularPostsPreviewsSlice';
import searchPostsReducer from '../features/searchPosts/searchPostsSlice';
import commentsReducer from '../features/comments/commentsSlice';

export default configureStore({
  reducer: {
    popularPostsPreviews: popularPostsPreviewsReducer,
    searchPosts: searchPostsReducer,
    comments: commentsReducer
  },
});
