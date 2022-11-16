import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadSearchPosts,
    selectAllPosts,
    isLoadingSearchPosts
} from "./searchPostsSlice";
import PopularPostListItem, { PopularPostListItemPlaceholder } from "../../components/PopularPostListItem";
// TODO: SearchPostListItem and SearchPostListItemPlaceholder

const SearchPosts = () => {
    const dispatch = useDispatch();
    const searchPosts = useSelector(selectAllPosts);
    const isLoadingPosts = useSelector(isLoadingSearchPosts);

    const term = 'Portugal'; // TODO: const term = useSelector(select...)

    useEffect(() => {
        dispatch(loadSearchPosts(term));
    }, [term]);

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