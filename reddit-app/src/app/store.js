import { configureStore } from '@reduxjs/toolkit';
import popularPostsPreviewsReducer from '../features/popularPostsPreviews/popularPostsPreviewsSlice';

export default configureStore({
  reducer: {
    popularPostsPreviews: popularPostsPreviewsReducer
  },
});
