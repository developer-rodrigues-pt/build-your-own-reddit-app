export const getPopularPosts = async () => {
    const json = await fetchJSON('popular');
    
    return json.data.children.map(extractPostData);
};

export const searchPost = async term => {
    const json = await fetchJSON('search_post', term);

    return json.data.children.map(extractPostData);
};

export const getPost = async article => {
    const json = await fetchJSON('get_post', article);

    return extractPostData(json[0].data.children[0]);
};

export const getPostComments = async article => {
    const json = await fetchJSON('get_post_comments', article);

    return json[1].data.children.map(({ data }) => extractCommentData(data));
};

const fetchJSON = async (endpoint, ...values) => {
    const response = await fetch(ENDPOINTS.get(endpoint, ...values));
    
    return await response.json();
};

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
