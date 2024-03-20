import React, { useState, useRef, ChangeEvent } from "react";
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
  const [slides, setSlides] = useState<SlideElement[]>([]);
  const editorContainerRef = useRef<EditorMethods>(null);
  const metadataComponentRef = useRef<MetadataContainerMethods>(null);
  const [generatedData, setGeneratedData] = useState(
    "Here your presentation will be displayed",
  );
  const [editorData, setEditorData] = useState("");

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
      
      setSlides((presentation as Presentation).getSlides());
      let visitor = new MarkdownVisitor();
      visitor.visitPresentationNode(presentation as Presentation);
      
      if (editorContainerRef.current !== null) {
        editorContainerRef.current.setData(visitor.getResult());
      }
    }

    reader.readAsText(file)
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

  function selectSlide(selectedSlide: SlideElement): void {
    if (editorContainerRef.current == null) {
      return;
    }
    const visitor = new MarkdownVisitor();
    visitor.visitSlideNode(selectedSlide);
    editorContainerRef.current.setData(visitor.getResult());
  }

  return (
    <div className="container">
      <Grid container spacing={2} className="gridContainer">
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2} style={{ height: "100%" }}>
            <Grid item xs={1}>
              <input type="file" id="fileInput" onChange={importFile} />
            </Grid>
            <Grid item xs={2}>
              <SlideSelect slides={slides} onSelect={selectSlide}/>
            </Grid>
            <Grid item xs={8}>
              <EditorContainer data={editorData} ref={editorContainerRef} />
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
