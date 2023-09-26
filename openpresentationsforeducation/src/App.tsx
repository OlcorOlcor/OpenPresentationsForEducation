import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import Preview from './Preview';

function App() {
  return (
    <div className="container">
      <div className="half">
        <Editor />
      </div>
      <div className="half">
        <Preview />
      </div>
    </div>
    
  );
}

export default App;
