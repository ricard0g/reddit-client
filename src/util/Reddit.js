export const Reddit = {
    getSubReddits: async () => {
        try {
            const response = await fetch('https://www.reddit.com/subreddits/popular.json');

            if(response){
                return response.data.children.map((subreddit) => {
                    return ({
                        name: subreddit.data.display_name,
                        prefixedName: subreddit.data.display_name_prefixed,
                        icon: subreddit.data.icon_img,
                        id: subreddit.data.id
                    })
                })
            };
        } catch(error) {
            console.log(error)
        }
    }
}