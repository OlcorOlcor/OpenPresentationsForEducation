import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { HtmlVisitor, MarkdownVisitor } from "../Model/Visitors";
import { SlideElement } from "../Model/PresentationModel";
import SelectContainer from "./SelectContainer";
import Preview from "./Preview";
import { Constraints, ImageFile } from "../Model/PresentationTypes";

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
    images
}) => {
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

    function getView(): any {
        if (editorView) {
            //updateEditor();
            if (slides[selectedSlideIndex] != null && slides[selectedSlideIndex]!.isActive()) {
                return (
                    <EditorContainer
                        data={editorData}
                        onEditorChange={editorChange}
                    />
                );
            } else {
                return <div></div>;
            }
        } else {
            if (!slideMode) {
                const data = editorData;
                return <Preview data={data} />;
            } else {
                if (slides[selectedSlideIndex] == null) {
                    return <Preview data={""} />;
                }
                let visitor = new HtmlVisitor();
                visitor.visitSlideNode(slides[selectedSlideIndex]!);
                const data = visitor.getResult();
                return <Preview data={data} />;
            }
        }
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
                    let visitor = new HtmlVisitor(false, images);
                    visitor.visitSlideNode(slides[selectedSlideIndex]!);
                    return <Preview data={visitor.getResult()} />;
                })()
            )}
        </Grid>
    </Grid>
    );
};

export default EditorModule;
