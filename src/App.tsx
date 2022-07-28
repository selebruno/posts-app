import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FunctionComponent } from 'react';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
