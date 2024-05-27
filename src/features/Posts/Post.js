import styles from "../../styles/Posts/Post.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reddit } from "../../util/Reddit";
import { Comments } from "../Comments/Comments";
import commentsIcon from "../../assets/comment-icon.svg";
import { useState } from "react";

function Post(props) {
    const [showComments, setShowComments] = useState(false);

    const handleClick = (e) => {
        setShowComments(!showComments);
    }

    let timeDiff =
        Math.round(
            (Date.now() - props.post.data.created_utc * 1000) / 3600000
        ) + " hr. ago";
    if (timeDiff < 1) {
        //in case is less than one hour
        timeDiff =
            Math.round(
                (Date.now() - props.post.data.created_utc * 1000) / 60000
            ) + " min. ago";
        if (timeDiff < 1) {
            //in case is less than one minute
            timeDiff = "just now";
        }
    }

    const post = props.post;

    return (
        <section>
            <article className={styles.postContainer}>
                <header className={styles.postHeader}>
                    <p className={styles.subRedditSource}>
                        {post.data.subreddit_name_prefixed} | {timeDiff}
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
                    {Reddit.checkAndRenderContent(post)}
                </main>
                <footer className={styles.footer}>
                    <p>by <span className={styles.postAuthor}>{post.data.author}</span></p>
                    <button className={styles.commentsButton} onClick={handleClick}>
                        <img src={commentsIcon} alt="Comments" className={styles.commentsIcon}/>
                        {post.data.num_comments}
                    </button>
                </footer>
            </article>
            {showComments ? <Comments postPermalink={post.data.permalink}/> : null}
            <div className={styles.divider}></div>
        </section>
    );
}

export { Post };
