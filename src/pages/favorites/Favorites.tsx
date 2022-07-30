import { FunctionComponent } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Posts from '../../components/posts/Posts';
import { usePostsContext } from '../../context/PostsContext';

const Favorites: FunctionComponent = () => {
  const { posts } = usePostsContext();
  const favorites = posts?.filter((el) =>
    localStorage.getItem('favorites')?.includes(el.id.toString())
  );

  return (
    <>
      <NavBar />
      {favorites && <Posts posts={favorites} />}
    </>
  );
};

export default Favorites;
