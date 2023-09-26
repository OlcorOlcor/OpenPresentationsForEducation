import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EditorContainer from "./EditorContainer";
import Preview from "./Preview";

function App() {
  return (
    <div className="container">
      <div className="half">
        <EditorContainer />
      </div>
      <div className="half">
        <Preview />
      </div>
    </div>
  );
}

export default App;
