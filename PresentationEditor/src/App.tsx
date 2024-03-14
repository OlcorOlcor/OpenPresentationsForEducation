import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import EditorContainer, { EditorMethods } from "./EditorContainer";
import Preview from "./Preview";
import { tokenizeText, OpenTagToken, CloseTagToken } from "./AreaTokenizer";
import MetadataContainer, { MetadataContainerMethods } from "./MetadataContainer";
import { MarkdownParser } from "./markdownParser";
import { HtmlVisitor } from "./Visitors";
import { PresentationParser } from "./presentationParser";
import { Presentation } from "./presentationModel"
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


  function fetchHtml(): string {
    let mp = new MarkdownParser();
    if (editorContainerRef.current === null) {
      return "";
    }
    let slides = mp.parseMarkdown(editorContainerRef.current.getData());
    let pp = new PresentationParser(slides);
    let presentation = pp.GetPresentation();
    let visitor = new HtmlVisitor();
    console.log(presentation);
    visitor.visitPresentationNode(presentation as Presentation);
    return visitor.getResult();
  }

  function fetchJson(): string {
    let mp = new MarkdownParser();
    if (editorContainerRef.current === null) {
      return "";
    }
    let slide = mp.parseMarkdown(editorContainerRef.current.getData());
    return JSON.stringify(slide);
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
          <Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
