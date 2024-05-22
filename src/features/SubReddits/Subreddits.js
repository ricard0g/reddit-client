import styles from '../../styles/SubReddits/Subreddits.module.css';
import { Reddit } from '../../util/Reddit';

function SubReddits() {
    return (
        <section className={styles.SubRedditsContainer}>
            {/* SearchBar Component */}
            {Reddit.getSubReddits}
        </section>
    )
}

export {SubReddits};