import logo from './logo.svg';
import './App.css';
import ModelPages from './Pages/Model-Pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<ModelPages />} />
        <Route path="/models" element={<MainPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
