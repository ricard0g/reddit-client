import { useGetPostsQuery, useGetSubRedditPostsQuery } from "../api/apiSlice";
import styles from "../../styles/Posts/Posts.module.css";
import { Post } from "./Post";

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

    let content;
    
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        console.log(`Got this as success answer --> ${posts}`);
        const feed = posts.data.children;
        content = feed.map((post) => {
            return <Post post={post} />;
        });
    } else if (isError) {
        console.log(`Directly this --> ${error}`);
        content = <p>{error.toString()}</p>;
    }

    return <section className={styles.feed}>{content}</section>;
}

export { Posts };
