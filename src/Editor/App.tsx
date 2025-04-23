import { HashRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import EditorApp from './EditorApp';
import { ThemeModeProvider } from './ThemeContext';

function App() {
    
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ThemeModeProvider><EditorApp /></ThemeModeProvider>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;