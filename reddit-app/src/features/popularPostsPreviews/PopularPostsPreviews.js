import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadAllPreviews,
    selectAllPreviews,
    isLoading
} from './popularPostsPreviewsSlice';
import PopularPostListItem, { PopularPostListItemPlaceholder } from '../../components/PopularPostListItem';

const PopularPostsPreviews = () => {
    const dispatch = useDispatch();
    const popularPostsPreviews = useSelector(selectAllPreviews);
    const isLoadingPreviews = useSelector(isLoading);

    useEffect(() => {
        dispatch(loadAllPreviews());
    }, [dispatch]);

    return (
        <>
            <section className="popularPosts-container">
                <h2 className="section-title">Popular posts</h2>
                {!isLoadingPreviews ? popularPostsPreviews.map((popularPost) => (
                    <div key={popularPost.id}>
                        <PopularPostListItem popularPost={popularPost} />
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

export default PopularPostsPreviews;