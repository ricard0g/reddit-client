import Skeleton from "react-loading-skeleton";
import styles from "../../styles/Posts/PostSkeleton.module.css";

function PostSkeleton({ posts }) {
    return Array(posts)
        .fill(0)
        .map((item, index) => (
            <>
                <div className={styles.postSkeleton} key={index}>
                    <Skeleton  className={styles.skeleton}/>
                    <Skeleton className={styles.skeleton} />
                    <Skeleton count={4}  className={styles.skeleton}/>
                </div>
            </>
        ));
}

export { PostSkeleton };
