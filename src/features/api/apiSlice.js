import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `https://www.reddit.com` }),
    endpoints: (builder) => ({
        getSubReddits: builder.query({
            query: () => `/subreddits/popular.json`,
        }),
        getPosts: builder.query({
            query: () => ({
                url: `/.json`,
                method: "GET",
                params: {
                    feed: "home",
                },
            }),
        }),
        getSubRedditPosts: builder.query({
            query: (subreddit) => `/r/${subreddit}/.json`,
        }),
        getPostComments: builder.query({
            query: (postPermalink) => `${postPermalink}/.json`,
        }),
    }),
});

export const {
    useGetSubRedditsQuery,
    useGetPostsQuery,
    useGetSubRedditPostsQuery,
    useGetPostCommentsQuery,
} = apiSlice;
