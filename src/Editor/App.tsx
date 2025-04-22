import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import EditorApp from './EditorApp';
import { ThemeModeProvider } from './ThemeContext';

function App() {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ThemeModeProvider><EditorApp /></ThemeModeProvider>}/>
      </Routes>
    </Router>
  );
}

export default App;