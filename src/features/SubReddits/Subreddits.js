import styles from "../../styles/SubReddits/Subreddits.module.css";
import { useGetSubRedditsQuery } from "../api/apiSlice";
import subRedditIcon from "../../assets/SubRedditDefaulticon.svg";
import { SearchBar } from "../Search/SearchBar";

function SubReddits({ handleSubredditSelection, subRedditSelected }) {
    const {
        data: subRedditsList,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetSubRedditsQuery();

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = subRedditsList.data.children.map((subReddit) => (
            <li
                key={subReddit.data.id}
                className={`${styles.subRedditListItem} ${
                    subReddit.data.display_name === subRedditSelected
                        ? styles.isSelected
                        : ""
                }`}
                onClick={handleSubredditSelection}
                name={subReddit.data.display_name}
            >
                <img
                    className={styles.subRedditItemIcon}
                    src={
                        subReddit.data.icon_img
                            ? subReddit.data.icon_img
                            : subRedditIcon
                    }
                    alt="SubReddit icon"
                />
                <p className={styles.subRedditItemTitle}>
                    {subReddit.data.display_name_prefixed}
                </p>
            </li>
        ));
    } else if (isError) {
        console.log(`Directly this --> ${error}`);
        content = <p>{error.toString()}</p>;
    }

    return (
        <section className={styles.SubRedditsContainer}>
            <SearchBar />
            <h2 className={styles.communitiesTitle}>COMMUNITIES</h2>
            <div className={styles.separationLine}></div>
            <ul className={styles.subRedditList}>{content}</ul>
        </section>
    );
}

export { SubReddits };
