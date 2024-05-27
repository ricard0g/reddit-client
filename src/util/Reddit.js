import Microlink from "@microlink/react";
import styles from "../styles/Posts/Post.module.css";

export const Reddit = {
    checkAndRenderContent: (post) => {
        const regexpUrl = /\.(jpeg|jpg|png)$/;
        const redditUrl = /https:\/\/www\.reddit\.com/;

        if (regexpUrl.test(post.data.url)) {
            return (
                <img
                    src={post.data.url}
                    alt="post"
                    className={styles.postImage}
                />
            );
        } else if (post.data.is_gallery) {
            return (
                <div className={styles.galleryContainer}>
                    <Microlink url={post.data.url} size="normal" media="logo" className={styles.galleryImage} />
                    <p className={styles.galleryExplanation}>
                        This is Gallery Content, to see more go{" "}
                        <a href={post.data.url} className={styles.galleryLink}>
                            here
                        </a>
                    </p>
                </div>
            );
        } else if (!redditUrl.test(post.data.url)) {
            return (
                <Microlink
                    url={post.data.url}
                    size="normal"
                    media={post.data.thumbnail}
                />
            );
        } else if (post.data.is_video) {
            console.log(post.data.is_video);
            return (
                <video controls>
                    <source
                        src={post.data.media.reddit_video.fallback_url}
                    ></source>
                </video>
            );
        }
    },
    displayVotes: (ups) => {
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        const displayShortNumber = (ups) => {
            if (ups < 1000) {
                return ups;
            }

            const shortNumber = ups / 1000;
            const formattedNumber = shortNumber.toFixed(1);
            return `${numberWithCommas(formattedNumber)}k`;
        }

        return displayShortNumber(ups);
    }
};
