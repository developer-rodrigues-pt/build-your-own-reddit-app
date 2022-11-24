import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loadPost,
    selectPost,
    isLoadingPost
} from './postSlice';
import PopularPostListItem, { PopularPostListItemPlaceholder } from "../../components/PopularPostListItem";

const Post = () => {
    const { article } = useParams();

    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const isLoading = useSelector(isLoadingPost);

    useEffect(() => {
        dispatch(loadPost(article));
    }, [dispatch, article]);

    return (
        <>
            <section className="post-container">
                {!isLoading ?
                    <PopularPostListItem popularPost={post} /> :
                    <PopularPostListItemPlaceholder /> }
            </section>
        </>
    );
};

export default Post;