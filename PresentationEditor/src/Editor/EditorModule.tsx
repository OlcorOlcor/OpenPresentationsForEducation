import Grid from "@mui/material/Grid";
import SlideSelect from "./SlideSelect";
import EditorContainer from "./EditorContainer";
import MetadataContainer, { MetadataContainerMethods } from "./MetadataContainer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MarkdownVisitor } from "../Model/Visitors";
import { Presentation, SlideElement } from "../Model/PresentationModel";
import { PresentationParser } from "../Model/PresentationParser";
import { MarkdownParser } from "../Model/MarkdownParser";

interface EditorModuleProps {
  editorData: string;
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
  slides: SlideElement[];
  setSlides: React.Dispatch<React.SetStateAction<SlideElement[]>>;
  selectedSlideIndex: number;
  setSelectedSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

const EditorModule: React.FC<EditorModuleProps> = ({editorData, setEditorData, slides, setSlides, selectedSlideIndex, setSelectedSlideIndex}) => {
    const metadataComponentRef = useRef<MetadataContainerMethods>(null);
    
    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex]);

    useEffect(() => {
        regenarateSlide();
    }, [editorData]);

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }

    const importFile = (event: ChangeEvent<HTMLInputElement>) => {
        let element = event.target as HTMLInputElement;
        let file = element.files?.[0];
        if (!file) {
          return;
        }
        let reader = new FileReader();
    
        reader.onload = (e) => {
          let content = e.target?.result as string;
          let pp = new PresentationParser(JSON.parse(content));
          let presentation = pp.GetPresentation();
          let parsedSlides = (presentation as Presentation).getSlides();
          setSlides(parsedSlides);
          let visitor = new MarkdownVisitor();
          visitor.visitSlideNode((presentation as Presentation).getSlides()[0]);
          setEditorData(visitor.getResult());
        }
        reader.readAsText(file);
    }

    function newSlide(newSlide: SlideElement): void {
        setSlides(prevSlides => {
          const newSlides = [...prevSlides, newSlide];
          setSelectedSlideIndex(newSlides.length - 1);
          return newSlides;
        });
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
      }, 2000);
    }

    return (
        <Grid container direction="column" spacing={1} style={{ height: "100%" }}>
            <Grid item xs={1}>
            <input type="file" id="fileInput" onChange={importFile} />
            </Grid>
            <Grid item xs={2}>
            <SlideSelect addSlide={newSlide} slides={slides} onSelect={selectSlide}/>
            </Grid>
            <Grid item xs={8}>
            <EditorContainer data={editorData} onEditorChange={editorChange} />
            </Grid>
            <Grid item xs={1}>
            <MetadataContainer ref={metadataComponentRef} />
            </Grid>
      </Grid>
    )
}

export default EditorModule;
