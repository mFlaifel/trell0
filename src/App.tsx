import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { NavBar } from './components/NavBar';
import BoardPage from './pages/BoardPage';
import Home from './pages/Home';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/board/:boardIndex' element={<BoardPage />}></Route>
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
