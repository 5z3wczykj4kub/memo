import { Route, Routes } from 'react-router-dom';
import './App.module.scss';
import Home from './views/Home/Home';
import Main from './views/Main/Main';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/game' element={<Main />} />
  </Routes>
);

export default App;
