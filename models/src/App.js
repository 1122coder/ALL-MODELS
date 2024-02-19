import logo from './logo.svg';
import './App.css';
import ModelPages from './Pages/Model-Pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import GeminiPage from './Pages/GeminiPage';
import PalmPage from './Pages/PalmPage';
import GPT2Page from './Pages/GPT2Page';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<ModelPages />} />
        <Route path="/models" element={<MainPage />} />
        <Route path="/gemini" element={<GeminiPage />} />
        <Route path="/palm" element={<PalmPage />} />
        <Route path="/gpt2" element={<GPT2Page />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
