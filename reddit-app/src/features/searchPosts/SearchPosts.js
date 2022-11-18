import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loadSearchPosts,
    selectAllPosts,
    isLoadingSearchPosts
} from "./searchPostsSlice";
import PopularPostListItem, { PopularPostListItemPlaceholder } from "../../components/PopularPostListItem";
// TODO: SearchPostListItem and SearchPostListItemPlaceholder

const SearchPosts = () => {
    const { term } = useParams();

    const dispatch = useDispatch();
    const searchPosts = useSelector(selectAllPosts);
    const isLoadingPosts = useSelector(isLoadingSearchPosts);

    useEffect(() => {
        dispatch(loadSearchPosts(term));
    }, [dispatch, term]);

    return (
        <>
            <section className="searchPosts-container">
                <h2 className="section-title">Search posts</h2>
                {!isLoadingPosts ? searchPosts.map((post) => (
                    <div key={post.id}>
                        <PopularPostListItem popularPost={post} />
                    </div>
                )) :
                (
                    <>
                        <PopularPostListItemPlaceholder />
                        <PopularPostListItemPlaceholder />
                        <PopularPostListItemPlaceholder />
                    </>
                )}
            </section>
        </>
    );
};

export default SearchPosts;