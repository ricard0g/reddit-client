import styles from './App.module.css';
import logo from '../assets/reddit-client-logo.svg';
import { SubReddits } from '../features/SubReddits/Subreddits';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <a className={styles.AppLogoLink} href='https://3000-idx-reddit-client-1716205157120.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/'><img className={styles.AppLogo} src={logo} alt='RedditBolt Logo'/></a>
      </header>
      <main className={styles.AppMain}>
        <SubReddits />
      </main>
    </div>
  );
}

export default App;
