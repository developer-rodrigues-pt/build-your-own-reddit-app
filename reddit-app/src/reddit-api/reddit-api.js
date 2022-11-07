const searchCommunity = async term => {
    let communities = [];

    const response = await fetch(`https://reddit.com/search.json?q=${term}&type=sr`);
    const json = await response.json();

    communities = json.data.children.map(({ data }) => ({
        community_icon: data.community_icon,
        display_name: data.display_name,
        subscribers: data.subscribers,
        public_description: data.public_description,
        url: data.url
    }));

    return communities;
};

const searchPost = async term => {
    let posts = [];

    const response = await fetch(`https://reddit.com/search.json?q=${term}&type=link`);
    const json = await response.json();

    posts = json.data.children.map(({ data }) => ({
        id: id,
        community_icon: '',
        subreddit: data.subreddit,
        author: data.author,
        created: data.created,
        title: data.title,
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

    const response = await fetch(`https://reddit.com/users/search.json?q=${term}`);
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

const getPostComments = async article => {
    let comments = [];

    const response = await fetch(`https://reddit.com/comments/${article}.json`);
    const json = await response.json();

    comments = json[1].data.children.map(({ data }) => 
        extractCommentData(data));

    return comments;
};

const extractCommentData = data => ({
    icon_img: '',
    author: data.author,
    created: data.created,
    body: data.body,
    ups: data.ups,
    permalink: data.permalink,
    replies: data.replies.data.children.map(({data}) => extractCommentData(data))
});

const getPopularPosts = async () => {
    let posts = [];

    const response = await fetch('https://reddit.com/hot.json');
    const json = await response.json();

    posts = json.data.children.map(({ data }) => ({
        id: id,
        community_icon: '',
        subreddit: data.subreddit,
        author: data.author,
        created: data.created,
        title: data.title,
        thumbnail: data.thumbnail,
        ups: data.ups,
        num_comments: data.num_comments,
        permalink: data.permalink
    }));

    return posts;
};