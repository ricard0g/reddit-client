import { useGetPostsQuery, useGetSubRedditPostsQuery } from "../api/apiSlice";
import styles from "../../styles/Posts/Posts.module.css";
import { Post } from "./Post";

function Posts({ subRedditSelected }) {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = subRedditSelected
        ? useGetSubRedditPostsQuery(subRedditSelected)
        : useGetPostsQuery();

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
