import React from "react";
import { get_time_diff_simplified, nFormatter } from "../util/util";

export default function CommentListItem({ comment }) {
    const created = ` . ${get_time_diff_simplified(comment.created)} ago`;

    return (
        <article key={comment.id}
                 className="comment">
            <header>
                <div className="author_image">
                    <img src="/build-your-own-reddit-app/letter-r.png"
                         alt="author image" />
                </div>
                <p class="author_and_created">
                    <span class="author">{`u/${comment.author}`}</span>
                    <span class="created">{created}</span>
                </p>
            </header>
            <p class="body">
                {comment.body}
            </p>
            <footer>
                <p class="ups">{nFormatter(comment.ups, 1)}</p>
            </footer>
        </article>
    );
}