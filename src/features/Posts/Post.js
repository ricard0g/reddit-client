import styles from "../../styles/Posts/Post.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Post(props) {

    let timeDiff = Math.round((Date.now() - props.post.data.created_utc) / 3600) + "hr. ago";

    if (timeDiff < 1) {//in case is less than one hour
        timeDiff = Math.round(timeDiff * 60) + "min. ago";
        if (timeDiff < 1) {//in case is less than one minute
            timeDiff = "just now";
        }
    }

    const post = props.post;
    const regexpUrl = /\.(jpeg|jpg|png)$/;

    return (
        <section>
            <article className={styles.postContainer}>
                <header className={styles.postHeader}>
                    <p className={styles.subRedditSource}>
                        {post.data.subreddit_name_prefixed} - {timeDiff}
                    </p>
                    <h3 className={styles.postTitle}>{post.data.title}</h3>
                </header>
                <main className={styles.postMain}>
                    <ReactMarkdown
                        className={styles.postText}
                        remarkPlugins={[remarkGfm]}
                    >
                        {post.data.selftext}
                    </ReactMarkdown>
                    {regexpUrl.test(post.data.url) ? (
                        <img
                            src={post.data.url}
                            alt="post"
                            className={styles.postImage}
                        />
                    ) : null}
                </main>
            </article>
            <div className={styles.divider}></div>
        </section>
    );
}

export { Post };
