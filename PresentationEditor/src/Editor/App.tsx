import React, { useState, useRef, ChangeEvent, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, Presentation, SlideElement } from "../Model/PresentationModel"
import ModuleSelector from "./ModuleSelector";
import LaneContainer from "./LaneContainer";

function App() {
  const [lanes, setLanes] = useState<Lane[]>([new Lane([new SlideElement([])], "first"), new Lane([new SlideElement([])], "second")]);
  const [selectedLeftLane, setSelectedLeftLane] = useState<Lane>(lanes[0]);
  const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] = useState<number>(0);
  const [selectedRightLane, setSelectedRightLane] = useState<Lane>(lanes[1]);
  const [selectedRightLaneIndex, setSelectedRightLaneIndex] = useState<number>(1);

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
  /*
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
  */
  return (
    <div className="container">
      <Grid container spacing={2} className="gridContainer">
        <Grid item xs={6}>
          <LaneContainer lanes={lanes} setLanes={setLanes} selectedLane={selectedLeftLane} setSelectedLane={setSelectedLeftLane} selectedLaneIndex={selectedLeftLaneIndex} setSelectedLaneIndex={setSelectedLeftLaneIndex} otherLaneIndex={selectedRightLaneIndex}/>
        </Grid>
        <Grid item xs={6}>
          <LaneContainer lanes={lanes} setLanes={setLanes} selectedLane={selectedRightLane} setSelectedLane={setSelectedRightLane} selectedLaneIndex={selectedRightLaneIndex} setSelectedLaneIndex={setSelectedRightLaneIndex} otherLaneIndex={selectedLeftLaneIndex}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
