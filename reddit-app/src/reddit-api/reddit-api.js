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