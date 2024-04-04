import React, { useState, useRef, ChangeEvent, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { MarkdownParser } from "../Model/MarkdownParser";
import { HtmlVisitor, MarkdownVisitor } from "../Model/Visitors";
import { PresentationParser } from "../Model/PresentationParser";
import { Presentation, SlideElement } from "../Model/PresentationModel"
import ModuleSelector from "./ModuleSelector";

function App() {
  const [editorData, setEditorData] = useState<string>("");
  const [speakerNoteData, setSpeakerNoteData] = useState<string>("");
  const [slides, setSlides] = useState<SlideElement[]>([new SlideElement([])]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  useEffect(() => {
    setSpeakerNoteData(slides[selectedSlideIndex].speakerNotes);
  }, [selectedSlideIndex]);

  useEffect(() => {
    console.log("useEffect slides:");
    console.log(slides);
  }, [slides])

  useEffect(() => {
    setSlides(prevSlides => {
      let newSlides = [...prevSlides];
      let slide = newSlides[selectedSlideIndex];
      slide.speakerNotes = speakerNoteData;
      newSlides[selectedSlideIndex] = slide;
      return newSlides;
    });
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
          <ModuleSelector moduleName={"editor"} editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} fetchHtml={fetchHtml} fetchJson={fetchJson} speakerNoteData={speakerNoteData} setSpeakerNoteData={setSpeakerNoteData} />
        </Grid>
        <Grid item xs={6}>
          <ModuleSelector moduleName={"preview"} editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} fetchHtml={fetchHtml} fetchJson={fetchJson} speakerNoteData={speakerNoteData} setSpeakerNoteData={setSpeakerNoteData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
