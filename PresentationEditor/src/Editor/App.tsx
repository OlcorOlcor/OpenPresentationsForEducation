import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import Menu from "./Menu";
import { HtmlVisitor, JsonVisitor } from "../Model/Visitors";
import * as pt from "../Model/PresentationTypes";
import { saveAs } from "file-saver";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmptyLane from "../EmptyLane";
import modelSchema from "../Model/model-schema.json";
import Ajv from "ajv";

function App() {
    const [lanes, setLanes] = useState<Lane[]>([
        new Lane([new SlideElement([])], "first"),
        new Lane([new SlideElement([])], "second"),
    ]);
    const [metadata, setMetadata] = useState<pt.Metadata[]>([]);
    const [constraints, setConstraints] = useState<pt.Constraints>({words: null, characters: null, images: null, links: null, headings: null, bullet_points: null});
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
                numberOfSlides = lanes[selectedLeftLaneIndex].getContent().length;
            } else if (selectedRightLaneIndex !== -1) {
                numberOfSlides = lanes[selectedRightLaneIndex].getContent().length;
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

    function selectLeftLane(index: number) {
        if (index === selectedRightLaneIndex) {
            return;
        }
        setSelectedLeftLaneIndex(index);
    }

    function selectRightLane(index: number) {
        if (index === selectedLeftLaneIndex) {
            return;
        }
        setSelectedRightLaneIndex(index);
    }

    function importPresentation(file: File) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let content = e.target?.result as string;
            let parser = new PresentationParser();
            let json: pt.Presentation = JSON.parse(content);

            const ajv = new Ajv();
            const validate = ajv.compile(modelSchema);
            if (!validate(json)) {
                console.log(validate.errors);
                return;
            }
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


    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item>
                <Menu
                    importPresentation={importPresentation}
                    exportPresentationAsJson={exportPresentationAsJSON}
                    exportPresentationAsReveal={exportPresentationAsReveal}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    constraints={constraints}
                    setConstraints={setConstraints}
                />
            </Grid>
            <Grid item container xs md sm spacing={1} style={{ height: "calc(100% - 64px)" }}>
                <Grid item xs={6} md={6} style={{ height: "100%" }}>
                    {selectedLeftLaneIndex !== -1 && lanes[selectedLeftLaneIndex] ? (
                        <LaneContainer
                            lanes={lanes}
                            setLanes={setLanes}
                            selectedLaneIndex={selectedLeftLaneIndex}
                            selectLane={selectLeftLane}
                            otherLaneIndex={selectedRightLaneIndex}
                            addLane={addLane}
                            deleteLane={deleteLane}
                            imported={imported}
                            setImported={setImported}
                            constraints={constraints}
                        />
                    ) : ( <EmptyLane addLane={addLane}/> ) }
                </Grid>
                <Grid item xs={6} md={6} style={{ height: "100%" }}>
                    {(selectedRightLaneIndex !== -1 && lanes[selectedRightLaneIndex]) ? (
                        <LaneContainer
                            lanes={lanes}
                            setLanes={setLanes}
                            selectedLaneIndex={selectedRightLaneIndex}
                            selectLane={selectRightLane}
                            otherLaneIndex={selectedLeftLaneIndex}
                            addLane={addLane}
                            deleteLane={deleteLane}
                            imported={imported}
                            setImported={setImported}
                            constraints={constraints}
                        />
                    ) : ( <EmptyLane addLane={addLane}/> ) }
                </Grid>
                <Grid container justifyContent="center" alignItems="center" style={{ position: 'absolute', top: 0, bottom: 0,  pointerEvents: 'none' }}>
                    <Fab color="primary" aria-label="add" onClick={swapLane} style={{pointerEvents: 'auto'}}>
                        <ArrowBackIcon />
                        <ArrowForwardIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
