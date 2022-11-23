import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadAllComments,
    selectAllComments,
    isLoadingComments
} from "./commentsSlice";
import CommentListItem from '../../components/CommentListItem';

const Comments = ({article = 'xyqkef'}) => {
    const dispatch = useDispatch();
    const postComments = useSelector(selectAllComments);
    const isLoading = useSelector(isLoadingComments);
    
    useEffect(() => {
        dispatch(loadAllComments(article));
    }, [dispatch, article]);

    // @author: https://stackoverflow.com/a/46775494
    const constructCommentListItem = (comment) => {
        if (!comment) {
            return;
        }
        if (comment.replies) {
            return (
                <li key={comment.id}>
                    <CommentListItem comment={comment} />
                    <ul>
                        {comment.replies.map(constructCommentListItem)}
                    </ul>
                </li>
            );
        } else {
            return (
                <li key={comment.id}>
                    <CommentListItem comment={comment} />
                </li>
            );
        }
    };

    return (
        <>
            <section className="comments-container">
                <ul>
                {!isLoading ? postComments.map(constructCommentListItem)
                    : <p>Comments Loading...</p>}
                </ul>
            </section>
        </>
    );
};

export default Comments;