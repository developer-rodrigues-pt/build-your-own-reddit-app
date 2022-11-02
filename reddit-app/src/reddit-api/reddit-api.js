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