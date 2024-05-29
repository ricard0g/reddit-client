import Skeleton from "react-loading-skeleton";
import styles from "../../styles/Comments/CommentsSkeleton.module.css";

function CommentSkeleton({ comments }) {
    return Array(comments)
        .fill(0)
        .map((item, index) => {
            return (
                    <div className={styles.commentSkeleton} key={index}>
                        <Skeleton count={3} />
                    </div>
            );
        });
}

export { CommentSkeleton };
