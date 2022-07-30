/* eslint-disable react/require-default-props */
import { useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useLocalStorage from 'react-use-localstorage';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Pagination from '../pagination/Pagination';
import styles from './posts.module.css';
import { IPosts } from '../../App';

const formatString = (string: string): string => {
  return string[0].charAt(0).toUpperCase() + string.slice(1);
};

const Posts = ({ posts, isHomePage }: { posts: IPosts[]; isHomePage?: boolean }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(18);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [filteredPosts, setFilteredPosts] = useState<IPosts[]>(posts);
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);
  const [storageItem, setStorageItem] = useLocalStorage('favorites', JSON.stringify([]));

  const pagination = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete this post?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Go Back`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Post deleted correctly', '', 'success');
        setFilteredPosts(filteredPosts.filter((el) => el.id !== id));
      }
    });
  };

  const storagedArray = useRef(JSON.parse(storageItem));

  const handleToggleFavourite = (id: number): void => {
    const isFavourited = storagedArray.current.includes(id);
    if (!isFavourited) {
      storagedArray.current.push(id);
      setStorageItem(JSON.stringify(storagedArray.current));
    } else {
      const indexFavouritedId = storagedArray.current.indexOf(id);
      storagedArray.current.splice(indexFavouritedId, 1);
      setStorageItem(JSON.stringify(storagedArray.current));
    }
  };

  return (
    <>
      <ul className={styles.postsContainer}>
        {currentPosts?.map((el) => {
          return (
            <li key={el.id}>
              <div className={styles.post}>
                <div className={styles.imageContainer}>
                  <button
                    className={styles.favButton}
                    type="button"
                    onClick={() => handleToggleFavourite(el.id)}>
                    {storagedArray.current.includes(el.id) ? (
                      <Tooltip title="Unlike Post">
                        <FavoriteIcon
                          style={{ verticalAlign: 'middle' }}
                          fontSize="large"
                          color="error"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Like Post">
                        <FavoriteBorderIcon
                          style={{ verticalAlign: 'middle' }}
                          fontSize="large"
                          color="action"
                        />
                      </Tooltip>
                    )}
                  </button>
                  {isHomePage && (
                    <button
                      className={styles.deleteButton}
                      type="button"
                      onClick={() => handleDelete(el.id)}>
                      <Tooltip title="Delete Post">
                        <DeleteOutlineIcon
                          style={{ verticalAlign: 'middle' }}
                          fontSize="large"
                          color="action"
                        />
                      </Tooltip>
                    </button>
                  )}
                  <img src={`/images/${el.id}.jpeg`} alt="post" className={styles.image} />
                </div>
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
      <Pagination postsPerPage={18} totalPosts={posts?.length ?? 0} pagination={pagination} />
    </>
  );
};

export default Posts;
