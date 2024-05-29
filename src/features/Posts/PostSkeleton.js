import Skeleton from "react-loading-skeleton";
import styles from "../../styles/Posts/PostSkeleton.module.css";

function PostSkeleton({ posts }) {
    return Array(posts)
        .fill(0)
        .map((item, index) => (
            <div className={styles.postSkeleton} key={index}>
                <p className={styles.skeleton}>
                    <Skeleton />
                </p>
                <h2 className={styles.skeleton}>
                    <Skeleton />
                </h2>
                <p className={styles.skeleton}>
                    <Skeleton count={12} />
                </p>
            </div>
        ));
}

export { PostSkeleton };
