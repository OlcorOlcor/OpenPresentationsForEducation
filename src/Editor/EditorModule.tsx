import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { HtmlVisitor } from "../Model/Visitors/HtmlVisitor";
import { SlideElement } from "../Model/PresentationModel";
import SelectContainer from "./SelectContainer";
import Preview from "./Preview";
import { Constraints, ImageFile, Metadata } from "../Model/PresentationTypes";

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
    constraints: Constraints;
    slideAnalysis: Constraints;
    updateEditor(): void;
    images: ImageFile[];
    metadata: Metadata[];
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
    constraints,
    slideAnalysis,
    updateEditor,
    images,
    metadata,
    css,
}) => {
    function deleteSlide(): void {
        deleteSlideAt(selectedSlideIndex);
    }

    function selectSlide(slideIndex: number): void {
        setSelectedSlideIndex(slideIndex);
        updateEditor();
    }

    function editorChange(editorData: string): void {
        setEditorData(editorData);
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
            <Grid
                item
                xs
                style={{
                    height: "100%",
                    width: "95%",
                    resize: "vertical",
                    overflow: "auto",
                }}
            >
                {editorView ? (
                    slides[selectedSlideIndex] != null &&
                    slides[selectedSlideIndex]!.isActive() ? (
                        <EditorContainer
                            data={editorData}
                            onEditorChange={editorChange}
                        />
                    ) : (
                        <div></div>
                    )
                ) : (
                    (() => {
                        console.log("here");
                        let html = "";
                        if (slides[selectedSlideIndex]) {
                            let visitor = new HtmlVisitor(images, metadata);
                            visitor.visitSlideNode(slides[selectedSlideIndex]!);
                            html = visitor.getResult();
                        }
                        return <Preview html={html} css={css} />;
                    })()
                )}
            </Grid>
        </Grid>
    );
};

export default EditorModule;
