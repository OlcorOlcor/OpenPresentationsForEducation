import { SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import { BoldElement, HeadingElement, Lane, LinkElement, ParagraphElement, SlideElement, TextElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import AppMenu from "./Menu";
import { HtmlVisitor } from "../Model/Visitors/HtmlVisitor";
import { JsonVisitor } from "../Model/Visitors/JsonVisitor";
import { MarkdownVisitor } from "../Model/Visitors/MarkdownVisitor";
import * as pt from "../Model/PresentationTypes";
import { saveAs } from "file-saver";
import EmptyLane from "./EmptyLane";
import modelSchema from "../Model/model-schema.json";
import Ajv from "ajv";
import { ViewMode } from "./ViewMode";
import { useLocation } from "react-router-dom";

function EditorApp() {

    const introSlide: string = "# Welcome to **Open Slides (working title)**\n\nYou can start working on your presentation right away, or you can click [here]() for a tutorial presentation.";

    const [lanes, setLanes] = useState<Lane[]>([
        new Lane([new SlideElement([new HeadingElement(1, [new TextElement("Welcome to "), new BoldElement([new TextElement("Open Slides (working title)")])], [], {}), new ParagraphElement([new TextElement("You can start working on your presentation right away, or you can click "), new LinkElement("", "here"), new TextElement(" for a tutorial presentation.")], [], {})], true)], "first"),
        new Lane([new SlideElement([])], "second"),
    ]);
    const [rawCode, setRawCode] = useState<string[][]>([[introSlide],[introSlide]]);
    const [metadata, setMetadata] = useState<pt.Metadata[]>([]);
    const [images, setImages] = useState<pt.ImageFile[]>([]);
    const [styles, setStyles] = useState<pt.Styles>({name: "", content: ""});
    const [constraints, setConstraints] = useState<pt.Constraints>({words: null, characters: null, images: null, links: null, headings: null, bullet_points: null, tables: null});
    const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] = useState<number>(0);
    const [selectedRightLaneIndex, setSelectedRightLaneIndex] = useState<number>(0);
    const [imported, setImported] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPLIT);
    const [leftEditorData, setLeftEditorData] = useState<string>(introSlide);
    const [rightEditorData, setRightEditorData] = useState<string>(introSlide);
    const [selectedLeftSlideIndex, setSelectedLeftSlideIndex] = useState<number>(0);
    const [selectedRightSlideIndex, setSelectedRightSlideIndex] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        if (imported) {
            setLeftEditorData(rawCode[0][0]);
            if (rawCode.length > 1) {
                setRightEditorData(rawCode[1][0]);
            }
            setImported(false);
        }
    }, [imported]);

    useEffect(() => {
        console.log("test");
        const params = new URLSearchParams(location.search);
        console.log(params.get("tutorial"));
        if (params.get("tutorial") === "true") {
            fetch("tutorial_presentation.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Tutorial file not found.");
                }
                console.log(response.text());
                return response.blob();
            })
            .then((blob) => {
                console.log(blob.text());
                const file = new File([blob], "tutorial_presentation.json", { type: "application/json" });
                importPresentation(file);
            })
            .catch((err) => {
                console.error("Failed to load tutorial:", err);
                alert("Failed to load tutorial presentation.");
            });
        }
    }, []);

    useEffect(() => {
        if (lanes.length >= 1 && selectedLeftLaneIndex === -1) {
            setSelectedLeftLaneIndex(0);
        }
        if (lanes.length >= 1 && selectedRightLaneIndex === -1) {
            setSelectedRightLaneIndex(0);
        }
    }, [lanes]);

    const observer = new ResizeObserver((entries) => {});
    observer.observe(document.querySelector("body")!);

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
            slides.push(new SlideElement([], false, [], [], {}, {}));
            for (let i = 1; i < numberOfSlides; ++i) {
                slides.push(null);
            }
            updatedLanes.push(new Lane(slides, oldLanes.length.toString()));
            return updatedLanes;
        });
        setRawCode((oldCode) => {
            let updatedCode = [...oldCode];
            updatedCode.push([""]);
            return updatedCode;
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
            if (updatedLanes.length === 0) {
                setSelectedLeftLaneIndex(-1);
                setSelectedRightLaneIndex(-1);
            }
            else if (leftLane) {
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
            setStyles(json.styles);
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

    function importStyleFromFile(file: File) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let content = e.target?.result as string;
            setStyles({name: file.name, content: content});
        }
        reader.readAsText(file);
    }

    function exportPresentationAsJSON() {
        let visitor = new JsonVisitor();
        let jsonLanes: pt.Lane[] = [];
        lanes.forEach(lane => {
            visitor.visitLaneNode(lane);
            jsonLanes.push(visitor.getResult());
        });
        let exportJson = {lanes: jsonLanes, metadata: metadata, constraints: constraints, imageFiles: images, styles: styles};
        const blob = new Blob([JSON.stringify(exportJson)], { type: "json" });
        saveAs(blob, "output.json");
    }

    function exportCss() {
        const blob = new Blob([styles.content], {type: "text"});
        let fileName: string = styles.name !== "" ? styles.name : "style";
        saveAs(blob, fileName);
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
        setLanes([new Lane([new SlideElement([], false)], "first"), new Lane([new SlideElement([], false)], "second")]);
        setSelectedLeftLaneIndex(0);
        setSelectedRightLaneIndex(1);
        setRawCode([[""], [""]]);
        setLeftEditorData("");
        setRightEditorData("");
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
                    exportCss={exportCss}
                    newStyle={importStyleFromFile}
                    setStyle={setStyles}
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
                                    initialView={true}
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
                                    initialView={false}
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
                                initialView={true}
                            />
                        ) : ( <EmptyLane addLane={addLane}/> ) }
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default EditorApp;
