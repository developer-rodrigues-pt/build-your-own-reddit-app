const searchCommunity = async term => {
    let communities = [];

    const response = await fetch(`https://www.reddit.com/search.json?q=${term}&type=sr`);
    const json = await response.json();

    communities = json.data.children.map(({ data }) => ({
        community_icon: data.community_icon,
        display_name: data.display_name,
        display_name_prefixed: data.display_name_prefixed,
        subscribers: data.subscribers,
        public_description: data.public_description,
        url: data.url
    }));

    return communities;
};

export const searchPost = async term => {
    let posts = [];

    const response = await fetch(`https://www.reddit.com/search.json?q=${term}&type=link`);
    const json = await response.json();

    posts = json.data.children.map(({ data }) => ({
        id: data.id,
        community_icon: '',
        subreddit: data.subreddit,
        subreddit_name_prefixed: data.subreddit_name_prefixed,
        author: data.author,
        created: data.created,
        title: data.title,
        bodyContent: extractPopularPostBodyContent(data),
        thumbnail: data.thumbnail,
        ups: data.ups,
        num_comments: data.num_comments,
        total_awards_received: data.total_awards_received,
        permalink: data.permalink
    }));

    return posts;
};

const searchUser = async term => {
    let users = [];

    const response = await fetch(`https://www.reddit.com/users/search.json?q=${term}`);
    const json = await response.json();

    users = json.data.children.map(({ data }) => ({
        name: data.name,
        comment_karma: data.comments_karma,
        link_karma: data.link_karma,
        icon_img: data.icon_img,
        public_description: data.subreddit.public_description,
        url: data.subreddit.url
    }));

    return users;
};

export const getPostComments = async article => {
    let comments = [];

    const response = await fetch(`https://www.reddit.com/comments/${article}.json`);
    const json = await response.json();

    comments = json[1].data.children.map(({ data }) => 
        extractCommentData(data));

    return comments;
};

const extractCommentData = data => ({
    id: data.id,
    icon_img: '',
    author: data.author,
    created: data.created,
    body: data.body,
    ups: data.ups,
    permalink: data.permalink,
    replies: data.replies.data.children.map(({data}) => extractCommentData(data))
});

const extractPopularPostBodyContent = (popularPost) => {
    let type;
    let url;

    if (popularPost.is_video) {
        type = 'video';
        url = popularPost.media.reddit_video.fallback_url;
    } else if (popularPost.post_hint === 'image') {
        type = 'image';
        const indexResolution = Math.min(3, popularPost.preview.images[0].resolutions.length - 1);
        url = replaceAmp(popularPost.preview.images[0].resolutions[indexResolution].url);
    } else if (popularPost.post_hint === 'link') {
        type = 'link';
        url = popularPost.url;
    } else if (popularPost.is_self) {
        type = 'self';
    } else if (popularPost.secure_media) {
        type = 'media_embed';
        url = popularPost.secure_media.oembed.thumbnail_url;
    }

    return { type, url };
};

const replaceAmp = (url) => url.replaceAll('&amp;', '&');

export const getPopularPosts = async () => {
    let posts = [];

    const response = await fetch('https://www.reddit.com/hot.json');
    const json = await response.json();

    posts = json.data.children.map(({ data }) => ({
        id: data.id,
        community_icon: '',
        subreddit: data.subreddit,
        subreddit_name_prefixed: data.subreddit_name_prefixed,
        author: data.author,
        created: data.created,
        title: data.title,
        bodyContent: extractPopularPostBodyContent(data),
        thumbnail: data.thumbnail,
        ups: data.ups,
        num_comments: data.num_comments,
        permalink: data.permalink
    }));

    return posts;
};
