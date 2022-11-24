import React from 'react';
import { get_time_diff_simplified, nFormatter, removeHttpsWWW } from '../util/util';

export default function PopularPostListItem({ popularPost }) {
    let created_by = ` . Posted by u/${popularPost.author} ${get_time_diff_simplified(popularPost.created)} ago`;
    let body = popularPost.bodyContent ? generatePopularPostBody(popularPost.bodyContent) : '';

    return (
        <article key={popularPost.id} 
                 className="post">
            <header>
                <div role="presentation">
                    <div className="community_icon">
                        <img src="/build-your-own-reddit-app/letter-r.png"
                             alt="community icon" />
                    </div>
                    <p className="subreddit_and_created_by">
                        <span className="subreddit">{popularPost.subreddit_name_prefixed}</span>
                        <span className="created_by">{created_by}</span>
                    </p>
                </div>
                <h3 className="title">{popularPost.title}</h3>
            </header>
            <div className="body">
                {body}
            </div>
            <footer>
                <p className="ups_comments_and_share">
                    <span className="ups">{nFormatter(popularPost.ups, 1)}</span>
                    <a className="comments" href="">{`${nFormatter(popularPost.num_comments, 1)} comments`}</a>
                    <a className="share" href="">Share</a>
                </p>
            </footer>
        </article>
    );
};

export const PopularPostListItemPlaceholder = () => {
    return (
        <article className="post loading">
            <header>
                <div role="presentation">
                    <div className="community_icon"></div>
                    <p className="subreddit_and_created_by">
                        <span className="subreddit"></span>
                        <span className="created_by"></span>
                    </p>
                </div>
                <h3 className="title"></h3>
            </header>
            <div className="body"></div>
            <footer>
                <p className="ups_comments_and_share">
                    <span className="ups"></span>
                    <a className="comments" href=""></a>
                    <a className="share" href=""></a>
                </p>
            </footer>
        </article>
    );
};

const generatePopularPostBody = ({ type, url }) => {
    let body;
    switch(type) {
        case 'video':
            body = (
                <video width="405" height="720" autoPlay muted>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
            break;
        case 'image':
            body = (
                <img src={url} alt="" />
            );
            break;
        case 'link':
            body = (
                <a className="link" href={url}>{removeHttpsWWW(url)}</a>
            );
            break;
        case 'self':
            body = '';
            break;
        case 'media_embed':
            body = (
                <img src={url} alt="" />
            );
            break;
        default:
            body = (
                <div>Unknown type of body content!</div>
            );
    }
    return body;
};
