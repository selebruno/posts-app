import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import NoResults from '../../components/no-results/NoResults';
import Posts from '../../components/posts/Posts';
import { usePostsContext } from '../../context/PostsContext';

const Favorites: FunctionComponent = () => {
  const { posts } = usePostsContext();
  const favorites = posts?.filter((el) =>
    localStorage.getItem('favorites')?.includes(el.id.toString())
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      navigate('/');
    }
  }, [localStorage.getItem('email')]);

  return (
    <>
      <NavBar />
      {favorites && favorites?.length > 0 ? <Posts posts={favorites} /> : <NoResults />}
    </>
  );
};

export default Favorites;
