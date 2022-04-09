import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import './App.css';
import { BoardPage } from './pages/BoardPage';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board/:boardName' element={<BoardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
