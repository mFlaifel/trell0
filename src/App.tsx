import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { NavBar } from './components/NavBar';
import BoardPage from './pages/BoardPage';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board/:boardIndex' element={<BoardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
