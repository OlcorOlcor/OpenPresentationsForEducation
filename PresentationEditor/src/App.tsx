import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import Preview from "./Preview";
import { MarkdownParser } from "./markdownParser";
import { HtmlVisitor, MarkdownVisitor } from "./Visitors";
import { PresentationParser } from "./presentationParser";
import { Presentation, SlideElement } from "./presentationModel"
import EditorModule from "./EditorModule";
import SpeakerNoteEditorContainer from "./SpeakerNoteEditorContainer";

function App() {
  const [editorData, setEditorData] = useState<string>("");
  const [speakerNoteData, setSpeakerNoteData] = useState<string>("");
  const [slides, setSlides] = useState<SlideElement[]>([new SlideElement([])]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const modules = [
    {name: "Editor module", module: <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} />},
    {name: "Preview module", module: <Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />},
    {name: "Speaker Notes module", module: <SpeakerNoteEditorContainer data={speakerNoteData} setSpeakerNoteData={setSpeakerNoteData}/>},
  ];
  const [firstModule, setFirstModule] = useState<any>(modules[0].module);
  const [secondModule, setSecondModule] = useState<any>(modules[1].module);

  useEffect(() => {
    setSpeakerNoteData(slides[selectedSlideIndex].speakerNotes);
  }, [selectedSlideIndex]);

  useEffect(() => {
    // TODO: create new array
    slides[selectedSlideIndex].speakerNotes = speakerNoteData;
  }, [speakerNoteData]);
  
  // temp fix, error is likely caused by mui grid
  useEffect(() => {
    window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
          const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
          );
          const resizeObserverErr = document.getElementById(
              'webpack-dev-server-client-overlay'
          );
          if (resizeObserverErr) {
              resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
              resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
      }
    });
  }, []);

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
