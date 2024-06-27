import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { HtmlVisitor, MarkdownVisitor } from "../Model/Visitors";
import { SlideElement } from "../Model/PresentationModel";
import SelectContainer from "./SelectContainer";
import Preview from "./Preview";
import { Constraints } from "../Model/PresentationTypes";

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
    slideAnalysis
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
    }

    function editorChange(editorData: string): void {
        setEditorData(editorData);
        //regenerateSlide(selectedSlideIndex);
    }

    function getView(): any {
        if (editorView) {
            //updateEditor();
            if (slides[selectedSlideIndex] != null && slides[selectedSlideIndex]!.active) {
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
            <Grid item >
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
            <Grid item xs style={{ height: "100%" }}>
                {getView()}
            </Grid>
        </Grid>
    );
};

export default EditorModule;
