import { configureStore } from '@reduxjs/toolkit';
import popularPostsPreviewsReducer from '../features/popularPostsPreviews/popularPostsPreviewsSlice';
import searchPostsReducer from '../features/searchPosts/searchPostsSlice';

export default configureStore({
  reducer: {
    popularPostsPreviews: popularPostsPreviewsReducer,
    searchPosts: searchPostsReducer
  },
});
