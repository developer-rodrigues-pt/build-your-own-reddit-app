import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchPost } from "../../reddit-api/reddit-api";

export const loadSearchPosts = createAsyncThunk(
    'searchPosts/loadSearchPosts',
    async (term) => {
        return await searchPost(term);
    }
);

export const searchPostsSlice = createSlice({
    name: 'searchPosts',
    initialState: {
        posts: [],
        isLoadingSearchPosts: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSearchPosts.pending, (state) => {
                state.isLoadingSearchPosts = true;
                state.hasError = false;
            })
            .addCase(loadSearchPosts.fulfilled, (state, action) => {
                state.isLoadingSearchPosts = false;
                state.posts = action.payload;
            })
            .addCase(loadSearchPosts.rejected, (state) => {
                state.isLoadingSearchPosts = false;
                state.hasError = true;
                state.posts = [];
            })
    }
});

export const selectAllPosts = (state) => state.searchPosts.posts;

export const isLoadingSearchPosts = (state) => state.searchPosts.isLoadingSearchPosts;

export default searchPostsSlice.reducer;