import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPopularPosts } from '../../reddit-api/reddit-api';

export const loadAllPreviews = createAsyncThunk(
    'popularPostsPreviews/loadAllPreviews',
    async () => {
        return await getPopularPosts();
    }
);

export const popularPostsPreviewsSlice = createSlice({
    name: 'popularPostsPreviews',
    initialState: {
        popularPosts: [],
        isLoadingPopularPosts: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllPreviews.pending, (state) => {
                state.isLoadingPopularPosts = true;
                state.hasError = false;
            })
            .addCase(loadAllPreviews.fulfilled, (state, action) => {
                state.isLoadingPopularPosts = false;
                state.popularPosts = action.payload;
            })
            .addCase(loadAllPreviews.rejected, (state) => {
                state.isLoadingPopularPosts = false;
                state.hasError = true;
                state.popularPosts = [];
            })
    }
});

export const selectAllPreviews = (state) => state.popularPostsPreviews.popularPosts;

export const isLoading = (state) => state.popularPostsPreviews.isLoadingPopularPosts;

export default popularPostsPreviewsSlice.reducer;
