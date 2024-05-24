import styles from "../../styles/Comments/Comments.module.css";

function Comment({ comment }) {
    let timeDiff =
        Math.round((Date.now() - comment.data.created_utc * 1000) / 3600000) +
        " hr. ago";
    if (timeDiff < 1) {
        //in case is less than one hour
        timeDiff =
            Math.round((Date.now() - comment.data.created_utc * 1000) / 60000) +
            " min. ago";
        if (timeDiff < 1) {
            //in case is less than one minute
            timeDiff = "just now";
        }
    }

    return (
        <section>
            <div>
                <p className={styles.profileName}>{comment.data.author}</p>
                <p className={styles.timeDifference}>{timeDiff}</p>
            </div>
            <p className={styles.commentText}>{comment.data.body}</p>
        </section>
    );
}

export { Comment };
