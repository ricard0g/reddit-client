import styles from "../../styles/Comments/Comments.module.css";
import { useGetPostCommentsQuery } from "../api/apiSlice";
import { Comment } from "./Comment";
import { CommentSkeleton } from "./CommentSkeleton";

function Comments({ postPermalink }) {
    const {
        data: comments,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostCommentsQuery(postPermalink);

    let content;

    if (isLoading) {
        return (
            <>
                <div className={styles.divider}></div>
                <CommentSkeleton comments={12} />
            </>
        );
    } else if (isSuccess) {
        content = comments[1].data.children.map((comment) => {
            return <Comment comment={comment} />;
        });
        console.log(content);
    } else if (isError) {
        console.log(`Directly this --> ${error}`);
        content = <p>{error.toString()}</p>;
    }

    return (
        <section className={styles.comments}>
            <div className={styles.divider}></div>
            <h2 className={styles.titleCommentsSection}>Comments</h2>
            {content}
        </section>
    );
}

export { Comments };
