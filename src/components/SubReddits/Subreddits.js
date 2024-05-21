import styles from '../../styles/SubReddits/Subreddits.module.css';

const mockSubReddits = [
    {
        name: "pics",
    },
    {
        name: "PopularStuff",
    },
    {
        name: "funny",
    },
    {
        name: "programming",
    },
    {
        name: "gaming",
    }
]

function SubReddits() {
    return (
        <section className={styles.SubRedditsContainer}>
            {/* SearchBar Component */}
            {mockSubReddits.map((subReddit) => {
                return (
                    <div className={styles.SubRedditsItem} key={subReddit.name}>{subReddit.name}</div>
                )
            })}
        </section>
    )
}

export {SubReddits};