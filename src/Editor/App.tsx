import { SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import AppMenu from "./Menu";
import { HtmlVisitor, JsonVisitor, MarkdownVisitor } from "../Model/Visitors";
import * as pt from "../Model/PresentationTypes";
import { saveAs } from "file-saver";
import EmptyLane from "./EmptyLane";
import modelSchema from "../Model/model-schema.json";
import Ajv from "ajv";
import { ViewMode } from "./ViewMode";

function App() {
    const [lanes, setLanes] = useState<Lane[]>([
        new Lane([new SlideElement([])], "first"),
        new Lane([new SlideElement([])], "second"),
    ]);
    const [rawCode, setRawCode] = useState<string[][]>([[""],[""]]);
    const [metadata, setMetadata] = useState<pt.Metadata[]>([]);
    const [images, setImages] = useState<pt.ImageFile[]>([]);
    const [constraints, setConstraints] = useState<pt.Constraints>({words: null, characters: null, images: null, links: null, headings: null, bullet_points: null, tables: null});
    const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] =
        useState<number>(0);
    const [selectedRightLaneIndex, setSelectedRightLaneIndex] =
        useState<number>(1);
    const [imported, setImported] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPLIT);
    const [leftEditorData, setLeftEditorData] = useState<string>("");
    const [rightEditorData, setRightEditorData] = useState<string>("");
    const [selectedLeftSlideIndex, setSelectedLeftSlideIndex] = useState<number>(0);
    const [selectedRightSlideIndex, setSelectedRightSlideIndex] = useState<number>(0);

    useEffect(() => {
        if (imported) {
            setLeftEditorData(rawCode[0][0]);
            if (rawCode.length > 1) {
                setRightEditorData(rawCode[1][0]);
            }
            setImported(false);
        }
    }, [imported]);

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
        setRawCode((oldCode) => {
            let updatedCode = [...oldCode];
            updatedCode.push([""]);
            return updatedCode;
        })
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
        setRawCode((oldCode) => {
            return oldCode.filter((_, codeIndex) => codeIndex !== index);
        });
    }

    function synchronizeEditors(editorContent: string, left: boolean) {
        if (viewMode !== ViewMode.SPLIT 
            || selectedLeftSlideIndex !== selectedRightSlideIndex 
            || selectedLeftLaneIndex !== selectedRightLaneIndex) {
            return;
        }
        if (left) {
            setRightEditorData(editorContent);
        } else {
            setLeftEditorData(editorContent);
        }
    }

    function swapLane() {
        const leftIndex = selectedLeftLaneIndex;
        const rightIndex = selectedRightLaneIndex;
        setSelectedLeftLaneIndex(rightIndex);
        setSelectedRightLaneIndex(leftIndex);
    }

    function selectLeftLane(index: number) {
        setSelectedLeftLaneIndex(index);
    }

    function selectRightLane(index: number) {
        setSelectedRightLaneIndex(index);
    }

    function formatImportErrors(errors: any[]): string {
        return errors.map(error => {
            const { instancePath, message, params } = error;
            
            let returnMessage: string = "";

            returnMessage +=  `Error at ${instancePath || 'root'}: ${message}`;
            if (params.allowedValues && params.allowedValues.length > 0) {
                returnMessage += ": ";
                params.allowedValues.forEach((val: string) => {
                    returnMessage += val + ", ";
                });
            }
            return returnMessage;
        }).join('\n');
    }

    function setRawCodeAfterImport(lanes: Lane[]) {
        let importRaw : string[][] = [];
        let markdownVisitor = new MarkdownVisitor();
        let index = 0;
        lanes.forEach(lane => {
            importRaw.push([]);
            lane.getContent().forEach(slide => {
                if (slide === null) {
                    importRaw[index].push("");
                    return;
                }
                markdownVisitor.visitSlideNode(slide);
                importRaw[index].push(markdownVisitor.getResult());
                markdownVisitor.clearResult();
            });
            ++index;
        });
        setRawCode(importRaw);
        setImported(true);
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
                alert(formatImportErrors(validate.errors as any[]));
                return;
            }
            setMetadata(json.metadata);
            setConstraints(json.constraints);
            setImages(json.imageFiles);
            let lanes = parser.getLanes(json.lanes);
            setLanes(lanes);
            setSelectedLeftLaneIndex(0);
            if (lanes.length > 1) {
                setSelectedRightLaneIndex(1);
            }
            setImported(true);
            setRawCodeAfterImport(lanes);
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
        let exportJson = {lanes: jsonLanes, metadata: metadata, constraints: constraints, imageFiles: images};
        const blob = new Blob([JSON.stringify(exportJson)], { type: "json" });
        saveAs(blob, "output.json");
    }

    function exportPresentationAsReveal() {
        let visitor = new HtmlVisitor(true, [], metadata);
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

    function newProject() {
        setLanes([new Lane([new SlideElement([])], "first"), new Lane([new SlideElement([])], "second")]);
        setSelectedLeftLaneIndex(0);
        setSelectedRightLaneIndex(1);
        setConstraints({words: null, characters: null, images: null, links: null, headings: null, bullet_points: null, tables: null});
        setMetadata([]);
    }

    return (
        <Grid container direction="column" style={{height: "100vh"}} spacing={2}>
            <Grid item>
                <AppMenu
                    importPresentation={importPresentation}
                    exportPresentationAsJson={exportPresentationAsJSON}
                    exportPresentationAsReveal={exportPresentationAsReveal}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    constraints={constraints}
                    setConstraints={setConstraints} 
                    lanes={lanes} 
                    setLanes={setLanes} 
                    addLane={addLane} 
                    deleteLane={deleteLane}
                    newProject={newProject}
                    setViewMode={setViewMode}
                    images={images}
                    setImages={setImages}
                />
            </Grid>
            <Grid item xs style={{height: "fit-content"}}>
                {viewMode === ViewMode.SPLIT ? (
                    <Grid container style={{height: "100%"}} spacing={2}>
                        <Grid item xs={6} style={{height: "100%"}}>
                            {selectedLeftLaneIndex !== -1 && lanes[selectedLeftLaneIndex] ? (
                                <LaneContainer
                                    lanes={lanes}
                                    setLanes={setLanes}
                                    selectedLaneIndex={selectedLeftLaneIndex}
                                    selectLane={selectLeftLane}
                                    otherLaneIndex={selectedRightLaneIndex}
                                    addLane={addLane}
                                    deleteLane={deleteLane}
                                    constraints={constraints}
                                    editorData={leftEditorData}
                                    setEditorData={setLeftEditorData}
                                    synchronizeEditors={synchronizeEditors}
                                    left={true}
                                    selectedSlideIndex={selectedLeftSlideIndex}
                                    setSelectedSlideIndex={setSelectedLeftSlideIndex}
                                    rawCode={rawCode[selectedLeftLaneIndex]}
                                    setRawCode={setRawCode}
                                    imported={imported}
                                    setImported={setImported}
                                    images={images}
                                    metadata={metadata}
                                />
                            ) : ( <EmptyLane addLane={addLane}/> ) }
                        </Grid>
                        <Grid item xs={6} style={{height: "100%"}}>
                            {(selectedRightLaneIndex !== -1 && lanes[selectedRightLaneIndex]) ? (
                                <LaneContainer
                                    lanes={lanes}
                                    setLanes={setLanes}
                                    selectedLaneIndex={selectedRightLaneIndex}
                                    selectLane={selectRightLane}
                                    otherLaneIndex={selectedLeftLaneIndex}
                                    addLane={addLane}
                                    deleteLane={deleteLane}
                                    constraints={constraints}
                                    editorData={rightEditorData}
                                    setEditorData={setRightEditorData}
                                    synchronizeEditors={synchronizeEditors}
                                    left={false}
                                    selectedSlideIndex={selectedRightSlideIndex}
                                    setSelectedSlideIndex={setSelectedRightSlideIndex}
                                    rawCode={rawCode[selectedRightLaneIndex]}
                                    setRawCode={setRawCode}
                                    imported={imported}
                                    setImported={setImported}
                                    images={images}
                                    metadata={metadata}
                                />
                            ) : ( <EmptyLane addLane={addLane}/> ) }
                        </Grid> 
                    </Grid>
                ) : (
                    <Grid item xs style={{height: "100%"}}>
                        {selectedLeftLaneIndex !== -1 && lanes[selectedLeftLaneIndex] ? (
                            <LaneContainer
                                lanes={lanes}
                                setLanes={setLanes}
                                selectedLaneIndex={selectedLeftLaneIndex}
                                selectLane={selectLeftLane}
                                otherLaneIndex={selectedRightLaneIndex}
                                addLane={addLane}
                                deleteLane={deleteLane}
                                constraints={constraints}
                                editorData={leftEditorData}
                                setEditorData={setLeftEditorData}
                                synchronizeEditors={synchronizeEditors}
                                left={true}
                                selectedSlideIndex={selectedLeftSlideIndex}
                                setSelectedSlideIndex={setSelectedLeftSlideIndex}
                                rawCode={rawCode[selectedLeftLaneIndex]}
                                setRawCode={setRawCode}
                                imported={imported}
                                setImported={setImported}
                                images={images}
                                metadata={metadata}
                            />
                        ) : ( <EmptyLane addLane={addLane}/> ) }
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default App;
