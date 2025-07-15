import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { HtmlVisitor } from "../Model/Visitors/HtmlVisitor";
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
    addSlide(): void;
    addSlideAt(index: number): void;
    setSlideActive(index: number): void;
    reorderSlides(oldIndex: number, newIndex: number): void;
    deleteSlideAt(index: number): void;
    regenerateSlide(index: number): void;
    constraints: Constraints;
    slideAnalysis: Constraints;
    updateEditor(): void;
    images: ImageFile[];
    metadata: Metadata[];
    frontMatter: any;
    css: string;
}

const EditorModule: React.FC<EditorModuleProps> = ({
    editorData,
    setEditorData,
    slides,
    selectedSlideIndex,
    setSelectedSlideIndex,
    editorView,
    addSlide,
    addSlideAt,
    reorderSlides,
    setSlideActive,
    deleteSlideAt,
    regenerateSlide,
    constraints,
    slideAnalysis,
    updateEditor,
    images,
    metadata,
    frontMatter,
    css
}) => {

    const [previewStyleClass, setPreviewStyleClass] = useState<string>("");
    
    useEffect(() => {
        console.log(frontMatter);
        if (!frontMatter.layout) {
            return;
        }
        setPreviewStyleClass(frontMatter.layout);
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
                reorderSlides={reorderSlides}
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
            ) : slides[selectedSlideIndex] == null ? (
                <Preview html={""} css={""} layout={""}/>
            ) : (
                (() => {
                    let visitor = new HtmlVisitor(false, images, metadata);
                    visitor.visitSlideNode(slides[selectedSlideIndex]!);
                    return <Preview html={visitor.getResult()} css={css} layout={previewStyleClass}/>;
                })()
            )}
        </Grid>
    </Grid>
    );
};

export default EditorModule;
