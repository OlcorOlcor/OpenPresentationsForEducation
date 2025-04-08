import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import EditorApp from './EditorApp';

function App() {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<EditorApp />} />
      </Routes>
    </Router>
  );
}

export default App;