import styles from "./App.module.css";
import logo from "../assets/reddit-client-logo.svg";
import { SubReddits } from "../features/SubReddits/Subreddits";
import { Posts } from "../features/Posts/Posts";
import { useState } from "react";

function App() {
    const [subRedditSelected, setSubredditSelected] = useState();

    const handleSubredditSelection = (e) => {
        setSubredditSelected(e.target.getAttribute("name"));
    };

    return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <a
                        className={styles.AppLogoLink}
                        href="https://3000-idx-reddit-client-1716205157120.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/"
                    >
                        <img
                            className={styles.AppLogo}
                            src={logo}
                            alt="RedditBolt Logo"
                        />
                    </a>
                </header>
                <main className={styles.AppMain}>
                    <SubReddits
                        handleSubredditSelection={handleSubredditSelection}
                        subRedditSelected={subRedditSelected}
                    />
                    <Posts subRedditSelected={subRedditSelected} />
                </main>
            </div>
    );
}

export default App;
