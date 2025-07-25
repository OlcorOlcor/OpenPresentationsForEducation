import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { AnalysisVisitor } from "../Model/Visitors/AnalysisVisitor";
import LaneMenu from "./LaneMenu";
import { MarkdownParser } from "../Model/MarkdownParser";
import { PresentationParser } from "../Model/PresentationParser";
import { Constraints, ImageFile, Metadata } from "../Model/PresentationTypes";
import { arrayMove } from "@dnd-kit/sortable";

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
    initialView: boolean;
    css: string;
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
    metadata,
    initialView,
    css,
}) => {
    const [editorView, setEditorView] = useState<boolean>(initialView);
    const [slideAnalysis, setSlideAnalysis] = useState<Constraints>({
        words: 0,
        characters: 0,
        images: 0,
        links: 0,
        headings: 0,
        bullet_points: 0,
        tables: 0,
    });
    const [frontMatter, setFrontMatter] = useState<any>(
        lanes[selectedLaneIndex]
            .getContent()
            [selectedSlideIndex]?.getFrontMatter(),
    );
    let ignoreSync = useRef<boolean>(true);
    useEffect(() => {
        ignoreSync.current = true;
        updateEditor();
        const visitor = new AnalysisVisitor();
        let slide = lanes[selectedLaneIndex].getContent()[selectedSlideIndex];
        if (slide) {
            visitor.visitSlideNode(slide);
            setSlideAnalysis(visitor.getResult());
        }
    }, [selectedSlideIndex]);

    useEffect(() => {
        updateEditor();
    }, [selectedLaneIndex, rawCode]);

    // useEffect(() => {
    //     updateEditor();
    // }, [rawCode])

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
                resultLanes.push(
                    new Lane([...lane.getContent(), null], lane.getName()),
                );
            });
            return resultLanes;
        });
    }

    function addSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let resultLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                resultLanes.push(
                    new Lane(
                        [
                            ...lane.getContent().slice(0, index + 1),
                            null,
                            ...lane.getContent().slice(index + 1),
                        ],
                        lane.getName(),
                    ),
                );
            });
            return resultLanes;
        });
    }

    function reoderSlides(oldIndex: number, newIndex: number) {
        setLanes((oldLanes) => {
            const updatedLanes = [...oldLanes];
            const lane = updatedLanes[selectedLaneIndex];
            const slides = lane.getContent();
            const newSlides = arrayMove(slides, oldIndex, newIndex);
            setRawCode((oldCode) => {
                const newCode = [...oldCode];
                newCode[selectedLaneIndex] = arrayMove(
                    rawCode,
                    oldIndex,
                    newIndex,
                );
                return newCode;
            });
            updatedLanes[selectedLaneIndex] = new Lane(
                newSlides,
                lane.getName(),
            );
            setSelectedSlideIndex(newIndex);
            return updatedLanes;
        });
    }

    function deleteSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let returnLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                let updatedSlides = lane
                    .getContent()
                    .filter((_, slideIndex) => slideIndex !== index);
                returnLanes.push(new Lane(updatedSlides, lane.getName()));
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
            let updatedSlides = [
                ...updatedLanes[selectedLaneIndex].getContent(),
            ];
            let active =
                updatedSlides[index] == null
                    ? true
                    : !updatedSlides[index]!.isActive();
            let updatedSlide =
                updatedSlides[index] == null
                    ? new SlideElement([], active)
                    : new SlideElement(
                          updatedSlides[index]!.getContent(),
                          active,
                      );
            updatedSlides[index] = updatedSlide;
            updatedLanes[selectedLaneIndex] = new Lane(
                updatedSlides,
                updatedLanes[selectedLaneIndex].getName(),
            );
            return updatedLanes;
        });
    }

    function regenerateSlide(index: number) {
        let markdownParser = new MarkdownParser();
        let jsonSlide = markdownParser.parseMarkdown(editorData);
        let presentationParser = new PresentationParser();
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [
                ...updatedLanes[selectedLaneIndex].getContent(),
            ];
            let updatedSlide = presentationParser.getSlides([jsonSlide])[0];
            updatedSlides[index] = updatedSlide;
            if (updatedSlide) {
                let analysisVisitor = new AnalysisVisitor();
                analysisVisitor.visitSlideNode(updatedSlide);
                setSlideAnalysis(analysisVisitor.getResult());
                setFrontMatter(updatedSlide.getFrontMatter());
            }
            updatedLanes[selectedLaneIndex] = new Lane(
                updatedSlides,
                updatedLanes[selectedLaneIndex].getName(),
            );
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
        <Grid
            container
            direction="column"
            style={{ height: "100%", padding: "0 2%" }}
            spacing={2}
        >
            <Grid item>
                <LaneMenu
                    lanes={lanes}
                    setLanes={setLanes}
                    selectedLaneIndex={selectedLaneIndex}
                    selectLane={selectLane}
                    otherLaneIndex={otherLaneIndex}
                    setEditorData={setEditorData}
                    editorView={editorView}
                    setEditorView={setEditorView}
                    addLane={addLane}
                    deleteLane={deleteLane}
                />
            </Grid>
            <Grid item xs style={{ height: "fit-content" }}>
                <EditorModule
                    editorData={editorData}
                    setEditorData={setEditorData}
                    slides={lanes[selectedLaneIndex].getContent()}
                    selectedSlideIndex={selectedSlideIndex}
                    setSelectedSlideIndex={setSelectedSlideIndex}
                    editorView={editorView}
                    addSlide={addSlide}
                    addSlideAt={addSlideAt}
                    reorderSlides={reoderSlides}
                    setSlideActive={setSlideActive}
                    deleteSlideAt={deleteSlideAt}
                    constraints={constraints}
                    slideAnalysis={slideAnalysis}
                    updateEditor={updateEditor}
                    images={images}
                    metadata={metadata}
                    css={css}
                />
            </Grid>
        </Grid>
    );
};

export default LaneContainer;
