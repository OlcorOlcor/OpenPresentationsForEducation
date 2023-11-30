import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import EditorContainer, { EditorMethods } from "./EditorContainer";
import Preview from "./Preview";
import { tokenizeText, OpenTagToken, CloseTagToken } from "./AreaTokenizer";
import MetadataContainer, {
  MetadataContainerMethods,
} from "./MetadataContainer";
import { CustomArea, CustomAreaProcessor } from "./CustomAreaProcessor";

function App() {
  const editorContainerRef = useRef<EditorMethods>(null);
  const metadataComponentRef = useRef<MetadataContainerMethods>(null);
  const [generatedData, setGeneratedData] = useState(
    "Here your presentation will be displayed",
  );
  function compile() {
    if (editorContainerRef.current === null) {
      return;
    }
    let text = editorContainerRef.current.getData();
    let tokenArray = tokenizeText(text);

    //TODO: save to file
    console.log(tokenArray);
  }

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
            <Grid item xs={1}>
              <button onClick={compile}>Compile</button>
            </Grid>
            <Grid item xs={8}>
              <EditorContainer ref={editorContainerRef} />
            </Grid>
            <Grid item xs={3}>
              <MetadataContainer ref={metadataComponentRef} />
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
