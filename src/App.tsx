import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import EditorContainer from "./EditorContainer";
import Preview from "./Preview";
import MetadataContainer from "./MetadataContainer";
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
      <Grid container spacing={2} className="gridContainer">
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            spacing={2}
            style={{ height: "100%" }}
          >
            <Grid item xs={8}>
              <EditorContainer onDataChange={handleDataChange} />
            </Grid>
            <Grid item xs={4}>
              <MetadataContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className="half">{generatedData}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
