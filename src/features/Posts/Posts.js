import { useGetPostsQuery } from "../api/apiSlice";
import styles from "../../styles/Posts/Posts.module.css";
import {Marked} from "marked";
import markedPlaintify from "marked-plaintify";

function Posts() {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery();

    let content;
    const regexpUrl = /\.jpeg$/;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        console.log(`Got this as success answer --> ${posts}`);
        const feed = posts.data.children;
        content = feed.map((post) => {
            const postText = new Marked({gfm: true}).use(markedPlaintify()).parse(post.data.selftext);
            console.log(postText);
            return (
                <article className={styles.postContainer}>
                    <header className={styles.postHeader}>
                    <p className={styles.subRedditSource}>
                        {post.data.subreddit_name_prefixed}
                    </p>
                    <h3 className={styles.postTitle}>{post.data.title}</h3>
                    </header>
                    <main className={styles.postMain}>
                    <p className={styles.postText}>{postText}</p>
                    {regexpUrl.test(post.data.url) ? (
                        <img src={post.data.url} alt="post" className={styles.postImage} />
                    ) : null}
                    </main>
                    <div className={styles.divider}></div>
                </article>
            );
        });
    } else if (isError) {
        console.log(`Directly this --> ${error}`);
        content = <p>{error.toString()}</p>;
    }

    return (
        <section className={styles.feed}>
            {content}
        </section>
    )
}

export {Posts};