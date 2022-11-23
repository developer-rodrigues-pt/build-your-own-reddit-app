import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostComments } from "../../reddit-api/reddit-api";

export const loadAllComments = createAsyncThunk(
    'comments/loadAllComments',
    async (article) => {
        return await getPostComments(article);
    }
);

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        postComments: [],
        isLoadingComments: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllComments.pending, (state) => {
                state.isLoadingComments = true;
                state.hasError = false;
            })
            .addCase(loadAllComments.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.postComments = action.payload;
            })
            .addCase(loadAllComments.rejected, (state) => {
                state.isLoadingComments = false;
                state.hasError = true;
                state.postComments = [];
            })
    }
});

export const selectAllComments = (state) => state.comments.postComments;

export const isLoadingComments = (state) => state.comments.isLoadingComments;

export default commentsSlice.reducer;
