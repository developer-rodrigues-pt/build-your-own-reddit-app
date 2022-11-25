const ENDPOINTS = {
    _base_url: 'https://www.reddit.com',
    
    _popular: () => '/hot.json',
    _search_post: (term) => `/search.json?q=${term}&type=link`,
    _get_post: (article) => `/${article}.json`,
    _get_post_comments: (article) => `/comments/${article}.json`,

    get: function (endpoint, ...values) {
        return this._base_url + this[`_${endpoint}`](...values);
    }
};

export const getPopularPosts = async () => {
    let posts = [];

    const response = await fetch(ENDPOINTS.get('popular'));
    const json = await response.json();

    posts = json.data.children.map(extractPostData);

    return posts;
};

export const searchPost = async term => {
    let posts = [];

    const response = await fetch(ENDPOINTS.get('search_post', term));
    const json = await response.json();

    posts = json.data.children.map(extractPostData);

    return posts;
};

export const getPost = async article => {
    const response = await fetch(ENDPOINTS.get('get_post', article));
    const json = await response.json();

    return extractPostData(json[0].data.children[0]);
};

const extractPostData = ({data}) => ({
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
});

const extractPopularPostBodyContent = (popularPost) => {
    const replaceAmp = (url) => url.replaceAll('&amp;', '&');

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

export const getPostComments = async article => {
    let comments = [];

    const response = await fetch(ENDPOINTS.get('get_post_comments', article));
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
    replies: data.replies ? data.replies.data.children.map(({data, kind}) => kind === 't1' ? extractCommentData(data) : null) : []
});
