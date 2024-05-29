import { useGetPostsQuery, useGetSubRedditPostsQuery } from "../api/apiSlice";
import styles from "../../styles/Posts/Posts.module.css";
import { Post } from "./Post";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../Search/searchSlice";
import { PostSkeleton } from "./PostSkeleton";

const usePostsQuery = (subRedditSelected) => {
    // Determine which query function to use based on subRedditSelected
    const queryFunction = subRedditSelected
        ? useGetSubRedditPostsQuery
        : useGetPostsQuery;

    // Return the selected query function
    return queryFunction(subRedditSelected);
};

function Posts({ subRedditSelected }) {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = usePostsQuery(subRedditSelected);

    const searchTerm = useSelector(selectSearchTerm);

    let content;

    if (isLoading) {
        content = (
                <PostSkeleton posts={10} />
        );
    } else if (isSuccess) {
        console.log(`Got this as success answer --> ${posts}`);
        const feed = posts.data.children;
        let filteredFeed;
        if (searchTerm) {
            filteredFeed = feed
                .filter((post) =>
                    post.data.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
                .map((post) => {
                    return <Post post={post} />;
                });

            if (filteredFeed.length === 0) {
                filteredFeed = <p>No results found :\</p>;
            }
        }
        content = filteredFeed
            ? filteredFeed
            : feed.map((post) => {
                  return <Post post={post} />;
              });
    } else if (isError) {
        console.log(`Directly this --> ${error}`);
        content = <p>{error.toString()}</p>;
    }

    return <section className={styles.feed}>{content}</section>;
}

export { Posts };
