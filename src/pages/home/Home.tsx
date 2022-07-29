import { FunctionComponent } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Posts from '../../components/posts/Posts';

const Home: FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <Posts />
    </>
  );
};

export default Home;
