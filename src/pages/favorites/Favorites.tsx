import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
      {favorites && favorites?.length > 0 ? (
        <Posts posts={favorites} />
      ) : (
        <NoResults
          title="No favorites yet"
          image="/images/no-favorites.png"
          description={
            <>
              <h6>Keep track of the posts you are interested in by clicking the </h6>
              <FavoriteIcon style={{ padding: 2 }} color="error" fontSize="large" />
              <h6>icon</h6>
            </>
          }
        />
      )}
    </>
  );
};

export default Favorites;
