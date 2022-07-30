import { FunctionComponent } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Posts from '../../components/posts/Posts';
import { usePostsContext } from '../../context/PostsContext';

const Home: FunctionComponent = () => {
  const { posts } = usePostsContext();

  return (
    <>
      <NavBar />
      {posts && <Posts isHomePage posts={posts} />}
    </>
  );
};

export default Home;
