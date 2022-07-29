import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import styles from './posts.module.css';

interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const formatString = (string: string): string => {
  return string[0].charAt(0).toUpperCase() + string.slice(1);
};

const Posts: FunctionComponent = () => {
  const [posts, setPosts] = useState<IPosts[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.data)
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <ul className={styles.postsContainer}>
        {currentPosts?.map((el) => {
          return (
            <li key={el.id}>
              <div className={styles.post}>
                <img src={`/images/${el.id}.jpeg`} alt="gatito" className={styles.image} />
                <div className={styles.overlay}>
                  <div className={styles.header}>
                    <img
                      className={styles.avatar}
                      src={`/users/user${el.userId}.jpeg`}
                      alt="avatar"
                    />
                    <h3 className={styles.title}>{formatString(el.title)}.</h3>
                  </div>
                  <h6 className={styles.description}>{formatString(el.body)}.</h6>
                  <div className={styles.userContainer}>
                    <p>
                      <i>{`User ${el.userId}`}</i>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination postsPerPage={9} totalPosts={posts?.length ?? 0} pagination={pagination} />
    </>
  );
};

export default Posts;
