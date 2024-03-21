import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import EditorContainer, { EditorMethods } from "./EditorContainer";
import Preview from "./Preview";
import MetadataContainer, { MetadataContainerMethods } from "./MetadataContainer";
import { MarkdownParser } from "./markdownParser";
import { HtmlVisitor, MarkdownVisitor } from "./Visitors";
import { PresentationParser } from "./presentationParser";
import { Presentation, SlideElement } from "./presentationModel"
import SlideSelect from "./SlideSelect";

function App() {
  const [slides, setSlides] = useState<SlideElement[]>([new SlideElement([])]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const editorContainerRef = useRef<EditorMethods>(null);
  const metadataComponentRef = useRef<MetadataContainerMethods>(null);
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    updateEditor();
  }, [selectedSlideIndex]);

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
      
      if (editorContainerRef.current !== null) {
        //editorContainerRef.current.setData(visitor.getResult());
        setEditorData(visitor.getResult());
      }
    }

    reader.readAsText(file);
  }

  function fetchHtml(): string {
    let mp = new MarkdownParser();
    if (editorContainerRef.current === null) {
      return "";
    }
    let slides = mp.parseMarkdown(editorContainerRef.current.getData());
    let pp = new PresentationParser(slides);
    let presentation = pp.GetPresentation();
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation as Presentation);
    return visitor.getResult();
  }

  function fetchJson(): string {
    let mp = new MarkdownParser();
    if (editorContainerRef.current === null) {
      return "";
    }
    let slide = mp.parseMarkdown(editorContainerRef.current.getData());
    return JSON.stringify(slide);
  }

  function updateEditor() {
    const visitor = new MarkdownVisitor();
    visitor.visitSlideNode(slides[selectedSlideIndex]);
    setEditorData(visitor.getResult());
  }


  function selectSlide(slideIndex: number): void {
    if (editorContainerRef.current == null) {
      return;
    }
    setSelectedSlideIndex(slideIndex);
  }

  function newSlide(newSlide: SlideElement): void {
    let count = slides.length;
    setSlides([...slides, newSlide]);
    // this is done due to the async nature of react
    setSelectedSlideIndex(count);
    if (editorContainerRef.current == null) {
      return;
    }
  }

  function regenarateSlide(): void {
    if (editorContainerRef.current == null) {
      return;
    }
    let markdownParser = new MarkdownParser();
    const editorData = editorContainerRef.current.getData();
    console.log("Received Data: " + editorData);
    let jsonSlides = markdownParser.parseMarkdown(editorData);
    let presentationParser = new PresentationParser(jsonSlides);
    // TODO: check result
    setSlides(prevSlides => {
      console.log(selectedSlideIndex);
      const updatedSlides = [...prevSlides];
      console.log("EDITING INDEX: " + selectedSlideIndex);
      updatedSlides[selectedSlideIndex] = (presentationParser.GetPresentation() as Presentation).getSlides()[0];
      return updatedSlides;
    });
  }

  return (
    <div className="container">
      <Grid container spacing={2} className="gridContainer">
        <Grid item xs={6}>
          <Grid container direction="column" spacing={1} style={{ height: "100%" }}>
            <Grid item xs={1}>
              <input type="file" id="fileInput" onChange={importFile} />
            </Grid>
            <Grid item xs={2}>
              <SlideSelect addSlide={newSlide} slides={slides} onSelect={selectSlide}/>
            </Grid>
            <Grid item xs={8}>
              <EditorContainer regenerateSlide={regenarateSlide} data={editorData} ref={editorContainerRef} />
            </Grid>
            <Grid item xs={3}>
              <MetadataContainer ref={metadataComponentRef} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
