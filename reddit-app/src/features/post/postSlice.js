import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPost } from "../../reddit-api/reddit-api";

export const loadPost = createAsyncThunk(
    'post/loadPost',
    async (article) => {
        return await getPost(article);
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        postData: {},
        isLoadingPost: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPost.pending, (state) => {
                state.isLoadingPost = true;
                state.hasError = false;
            })
            .addCase(loadPost.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.postData = action.payload;
            })
            .addCase(loadPost.rejected, (state) => {
                state.isLoadingPost = false;
                state.hasError = true;
                state.postData = {};
            })
    }
});

export const selectPost = (state) => state.post.postData;

export const isLoadingPost = (state) => state.post.isLoadingPost;

export default postSlice.reducer;
