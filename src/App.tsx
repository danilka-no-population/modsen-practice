import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main} from '../src/Pages/Main/Main';
import LoginPage from '../src/Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;