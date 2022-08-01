import styles from './noResults.module.css';

const NoResults = ({
  title,
  image,
  description
}: {
  title: string;
  image: string;
  description: JSX.Element;
}) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="favorites" />
      <h2>{title}</h2>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default NoResults;
