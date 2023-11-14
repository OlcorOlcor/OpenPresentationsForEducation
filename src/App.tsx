import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import EditorContainer from "./EditorContainer";
import Preview from "./Preview";
import MetadataContainer, { MetadataContainerMethods } from "./MetadataContainer";
import { CustomArea, CustomAreaProcessor } from "./CustomAreaProcessor";

function App() {
  const areaProcessor: CustomAreaProcessor = new CustomAreaProcessor();
  const metadataComponentRef = useRef<MetadataContainerMethods>(null);
  const [generatedData, setGeneratedData] = useState(
    "Here your presentation will be displayed",
  );

  const handleDataChange = (newData: string) => {
    if (metadataComponentRef.current !== undefined && metadataComponentRef.current !== null) {
      metadataComponentRef.current.updateAreas(areaProcessor.getAreas());
    }
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
              <EditorContainer
                onDataChange={handleDataChange}
                areaProcessor={areaProcessor}
              />
            </Grid>
            <Grid item xs={4}>
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
