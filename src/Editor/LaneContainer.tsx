import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { AnalysisVisitor } from "../Model/Visitors/AnalysisVisitor";
import LaneMenu from "./LaneMenu";
import { MarkdownParser } from "../Model/MarkdownParser";
import { PresentationParser } from "../Model/PresentationParser";
import { Constraints, ImageFile, Metadata } from "../Model/PresentationTypes";

interface LaneContainerProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    selectLane(index: number): void;
    otherLaneIndex: number;
    addLane(): void;
    deleteLane(index: number): void;
    constraints: Constraints;
    editorData: string;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    synchronizeEditors(editorContent: string, left: boolean): void;
    left: boolean;
    selectedSlideIndex: number;
    setSelectedSlideIndex: React.Dispatch<React.SetStateAction<number>>;
    rawCode: string[];
    setRawCode: React.Dispatch<React.SetStateAction<string[][]>>;
    imported: boolean;
    setImported: React.Dispatch<React.SetStateAction<boolean>>;
    images: ImageFile[];
    metadata: Metadata[];
}

const LaneContainer: React.FC<LaneContainerProps> = ({
    lanes,
    setLanes,
    selectedLaneIndex,
    selectLane,
    otherLaneIndex,
    addLane,
    deleteLane,
    constraints,
    editorData,
    setEditorData,
    synchronizeEditors,
    left,
    selectedSlideIndex,
    setSelectedSlideIndex,
    rawCode,
    setRawCode,
    imported,
    setImported,
    images,
    metadata
}) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [slideAnalysis, setSlideAnalysis] = useState<Constraints>({words: 0, characters: 0, images: 0, links: 0, headings: 0, bullet_points: 0, tables: 0});
    const [slideMode, setSlideMode] = useState<boolean>(
        lanes[selectedLaneIndex].outputsAsPresentation(),
    );
    const [frontMatter, setFrontMatter] = useState<any>(lanes[selectedLaneIndex].getContent()[selectedSlideIndex]?.getFrontMatter())
    let ignoreSync = useRef<boolean>(true);
    useEffect(() => {
        ignoreSync.current = true;
        updateEditor();
    }, [selectedSlideIndex])

    useEffect(() => {
        setSelectedSlideIndex(0);
        updateEditor();
    }, [selectedLaneIndex]);

    useEffect(() => {
        if (!ignoreSync.current) {
            regenerateSlide(selectedSlideIndex);
        }
        if (!imported) {
            setRawCode((oldCode) => {
                let updatedCode = [...oldCode];
                updatedCode[selectedLaneIndex][selectedSlideIndex] = editorData;
                return updatedCode;
            });
            setImported(false);
        }
        ignoreSync.current = false;
        synchronizeEditors(editorData, left);
    }, [editorData]);

    function addSlide() {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let resultLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                resultLanes.push(new Lane([...lane.getContent(), null], lane.getName(), lane.outputsAsPresentation()));
            });
            return resultLanes;
        });
    }

    function addSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let resultLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                resultLanes.push(new Lane([...lane.getContent().slice(0, index + 1), null, ...lane.getContent().slice(index + 1)], lane.getName(), lane.outputsAsPresentation()));
            });
            return resultLanes;
        });
    }

    function deleteSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let returnLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                let updatedSlides = lane.getContent().filter((_, slideIndex) => slideIndex !== index);
                returnLanes.push(new Lane(updatedSlides, lane.getName(), lane.outputsAsPresentation()));
            });
            if (selectedSlideIndex > 0) {
                setSelectedSlideIndex(selectedSlideIndex - 1);
                updateEditor();
            }
            return returnLanes;
        });
    }

    function setSlideActive(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [...updatedLanes[selectedLaneIndex].getContent()];
            let active = (updatedSlides[index] == null) ? true : !updatedSlides[index]!.isActive();
            let updatedSlide = (updatedSlides[index] == null) ? new SlideElement([]) : new SlideElement(updatedSlides[index]!.getContent(), active);
            updatedSlides[index] = updatedSlide;
            updatedLanes[selectedLaneIndex] = new Lane(updatedSlides, updatedLanes[selectedLaneIndex].getName(), updatedLanes[selectedLaneIndex].outputsAsPresentation());
            return updatedLanes;
        });
    }

    function regenerateSlide(index: number) {
        let markdownParser = new MarkdownParser();
        let jsonSlide = markdownParser.parseMarkdown(editorData);
        let presentationParser = new PresentationParser();
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [...updatedLanes[selectedLaneIndex].getContent()];
            let updatedSlide = presentationParser.getSlides([jsonSlide])[0];
            updatedSlides[index] = updatedSlide;
            if (updatedSlide) {
                let analysisVisitor = new AnalysisVisitor();
                analysisVisitor.visitSlideNode(updatedSlide);
                setSlideAnalysis(analysisVisitor.getResult());
                setFrontMatter(updatedSlide.getFrontMatter());
            }
            updatedLanes[selectedLaneIndex] = new Lane(updatedSlides, updatedLanes[selectedLaneIndex].getName(), updatedLanes[selectedLaneIndex].outputsAsPresentation());
            return updatedLanes;
        });
    }

    function updateEditor() {
        if (lanes[selectedLaneIndex].getContent()[selectedSlideIndex] == null) {
            setEditorData("");
            return;
        }
        setEditorData(rawCode[selectedSlideIndex]);
    }

    return (
        <Grid container direction="column" style={{ height: "100%" }} spacing={2}>
            <Grid item>
                <LaneMenu
                    lanes={lanes}
                    setLanes={setLanes}
                    selectedLaneIndex={selectedLaneIndex}
                    selectLane={selectLane}
                    otherLaneIndex={otherLaneIndex}
                    setSlideMode={setSlideMode}
                    setEditorData={setEditorData}
                    editorView={editorView}
                    setEditorView={setEditorView}
                    addLane={addLane}
                    deleteLane={deleteLane}
                />
            </Grid>
            <Grid item xs style={{height: "fit-content"}}>
                <EditorModule
                    editorData={editorData}
                    setEditorData={setEditorData}
                    slides={lanes[selectedLaneIndex].getContent()}
                    selectedSlideIndex={selectedSlideIndex}
                    setSelectedSlideIndex={setSelectedSlideIndex}
                    editorView={editorView}
                    slideMode={slideMode}
                    addSlide={addSlide}
                    addSlideAt={addSlideAt}
                    setSlideActive={setSlideActive}
                    deleteSlideAt={deleteSlideAt}
                    regenerateSlide={regenerateSlide}
                    constraints={constraints}
                    slideAnalysis={slideAnalysis}
                    updateEditor={updateEditor}
                    images={images}
                    metadata={metadata}
                    frontMatter={frontMatter}
                />
            </Grid>
        </Grid>
    );
};

export default LaneContainer;
