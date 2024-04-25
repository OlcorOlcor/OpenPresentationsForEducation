import Grid from "@mui/material/Grid";
import EditorContainer from "./EditorContainer";
import { useEffect, useState } from "react";
import { HtmlVisitor, MarkdownVisitor } from "../Model/Visitors";
import { Presentation, SlideElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import { MarkdownParser } from "../Model/MarkdownParser";
import SelectContainer from "./SelectContainer";
import Preview from "./Preview";

interface EditorModuleProps {
		editorData: string;
		setEditorData: React.Dispatch<React.SetStateAction<string>>;
		slides: SlideElement[];
		setSlides: React.Dispatch<React.SetStateAction<SlideElement[]>>;
		selectedSlideIndex: number;
		setSelectedSlideIndex: React.Dispatch<React.SetStateAction<number>>;
		editorView: boolean;
		slideMode: boolean;
}

const EditorModule: React.FC<EditorModuleProps> = ({editorData, setEditorData, slides, setSlides, selectedSlideIndex, setSelectedSlideIndex, editorView, slideMode: slideMode}) => {
		const [selectedView, setSelectedView] = useState<any>(null);
		useEffect(() => {
				updateEditor();
		}, [selectedSlideIndex]);

		useEffect(() => {
				regenarateSlide();
		}, [editorData]);

		useEffect(() => {
				SwitchView();
		}, [editorView, slides, selectedSlideIndex, editorData]);

		function updateEditor() {
				const visitor = new MarkdownVisitor();
				visitor.visitSlideNode(slides[selectedSlideIndex]);
				setEditorData(visitor.getResult());
		}

		function addSlide(): void {
				setSlides(prevSlides => {
					let newSlide = new SlideElement([]);
					const newSlides = [...prevSlides, newSlide];
					setSelectedSlideIndex(newSlides.length - 1);
					return newSlides;
				});
		}

		function addSlideAfter(): void {
			setSlides(prevSlides => {
				let newSlide = new SlideElement([]);
				const newSlides = [...prevSlides.slice(0, selectedSlideIndex + 1), newSlide, ...prevSlides.slice(selectedSlideIndex + 1)];
				setSelectedSlideIndex(selectedSlideIndex + 1);
				return newSlides;
			});
		}

		function deleteSlide(): void {
			setSlides(prevSlides => {
				if (prevSlides.length === 1) {
					return prevSlides;
				}
				let updatedSlides = [...prevSlides];
				updatedSlides.splice(selectedSlideIndex, 1);
				setSelectedSlideIndex((selectedSlideIndex > 0) ? selectedSlideIndex - 1 : 0);
				return updatedSlides;
			})
		}

		function regenarateSlide(): void {
				let markdownParser = new MarkdownParser();
				let jsonSlides = markdownParser.parseMarkdown(editorData);
				let presentationParser = new PresentationParser(jsonSlides);
				// TODO: check result
				setSlides(prevSlides => {
					const updatedSlides = [...prevSlides];
					updatedSlides[selectedSlideIndex] = (presentationParser.GetPresentation() as Presentation).getSlides()[0];
					return updatedSlides;
				});
		}

		function selectSlide(slideIndex: number): void {
				setSelectedSlideIndex(slideIndex);
		}
		
		function editorChange(timeout: NodeJS.Timeout, editor: any): void {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				setEditorData(editor.getValue());
			}, 1000);
		}

		function SwitchView() {
				if (editorView) {
					setSelectedView(<EditorContainer data={editorData} onEditorChange={editorChange} />);
				} else {
						if (!slideMode) {
							const data = editorData;
							setSelectedView(<Preview data={data} />);
						} else {
							let visitor = new HtmlVisitor();
							visitor.visitSlideNode(slides[selectedSlideIndex]);
							const data = visitor.getResult();
							setSelectedView(<Preview data={data} />);
						}
				}
		}
		return (
				<Grid container style={{ height: "100%" }}>
						<Grid item xs={12} md={12}>
							<SelectContainer selectedSlideIndex={selectedSlideIndex} onAdd={addSlide} onAddAfter={addSlideAfter} onDelete={deleteSlide} elements={slides} onSelect={selectSlide}/>
						</Grid>
						<Grid item xs={12} md={12}>
							{selectedView && selectedView}
						</Grid>
			</Grid>
		)
}

export default EditorModule;
