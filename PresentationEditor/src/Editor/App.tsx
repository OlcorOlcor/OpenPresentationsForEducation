import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import Menu from "./Menu";
import { MarkdownParser } from "../Model/MarkdownParser";
import { HtmlVisitor, JsonVisitor, MarkdownVisitor } from "../Model/Visitors";
import * as pt from "../Model/PresentationTypes";
import { saveAs } from "file-saver";
import { Box, Button } from "@mui/material";

function App() {
    const [lanes, setLanes] = useState<Lane[]>([
        new Lane([new SlideElement([])], "first"),
        new Lane([new SlideElement([])], "second"),
    ]);
    const [metadata, setMetadata] = useState<pt.Metadata[]>([]);
    const [constraints, setConstraints] = useState<pt.Constraints>({words: 0, characters: 0, images: 0, links: 0, headings: 0, bullet_points: 0});
    const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] =
        useState<number>(0);
    const [selectedRightLaneIndex, setSelectedRightLaneIndex] =
        useState<number>(1);
    const [imported, setImported] = useState<boolean>(false);
    function addLane() {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let slides = [];
            let numberOfSlides = 1;
            if (selectedLeftLaneIndex !== -1) {
                numberOfSlides = lanes[selectedLeftLaneIndex].slides.length;
            } else if (selectedRightLaneIndex !== -1) {
                numberOfSlides = lanes[selectedRightLaneIndex].slides.length;
            }
            for (let i = 0; i < numberOfSlides; ++i) {
                slides.push(null);
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

    function deleteLane(index: number): void {
        setLanes((oldLanes) => {
            let leftLane = index === selectedLeftLaneIndex;
            let updatedLanes = oldLanes.filter((_, laneIndex) => laneIndex !== index);
            if (updatedLanes.length >= 2) {
                index = updatedLanes.length - 1;
                if ((leftLane && index === selectedRightLaneIndex) || (!leftLane && index === selectedLeftLaneIndex)) {
                    --index;
                }
            } else {
                index = -1;
            }
            if (leftLane) {
                setSelectedLeftLaneIndex(index);
                if (index === -1) {
                    setSelectedRightLaneIndex(0);
                }
            } else {
                setSelectedRightLaneIndex(index);
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
            let parser = new PresentationParser();
            let json = JSON.parse(content);
            setMetadata(json.metadata);
            setConstraints(json.constraints);
            let lanes = parser.getLanes(json.lanes);
            setLanes(lanes);
            setSelectedLeftLaneIndex(0);
            if (lanes.length > 1) {
                setSelectedRightLaneIndex(1);
            }
            setImported(true);
        };
        reader.readAsText(file);
    }

    function exportPresentationAsJSON() {
        let visitor = new JsonVisitor();
        let jsonLanes: pt.Lane[] = [];
        lanes.forEach(lane => {
            visitor.visitLaneNode(lane);
            jsonLanes.push(visitor.getResult());
        });
        let exportJson = {lanes: jsonLanes, metadata: metadata, constraints: constraints};
        const blob = new Blob([JSON.stringify(exportJson)], { type: "json" });
        saveAs(blob, "output.json");
    }

    function exportPresentationAsReveal() {
        let visitor = new HtmlVisitor(true);
        // TODO only works on the first lane for now
        if (lanes.length === 0) {
            return;
        }
        let lane = lanes[0];
        visitor.visitLaneNode(lane);
        let res = visitor.getResult();
        const blob = new Blob([res], {type: "html"});
        saveAs(blob, "output.html");
    }

    // temp fix, error is likely caused by mui grid
    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (
                e.message ===
                "ResizeObserver loop completed with undelivered notifications."
            ) {
                const resizeObserverErrDiv = document.getElementById(
                    "webpack-dev-server-client-overlay-div",
                );
                const resizeObserverErr = document.getElementById(
                    "webpack-dev-server-client-overlay",
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute("style", "display: none");
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute("style", "display: none");
                }
            }
        });
    }, []);

    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item>
                <Menu
                    addLane={addLane}
                    swapLane={swapLane}
                    importPresentation={importPresentation}
                    exportPresentationAsJson={exportPresentationAsJSON}
                    exportPresentationAsReveal={exportPresentationAsReveal}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    constraints={constraints}
                    setConstraints={setConstraints}
                />
            </Grid>
            <Grid item xs md sm>
                <Grid
                    container
                    spacing={1}
                    style={{ height: "90%" }}
                >
                    <Grid item xs={6} md={6} style={{ height: "100%" }}>
                        {selectedLeftLaneIndex !== -1 && lanes[selectedLeftLaneIndex] && (
                            <LaneContainer
                                lanes={lanes}
                                setLanes={setLanes}
                                selectedLaneIndex={selectedLeftLaneIndex}
                                setSelectedLaneIndex={setSelectedLeftLaneIndex}
                                otherLaneIndex={selectedRightLaneIndex}
                                addLane={addLane}
                                deleteLane={deleteLane}
                                imported={imported}
                                setImported={setImported}
                                constraints={constraints}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} md={6} style={{ height: "100%" }}>
                        {selectedRightLaneIndex !== -1 && lanes[selectedRightLaneIndex] && (
                            <LaneContainer
                                lanes={lanes}
                                setLanes={setLanes}
                                selectedLaneIndex={selectedRightLaneIndex}
                                setSelectedLaneIndex={setSelectedRightLaneIndex}
                                otherLaneIndex={selectedLeftLaneIndex}
                                addLane={addLane}
                                deleteLane={deleteLane}
                                imported={imported}
                                setImported={setImported}
                                constraints={constraints}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
