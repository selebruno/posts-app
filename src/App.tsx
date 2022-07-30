import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Favorites from './pages/favorites/Favorites';
import PostsContext from './context/PostsContext';

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: FunctionComponent = () => {
  const [posts, setPosts] = useState<IPosts[] | null>(null);

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.data)
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <PostsContext.Provider value={{ posts }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </PostsContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
