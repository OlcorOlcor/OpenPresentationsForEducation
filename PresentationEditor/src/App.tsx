import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import Preview from "./Preview";
import MetadataContainer, { MetadataContainerMethods } from "./MetadataContainer";
import { MarkdownParser } from "./markdownParser";
import { HtmlVisitor, MarkdownVisitor } from "./Visitors";
import { PresentationParser } from "./presentationParser";
import { Presentation, SlideElement } from "./presentationModel"
import SlideSelect from "./SlideSelect";
import EditorModule from "./EditorModule";


function App() {
  const [editorData, setEditorData] = useState<string>("");
  const modules = [
    {name: "Editor module", module: <EditorModule editorData={editorData} setEditorData={setEditorData}/>},
    {name: "Preview module", module: <Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />},
  ];
  const [firstModule, setFirstModule] = useState<any>(modules[0].module);
  const [secondModule, setSecondModule] = useState<any>(modules[1].module);

  const handleFirstModuleSelect = (event: any) => {
    setFirstModule(modules[event.target.value].module);
  }

  const handleSecondModuleSelect = (event: any) => {
    setSecondModule(modules[event.target.value].module);
  }

  function fetchHtml(): string {
    let mp = new MarkdownParser();
    let slides = mp.parseMarkdown(editorData);
    let pp = new PresentationParser(slides);
    let presentation = pp.GetPresentation();
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation as Presentation);
    return visitor.getResult();
  }

  function fetchJson(): string {
    let mp = new MarkdownParser();
    let slide = mp.parseMarkdown(editorData);
    return JSON.stringify(slide);
  }

  return (
    <div className="container">
      <Grid container spacing={2} className="gridContainer">
        <Grid item xs={6}>
          <select onChange={handleFirstModuleSelect}>
            <option value="">Select Module</option>
            {modules.map((option, index) => (
              <option key={index} value={index}>
                {option.name}
              </option>
            ))}
          </select>
          {firstModule && firstModule}
        </Grid>
        <Grid item xs={6}>
          <select onChange={handleSecondModuleSelect}>
            <option value="">Select Module</option>
            {modules.map((option, index) => (
              <option key={index} value={index}>
                {option.name}
              </option>
            ))}
          </select>
          {secondModule && secondModule}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
