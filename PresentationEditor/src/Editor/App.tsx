import React, { useState, useRef, ChangeEvent, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, SlideElement } from "../Model/PresentationModel"
import LaneContainer from "./LaneContainer";
import { Button } from "@mui/material";
import Menu from "./Menu";
import AddIcon from "@mui/icons-material/Add";


function App() {
  const [lanes, setLanes] = useState<Lane[]>([new Lane([new SlideElement([])], "first"), new Lane([new SlideElement([])], "second")]);
  const [selectedLeftLane, setSelectedLeftLane] = useState<Lane>(lanes[0]);
  const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] = useState<number>(0);
  const [selectedRightLane, setSelectedRightLane] = useState<Lane>(lanes[1]);
  const [selectedRightLaneIndex, setSelectedRightLaneIndex] = useState<number>(1);

  function addLane() {
    setLanes((oldLanes) => {
        let updatedLanes = [...oldLanes];
        updatedLanes.push(new Lane([new SlideElement([])], oldLanes.length.toString()));
        if (selectedLeftLaneIndex === -1) {
          setSelectedLeftLaneIndex(updatedLanes.length - 1);
        } else if (selectedRightLaneIndex === -1) {
          setSelectedRightLaneIndex(updatedLanes.length - 1);
        }
        return updatedLanes;
    });
  }

  
  function swapLane() {
    const leftIndex = selectedLeftLaneIndex;
    const rightIndex = selectedRightLaneIndex;
    setSelectedLeftLaneIndex(rightIndex);
    setSelectedRightLaneIndex(leftIndex);

  }

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

  return (
    <div style={{height: "100%"}}>
      <Menu addLane={addLane} swapLane={swapLane} />
      <Grid container spacing={1} className="gridContainer" style={{height: "100%"}}>
        <Grid item xs={6} md={6}>
          {selectedLeftLaneIndex !== -1 && <LaneContainer lanes={lanes} setLanes={setLanes} selectedLane={selectedLeftLane} setSelectedLane={setSelectedLeftLane} selectedLaneIndex={selectedLeftLaneIndex} setSelectedLaneIndex={setSelectedLeftLaneIndex} otherLaneIndex={selectedRightLaneIndex} AddLane={addLane}/>}          
        </Grid>
        <Grid item xs={6} md={6}>
          {selectedRightLaneIndex !== -1 && <LaneContainer lanes={lanes} setLanes={setLanes} selectedLane={selectedRightLane} setSelectedLane={setSelectedRightLane} selectedLaneIndex={selectedRightLaneIndex} setSelectedLaneIndex={setSelectedRightLaneIndex} otherLaneIndex={selectedLeftLaneIndex} AddLane={addLane}/>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
