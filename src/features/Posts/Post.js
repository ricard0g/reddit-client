import styles from "../../styles/Posts/Post.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reddit } from "../../util/Reddit";
import { Comments } from "../Comments/Comments";
import commentsIcon from "../../assets/comment-icon.svg";
import { useCallback, useState } from "react";

function Post(props) {
    const [showComments, setShowComments] = useState(false);
    const [positiveVote, setPositiveVote] = useState(false);
    const [negativeVote, setNegativeVote] = useState(false);

    const handleClick = useCallback((e) => {
        setShowComments(!showComments);
    }, [showComments]);

    const handleVote = useCallback((e) => {
        console.log(e.target);
        if (e.target.classList.contains(styles.upVote) && !positiveVote) {
            console.log(`Yes`);
            setPositiveVote(true);
            setNegativeVote(false);
        } else if (e.target.classList.contains(styles.downVote) && !negativeVote) {
            console.log("No");
            setNegativeVote(true);
            setPositiveVote(false);
        } else if (positiveVote || negativeVote) {
            setPositiveVote(false);
            setNegativeVote(false);
        }
    }, [positiveVote, negativeVote]);

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
        <>
            <section className={styles.postVotesContainer}>
                <div className={styles.votesContainer}>
                    <button
                        aria-label="Up Vote"
                        className={`${styles.votesButton} ${styles.upVote} ${
                            positiveVote ? styles.upVoteClick : ""
                        }`}
                        onClick={handleVote}
                    >
                        <svg
                            className={`${styles.voteIcon} ${styles.upVote}`}
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 511.947 511.947"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M476.847,216.373L263.513,3.04c-4.267-4.053-10.88-4.053-15.04,0L35.14,216.373c-4.16,4.16-4.16,10.88-0.107,15.04
			c2.027,2.027,4.8,3.2,7.573,3.2h128V501.28c0,5.867,4.8,10.667,10.667,10.667h149.333c5.867,0,10.667-4.8,10.667-10.667V234.613
			h128c5.867,0,10.667-4.8,10.667-10.667C479.94,221.067,478.873,218.4,476.847,216.373z M330.607,213.28
			c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128V223.947c0-5.867-4.8-10.667-10.667-10.667H68.42L255.94,25.547L443.567,213.28
			H330.607z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                    <p
                        className={`${styles.votes} ${
                            negativeVote ? styles.downVoteClick : ""
                        } ${positiveVote ? styles.upVoteClick : ""}`}
                    >
                        {Reddit.displayVotes(post.data.ups)}
                    </p>
                    <button
                        aria-label= "Down Vote"
                        className={`${styles.votesButton} ${styles.downVote} ${
                            negativeVote ? styles.downVoteClick : ""
                        }`}
                        onClick={handleVote}
                    >
                        <svg
                            className={`${styles.voteIcon} ${styles.downVote}`}
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 512.027 512.027"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M479.114,283.84c-1.707-3.947-5.547-6.507-9.813-6.507h-128V10.667C341.3,4.8,336.5,0,330.633,0H181.3
			c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128c-5.867,0-10.667,4.8-10.56,10.773c0,2.773,1.067,5.44,3.093,7.36L248.5,508.907
			c4.16,4.16,10.88,4.16,15.04,0l213.333-213.44C479.86,292.373,480.82,287.893,479.114,283.84z M255.967,486.293L68.34,298.667
			H181.3c5.867,0,10.667-4.8,10.667-10.667V21.333h128V288c0,5.867,4.8,10.667,10.667,10.667h112.96L255.967,486.293z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className={styles.postContainer}>
                    <article className={styles.postArticle}>
                        <header className={styles.postHeader}>
                            <p className={styles.subRedditSource}>
                                {props.post.data.subreddit_name_prefixed} |{" "}
                                {timeDiff}
                            </p>
                            <h3 className={styles.postTitle}>
                                {post.data.title}
                            </h3>
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
                            <p>
                                by{" "}
                                <span className={styles.postAuthor}>
                                    {post.data.author}
                                </span>
                            </p>
                            <button
                                className={styles.commentsButton}
                                onClick={handleClick}
                            >
                                <img
                                    src={commentsIcon}
                                    alt="Comments"
                                    className={styles.commentsIcon}
                                />
                                {post.data.num_comments}
                            </button>
                        </footer>
                    </article>
                    {showComments ? (
                        <Comments postPermalink={post.data.permalink} />
                    ) : null}
                </div>
            </section>
            <div className={styles.divider}></div>
        </>
    );
}

export { Post };
