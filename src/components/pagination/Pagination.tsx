import styles from './pagination.module.css';

const Pagination = ({
  postsPerPage,
  totalPosts,
  pagination
}: {
  postsPerPage: number;
  totalPosts: number;
  pagination: (_num: number) => void;
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.container}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={styles.paged} key={number}>
              <div
                tabIndex={0}
                role="button"
                className={styles.numbers}
                onKeyDown={() => pagination(number)}
                onClick={() => pagination(number)}>
                {number}
              </div>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
