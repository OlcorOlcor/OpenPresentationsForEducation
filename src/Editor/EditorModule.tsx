import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { HtmlVisitor, MarkdownVisitor } from "../Model/Visitors";
import { SlideElement } from "../Model/PresentationModel";
import SelectContainer from "./SelectContainer";
import Preview from "./Preview";
import { Constraints, ImageFile, Metadata } from "../Model/PresentationTypes";
import { useEffect, useState } from "react";
interface EditorModuleProps {
    editorData: string;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    slides: (SlideElement | null)[];
    selectedSlideIndex: number;
    setSelectedSlideIndex: React.Dispatch<React.SetStateAction<number>>;
    editorView: boolean;
    slideMode: boolean;
    addSlide(): void;
    addSlideAt(index: number): void;
    setSlideActive(index: number): void;
    deleteSlideAt(index: number): void;
    regenerateSlide(index: number): void;
    constraints: Constraints;
    slideAnalysis: Constraints;
    updateEditor(): void;
    images: ImageFile[];
    metadata: Metadata[];
    frontMatter: any;
}

const EditorModule: React.FC<EditorModuleProps> = ({
    editorData,
    setEditorData,
    slides,
    selectedSlideIndex,
    setSelectedSlideIndex,
    editorView,
    slideMode,
    addSlide,
    addSlideAt,
    setSlideActive,
    deleteSlideAt,
    regenerateSlide,
    constraints,
    slideAnalysis,
    updateEditor,
    images,
    metadata,
    frontMatter
}) => {

    useEffect(() => {
        console.log(frontMatter);
        if (!frontMatter.layout) {
            return;
        }
        let layout: string;
        switch (frontMatter.layout) {
            case "column_2":
                layout = "column_2.css";
            break;
            case "column_3":
                layout = "column_3.css";
            break;
            case "column_1":
            default:
                return;
        }
        const linkElement: HTMLLinkElement | null = document.getElementById("preview-stylesheet") as HTMLLinkElement;
        
        
        if (linkElement) {
            linkElement.href = `./presentation_css/${layout}`;
            return;
        }
            let newLink = document.createElement("link");
            newLink.id = "preview-stylesheet";
            newLink.rel = "stylesheet";
            newLink.href = `./presentation_css/${layout}`;
            document.head.appendChild(newLink);
    }, [frontMatter]);

    // const [selectedView, setSelectedView] = useState<any>(null);

    //useEffect(() => {
    //getView();
    //}, [editorView]);
    /*
    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }
    */
    function deleteSlide(): void {
        deleteSlideAt(selectedSlideIndex);
    }

    function selectSlide(slideIndex: number): void {
        setSelectedSlideIndex(slideIndex);
        updateEditor();
    }

    function editorChange(editorData: string): void {
        setEditorData(editorData);
        //regenerateSlide(selectedSlideIndex);
    }

    function activateSlide() {
        setSlideActive(selectedSlideIndex);
    }

    return (
    <Grid container direction="column" style={{ height: "100%" }}>
        <Grid item>
            <SelectContainer
                selectedSlideIndex={selectedSlideIndex}
                onAdd={addSlide}
                onAddAfter={() => addSlideAt(selectedSlideIndex)}
                onDelete={deleteSlide}
                elements={slides}
                onSelect={selectSlide}
                onActivate={activateSlide}
                constraints={constraints}
                slideAnalysis={slideAnalysis}
            />
        </Grid>
        <Grid item xs style={{ height: "100%", width: "95%", resize: "vertical", overflow: "auto" }}>
            {editorView ? (
                slides[selectedSlideIndex] != null && slides[selectedSlideIndex]!.isActive() ? (
                    <EditorContainer
                        data={editorData}
                        onEditorChange={editorChange}
                    />
                ) : (
                    <div></div>
                )
            ) : !slideMode ? (
                <Preview data={editorData} />
            ) : slides[selectedSlideIndex] == null ? (
                <Preview data={""} />
            ) : (
                (() => {
                    let visitor = new HtmlVisitor(false, images, metadata);
                    visitor.visitSlideNode(slides[selectedSlideIndex]!);
                    return <Preview data={visitor.getResult()} />;
                })()
            )}
        </Grid>
    </Grid>
    );
};

export default EditorModule;
