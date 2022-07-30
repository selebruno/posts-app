import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './noResults.module.css';

const NoResults = () => {
  return (
    <div className={styles.container}>
      <img src="/images/no-results.png" alt="favorites" />
      <h2>No favorites yet</h2>
      <div className={styles.description}>
        <h6>Keep track of the posts you are interested in by clicking the </h6>
        <FavoriteIcon style={{ padding: 2 }} color="error" fontSize="large" />
        <h6>icon</h6>
      </div>
    </div>
  );
};

export default NoResults;
