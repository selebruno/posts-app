/* eslint-disable react/require-default-props */
import { useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useLocalStorage from 'react-use-localstorage';
import { TextField, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Pagination from '../pagination/Pagination';
import styles from './posts.module.css';
import { IPosts } from '../../App';

interface IFormValues {
  title: string | null;
  body: string | null;
  postId: number;
}

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
  const [formState, setFormState] = useState({
    isEditingTitle: false,
    isEditingBody: false,
    postId: 0
  });
  const [inputValue, setInputValue] = useState({
    title: '',
    body: ''
  });
  const [formValues, setFormValues] = useState<IFormValues[]>([
    {
      title: null,
      body: null,
      postId: 0
    }
  ]);

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

  const handleEditTitle = (post: IPosts): void => {
    const currentFormValues = formValues.find((elem) => elem.postId === post.id);
    if (currentFormValues) {
      currentFormValues.title = inputValue.title.length > 0 ? inputValue.title : post.title;
      currentFormValues.body = currentFormValues.body ?? post.body;
      setFormState({
        isEditingTitle: false,
        isEditingBody: false,
        postId: 0
      });
      setInputValue({
        title: '',
        body: ''
      });
    } else {
      setFormValues(
        formValues.concat({
          title: inputValue.title.length > 0 ? inputValue.title : post.title,
          body: post.body,
          postId: post.id
        })
      );
      setFormState({
        isEditingTitle: false,
        isEditingBody: false,
        postId: 0
      });
      setInputValue({
        title: '',
        body: ''
      });
    }
  };

  const handleEditBody = (post: IPosts): void => {
    const currentFormValues = formValues.find((elem) => elem.postId === post.id);
    if (currentFormValues) {
      currentFormValues.title = currentFormValues.title ?? post.title;
      currentFormValues.body = inputValue.body.length > 0 ? inputValue.body : post.body;
      setFormState({
        isEditingTitle: false,
        isEditingBody: false,
        postId: 0
      });
      setInputValue({
        title: '',
        body: ''
      });
    } else {
      setFormValues(
        formValues.concat({
          title: post.title,
          body: inputValue.body.length > 0 ? inputValue.body : post.body,
          postId: post.id
        })
      );
      setFormState({
        isEditingTitle: false,
        isEditingBody: false,
        postId: 0
      });
      setInputValue({
        title: '',
        body: ''
      });
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
                    {formState.postId === el.id && formState.isEditingTitle ? (
                      <div className={styles.editContainer}>
                        <TextField
                          fullWidth
                          onChange={(e) =>
                            setInputValue({
                              title: e.target.value,
                              body: ''
                            })
                          }
                          defaultValue={
                            formValues.find((post) => post.postId === el.id)?.title ?? el.title
                          }
                          label="Edit Title"
                          inputProps={{ maxLength: 60 }}
                        />
                        <CheckIcon
                          className={styles.checkIcon}
                          type="button"
                          onClick={() => handleEditTitle(el)}
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className={styles.title}>
                          {formValues.find((post) => post.postId === el.id)?.title ??
                            formatString(el.title)}
                        </h3>
                        <Tooltip title="Edit Title">
                          <EditIcon
                            className={styles.editIcon}
                            fontSize="small"
                            onClick={() =>
                              setFormState({
                                isEditingTitle: true,
                                isEditingBody: false,
                                postId: el.id
                              })
                            }
                          />
                        </Tooltip>
                      </>
                    )}
                  </div>
                  {formState.postId === el.id && formState.isEditingBody ? (
                    <div className={styles.descriptionContainerEdit}>
                      <TextField
                        fullWidth
                        onChange={(e) =>
                          setInputValue({
                            title: '',
                            body: e.target.value
                          })
                        }
                        inputProps={{ maxLength: 160 }}
                        defaultValue={
                          formValues.find((post) => post.postId === el.id)?.body ?? el.body
                        }
                        label="Edit body"
                      />
                      <CheckIcon
                        style={{ marginTop: '1rem' }}
                        className={styles.checkIcon}
                        type="button"
                        onClick={() => handleEditBody(el)}
                      />
                    </div>
                  ) : (
                    <div className={styles.descriptionContainer}>
                      <h6 className={styles.description}>
                        {formValues.find((post) => post.postId === el.id)?.body ??
                          formatString(el.body)}
                        .
                      </h6>
                      <Tooltip title="Edit Body">
                        <EditIcon
                          className={styles.editIcon}
                          fontSize="small"
                          onClick={() =>
                            setFormState({
                              isEditingTitle: false,
                              isEditingBody: true,
                              postId: el.id
                            })
                          }
                        />
                      </Tooltip>
                    </div>
                  )}
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
