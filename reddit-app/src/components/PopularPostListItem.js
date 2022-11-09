import React from 'react';



export default function PopularPostListItem({ popularPost }) {
    let created_by = `Posted by ${popularPost.author} ${popularPost.created}`;
    let body = generatePopularPostBody(popularPost.bodyContent);

    return (
        <article key={popularPost.id} 
                 className="post">
            <header>
                <div role="presentation">
                    <div className="community_icon">
                        <img src={popularPost.community_icon}
                             alt="community icon" />
                    </div>
                    <p className="subreddit_and_created_by">
                        <span className="subreddit">{popularPost.subreddit}</span>
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
                    <span className="ups">{popularPost.ups}</span>
                    <a className="comments" href="">{popularPost.num_comments}</a>
                    <a className="share" href="">Share</a>
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
        default:
            body = (
                <div>Unknown type of body content!</div>
            );
    }
    return body;
};

const removeHttpsWWW = (url) => url.replace('https://', '').replace('www.', '');