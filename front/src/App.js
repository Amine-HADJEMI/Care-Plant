import './App.css';
import Home from './pages/Home';
import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home></Home>}/>
    </Routes>
    </>
  );
}

export default App;
