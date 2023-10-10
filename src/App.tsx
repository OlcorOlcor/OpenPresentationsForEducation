import React, { useState } from "react";
import "./App.css";
import EditorContainer from "./EditorContainer";
import Preview from "./Preview";
import { text } from "stream/consumers";

function App() {
  const [generatedData, setGeneratedData] = useState(
    "Here your presentation will be displayed",
  );

  const handleDataChange = (newData: string) => {
    setGeneratedData(newData);
  };

  return (
    <div className="container">
      <div className="half">
        <EditorContainer onDataChange={handleDataChange} />
      </div>
      <div className="half">{generatedData}</div>
    </div>
  );
}

export default App;
