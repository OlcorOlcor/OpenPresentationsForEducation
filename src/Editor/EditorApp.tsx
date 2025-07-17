import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./css/App.css";
import {
    BoldElement,
    HeadingElement,
    Lane,
    ParagraphElement,
    SlideElement,
    TextElement,
} from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import LaneContainer from "./LaneContainer";
import AppMenu from "./AppMenu";
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
import { useMediaQuery, useTheme } from "@mui/material";

function EditorApp() {
    const introSlide: string =
        "# Welcome to **Open Slides**\n\nYou can start working on your presentation right away! You can also load a new presentation or a tutorial in File > New!";

    const [lanes, setLanes] = useState<Lane[]>([
        new Lane(
            [
                new SlideElement(
                    [
                        new HeadingElement(
                            1,
                            [
                                new TextElement("Welcome to "),
                                new BoldElement([
                                    new TextElement("Open Slides"),
                                ]),
                            ],
                            [],
                            {},
                        ),
                        new ParagraphElement(
                            [
                                new TextElement(
                                    "You can start working on your presentation right away! You can also load a new presentation or a tutorial in File > New!",
                                ),
                            ],
                            [],
                            {},
                        ),
                    ],
                    true,
                ),
            ],
            "first",
        ),
        new Lane([new SlideElement([])], "second"),
    ]);
    const [rawCode, setRawCode] = useState<string[][]>([
        [introSlide],
        [introSlide],
    ]);
    const [metadata, setMetadata] = useState<pt.Metadata[]>([]);
    const [images, setImages] = useState<pt.ImageFile[]>([]);
    const [styles, setStyles] = useState<pt.Styles>({ name: "", content: "" });
    const [constraints, setConstraints] = useState<pt.Constraints>({
        words: null,
        characters: null,
        images: null,
        links: null,
        headings: null,
        bullet_points: null,
        tables: null,
    });
    const [selectedLeftLaneIndex, setSelectedLeftLaneIndex] =
        useState<number>(0);
    const [selectedRightLaneIndex, setSelectedRightLaneIndex] =
        useState<number>(0);
    const [imported, setImported] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPLIT);
    const [leftEditorData, setLeftEditorData] = useState<string>(introSlide);
    const [rightEditorData, setRightEditorData] = useState<string>(introSlide);
    const [selectedLeftSlideIndex, setSelectedLeftSlideIndex] =
        useState<number>(0);
    const [selectedRightSlideIndex, setSelectedRightSlideIndex] =
        useState<number>(0);
    const location = useLocation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const listener = (event: any) => {
            if (event.ctrlKey && event.altKey && event.key === "s") {
                event.preventDefault();
                exportPresentationAsJSON();
            } else if (event.ctrlKey && event.altKey && event.key === "n") {
                event.preventDefault();
                newProject();
            } else if (event.ctrlKey && event.altKey && event.key === "m") {
                event.preventDefault();
                setLanes((oldLanes) => {
                    let updatedLanes = [...oldLanes];
                    let resultLanes: Lane[] = [];
                    updatedLanes.forEach((lane) => {
                        resultLanes.push(
                            new Lane(
                                [...lane.getContent(), null],
                                lane.getName(),
                            ),
                        );
                    });
                    return resultLanes;
                });
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

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
                numberOfSlides =
                    lanes[selectedLeftLaneIndex].getContent().length;
            } else if (selectedRightLaneIndex !== -1) {
                numberOfSlides =
                    lanes[selectedRightLaneIndex].getContent().length;
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
            let updatedLanes = oldLanes.filter(
                (_, laneIndex) => laneIndex !== index,
            );
            if (updatedLanes.length >= 2) {
                index = updatedLanes.length - 1;
                if (
                    (leftLane && index === selectedRightLaneIndex) ||
                    (!leftLane && index === selectedLeftLaneIndex)
                ) {
                    --index;
                }
            } else {
                index = -1;
            }
            if (updatedLanes.length === 0) {
                setSelectedLeftLaneIndex(-1);
                setSelectedRightLaneIndex(-1);
            } else if (leftLane) {
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
        if (
            viewMode !== ViewMode.SPLIT ||
            selectedLeftSlideIndex !== selectedRightSlideIndex ||
            selectedLeftLaneIndex !== selectedRightLaneIndex
        ) {
            return;
        }
        if (left) {
            setRightEditorData(editorContent);
        } else {
            setLeftEditorData(editorContent);
        }
    }

    function selectLeftLane(index: number) {
        if (rawCode[index][selectedLeftSlideIndex]) {
            setLeftEditorData(rawCode[index][selectedLeftSlideIndex]);
        }
        setSelectedLeftLaneIndex(index);
    }

    function selectRightLane(index: number) {
        if (rawCode[index][selectedRightSlideIndex]) {
            setRightEditorData(rawCode[index][selectedRightSlideIndex]);
        }
        setSelectedRightLaneIndex(index);
    }

    function formatImportErrors(errors: any[]): string {
        return errors
            .map((error) => {
                const { instancePath, message, params } = error;

                let returnMessage: string = "";

                returnMessage += `Error at ${instancePath || "root"}: ${message}`;
                if (params.allowedValues && params.allowedValues.length > 0) {
                    returnMessage += ": ";
                    params.allowedValues.forEach((val: string) => {
                        returnMessage += val + ", ";
                    });
                }
                return returnMessage;
            })
            .join("\n");
    }

    function setRawCodeAfterImport(lanes: Lane[]) {
        let importRaw: string[][] = [];
        let markdownVisitor = new MarkdownVisitor();
        let index = 0;
        lanes.forEach((lane) => {
            importRaw.push([]);
            lane.getContent().forEach((slide) => {
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
            console.log(content);
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
            setStyles({ name: file.name, content: content });
        };
        reader.readAsText(file);
    }

    function exportPresentationAsJSON() {
        let visitor = new JsonVisitor();
        let jsonLanes: pt.Lane[] = [];
        lanes.forEach((lane) => {
            visitor.visitLaneNode(lane);
            jsonLanes.push(visitor.getResult());
        });
        let exportJson = {
            lanes: jsonLanes,
            metadata: metadata,
            constraints: constraints,
            imageFiles: images,
            styles: styles,
        };
        const blob = new Blob([JSON.stringify(exportJson)], { type: "json" });
        saveAs(blob, "output.json");
    }

    async function exportPresentationToURL(url: string) {
        let visitor = new JsonVisitor();
        let jsonLanes: pt.Lane[] = [];

        lanes.forEach((lane) => {
            visitor.visitLaneNode(lane);
            jsonLanes.push(visitor.getResult());
        });

        const exportJson = {
            lanes: jsonLanes,
            metadata,
            constraints,
            imageFiles: images,
            styles,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exportJson),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to upload. Status ${response.status}: ${response.statusText}`,
                );
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    }

    function exportCss() {
        const blob = new Blob([styles.content], { type: "text" });
        let fileName: string = styles.name !== "" ? styles.name : "style";
        saveAs(blob, fileName);
    }

    function exportPresentationAsReveal(main: Lane, secondary: Lane) {
        let res: string =
            '<html><head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css" /><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css" /><style>' +
            styles.content +
            "</style></head>";
        res += '<div class="reveal"><div class="slides">';
        let index = 0;
        main.getContent().forEach((mainSlide) => {
            if (mainSlide == null || !mainSlide.isActive()) {
                return;
            }
            let visitor = new HtmlVisitor(images, metadata);
            res += "<section>";
            visitor.visitSlideNode(mainSlide);
            res += visitor.getResult();
            let secondarySlide = secondary.getContent()[index];
            if (secondarySlide != null && secondarySlide.isActive()) {
                // new visitor to clear the previous slide
                visitor = new HtmlVisitor(images, metadata);
                res += '<aside class="notes">';
                visitor.visitSlideNode(secondarySlide);
                res += visitor.getResult();
                res += "</aside>";
            }
            res += "</section>";
            ++index;
        });

        res +=
            '<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script><script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script><script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/markdown/markdown.js"></script><script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script><script>Reveal.initialize();</script></body>';
        res +=
            '<script src="plugin/notes/notes.js"></script><script>Reveal.initialize({plugins: [RevealNotes],});</script></html>';
        const blob = new Blob([res], { type: "html" });
        saveAs(blob, "output_reveal.html");
    }

    function exportPresentationAsHtml(js: string) {
        let res: string = "<html><head>";
        res += "<style>" + styles.content + "</style>";
        res += "</head><body>";
        lanes.forEach((lane) => {
            let visitor = new HtmlVisitor(images, metadata);
            visitor.visitLaneNode(lane);
            res += visitor.getResult();
        });
        res += '<script src="' + js + '"></script>';
        res += "</body></html>";
        const blob = new Blob([res], { type: "html" });
        saveAs(blob, "output.html");
    }

    function newProject() {
        setLanes([
            new Lane([new SlideElement([], false)], "first"),
            new Lane([new SlideElement([], false)], "second"),
        ]);
        setSelectedLeftLaneIndex(0);
        setSelectedRightLaneIndex(1);
        setRawCode([[""], [""]]);
        setLeftEditorData("");
        setRightEditorData("");
        setConstraints({
            words: null,
            characters: null,
            images: null,
            links: null,
            headings: null,
            bullet_points: null,
            tables: null,
        });
        setMetadata([]);
    }

    function loadTutorial() {
        fetch("tutorial_presentation.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Tutorial file not found.");
                }
                return response.blob();
            })
            .then((blob) => {
                const file = new File([blob], "tutorial_presentation.json", {
                    type: "application/json",
                });
                importPresentation(file);
            })
            .catch((err) => {
                console.error("Failed to load tutorial:", err);
                alert("Failed to load tutorial presentation.");
            });
    }

    return (
        <Grid
            container
            direction="column"
            style={{ height: "100vh" }}
            spacing={2}
        >
            <Grid item>
                <AppMenu
                    importPresentation={importPresentation}
                    exportPresentationAsJson={exportPresentationAsJSON}
                    exportPresentationAsReveal={exportPresentationAsReveal}
                    exportPresentationAsHtml={exportPresentationAsHtml}
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
                    exportPresentationToURL={exportPresentationToURL}
                    loadTutorial={loadTutorial}
                />
            </Grid>
            <Grid item xs style={{ height: "fit-content" }}>
                {viewMode === ViewMode.SPLIT ? (
                    <Grid
                        container
                        direction={isSmallScreen ? "column" : "row"}
                        style={{ height: "100%" }}
                        spacing={2}
                    >
                        <Grid item xs={6} style={{ height: "100%" }}>
                            {selectedLeftLaneIndex !== -1 &&
                            lanes[selectedLeftLaneIndex] ? (
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
                                    setSelectedSlideIndex={
                                        setSelectedLeftSlideIndex
                                    }
                                    rawCode={rawCode[selectedLeftLaneIndex]}
                                    setRawCode={setRawCode}
                                    imported={imported}
                                    setImported={setImported}
                                    images={images}
                                    metadata={metadata}
                                    initialView={true}
                                    css={styles.content}
                                />
                            ) : (
                                <EmptyLane addLane={addLane} />
                            )}
                        </Grid>
                        <Grid item xs={6} style={{ height: "100%" }}>
                            {selectedRightLaneIndex !== -1 &&
                            lanes[selectedRightLaneIndex] ? (
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
                                    setSelectedSlideIndex={
                                        setSelectedRightSlideIndex
                                    }
                                    rawCode={rawCode[selectedRightLaneIndex]}
                                    setRawCode={setRawCode}
                                    imported={imported}
                                    setImported={setImported}
                                    images={images}
                                    metadata={metadata}
                                    initialView={false}
                                    css={styles.content}
                                />
                            ) : (
                                <EmptyLane addLane={addLane} />
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs style={{ height: "100%" }}>
                        {selectedLeftLaneIndex !== -1 &&
                        lanes[selectedLeftLaneIndex] ? (
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
                                setSelectedSlideIndex={
                                    setSelectedLeftSlideIndex
                                }
                                rawCode={rawCode[selectedLeftLaneIndex]}
                                setRawCode={setRawCode}
                                imported={imported}
                                setImported={setImported}
                                images={images}
                                metadata={metadata}
                                initialView={true}
                                css={styles.content}
                            />
                        ) : (
                            <EmptyLane addLane={addLane} />
                        )}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default EditorApp;
