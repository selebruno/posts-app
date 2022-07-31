import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import Posts from '../../components/posts/Posts';
import { usePostsContext } from '../../context/PostsContext';

const Home: FunctionComponent = () => {
  const { posts } = usePostsContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      navigate('/');
    }
  }, [localStorage.getItem('email')]);

  return (
    <>
      <NavBar />
      {posts && <Posts isHomePage posts={posts} />}
    </>
  );
};

export default Home;
