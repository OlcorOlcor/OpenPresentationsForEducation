import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, Presentation, SlideElement } from "../Model/PresentationModel"
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import Menu from "./Menu";
import { MarkdownParser } from "../Model/MarkdownParser";
import { MarkdownVisitor } from "../Model/Visitors";
import * as pt from "../Model/PresentationTypes";
import { saveAs } from "file-saver";

function App() {
	const [lanes, setLanes] = useState<Lane[]>([new Lane([new SlideElement([])], "first"), new Lane([new SlideElement([])], "second")]);
	const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] = useState<number>(0);
	const [selectedRightLaneIndex, setSelectedRightLaneIndex] = useState<number>(1);

	function addLane() {
		setLanes((oldLanes) => {
			let updatedLanes = [...oldLanes];
			let slides = [];
			for (let i = 0; i < lanes[selectedLeftLaneIndex].slides.length; ++i) {
				slides.push(new SlideElement([]));
			}
			updatedLanes.push(new Lane(slides, oldLanes.length.toString()));
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

	function importPresentation(file: File) {
		
		let reader = new FileReader();
		reader.onload = (e) => {
			let content = e.target?.result as string;
			let parser = new PresentationParser([]);
			let lanes = parser.GetLanes(JSON.parse(content));
			setLanes(lanes);
			setSelectedLeftLaneIndex(0);
			if (lanes.length > 1) {
				setSelectedRightLaneIndex(1);
			}
		}
		reader.readAsText(file);
	}

	function exportPresentation() {
		let parser = new MarkdownParser();
		let jsonLanes: pt.Lane[] = [];
		console.log(lanes);
		console.log(lanes[selectedLeftLaneIndex].slides);
		lanes.forEach((lane, i) => {
			// TODO: awfully complicated, redo
			let currentLane: Lane;
			if (i === selectedLeftLaneIndex) {
				currentLane = lanes[selectedLeftLaneIndex];
			} else if (i === selectedRightLaneIndex) {
				currentLane = lanes[selectedRightLaneIndex];
			} else {
				currentLane = lane;
			}
			let visitor = new MarkdownVisitor();
			let jsonSlides: pt.Slide[] = [];
			lane.slides.forEach((slide, i) => {
				visitor.visitSlideNode(slide);
				jsonSlides.push({type: "slide", content: parser.parseMarkdown(visitor.getResult()), attributes: {active: slide.active}});
			});
			jsonLanes.push({ type: "lane", content: jsonSlides, attributes: {name: lane.name, compile: lane.outputAsPresentation}});
			visitor.visitPresentationNode(new Presentation(lane.slides));
		});
		const blob = new Blob([JSON.stringify(jsonLanes)], {type: "json"});
		saveAs(blob, "output.json");
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
			<Menu addLane={addLane} swapLane={swapLane} importPresentation={importPresentation} exportPresentation={exportPresentation}/>
			<Grid container spacing={1} className="gridContainer" style={{height: "100%"}}>
				<Grid item xs={6} md={6}>
					{selectedLeftLaneIndex !== -1 && <LaneContainer lanes={lanes} setLanes={setLanes} selectedLaneIndex={selectedLeftLaneIndex} setSelectedLaneIndex={setSelectedLeftLaneIndex} otherLaneIndex={selectedRightLaneIndex} addLane={addLane} />}          
				</Grid>
				<Grid item xs={6} md={6}>
					{selectedRightLaneIndex !== -1 && <LaneContainer lanes={lanes} setLanes={setLanes} selectedLaneIndex={selectedRightLaneIndex} setSelectedLaneIndex={setSelectedRightLaneIndex} otherLaneIndex={selectedLeftLaneIndex} addLane={addLane} />}
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
