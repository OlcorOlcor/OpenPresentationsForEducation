import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import { areaTokenizer } from "./AreaTokenizer";
import { CustomAreaProcessor, CustomArea } from "./CustomAreaProcessor";
interface FuncProps {
  onDataChange(newData: string): void;
  areaProcessor: CustomAreaProcessor;
}

const EditorContainer: React.FC<FuncProps> = (props) => {
  const editorRef = useRef(null);
  const areaProcessor: CustomAreaProcessor = props.areaProcessor;
  function handleChange() {
    if (editorRef.current !== null) {
      const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
      let tokens = areaTokenizer(editor.getValue());

      // TODO: What if an id gets changed?
      // This applies to deletion as well
      // Updates and or creates new areas
      let currentAreas: CustomArea[] = [];
      tokens.forEach((token) => {
        let area = areaProcessor.getArea(token.id);
        if (area !== null) {
          area.text = token.content;
        } else {
          areaProcessor.addArea(token.id, token.name, token.content);
          area = areaProcessor.getArea(token.id);
        }
        // Area should never be null here, it just silences the compiler
        if (area !== null) {
          currentAreas.push(area);
        }
      });

      // Deletes areas that are no longer used
      let html = editor.getValue();
      areaProcessor.setAreas(currentAreas);
      // Remove tags from html and parse it using marked
      let regexStart = /<[\s\S]+: .+>/g;
      let regexEnd = /<\/[\s\S]+>/g;
      html = html.replace(regexStart, "");
      html = html.replace(regexEnd, "");
      props.onDataChange(html);
    }
  }

  function handleMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="Markdown"
      onMount={handleMount}
      onChange={handleChange}
    />
  );
};

export default EditorContainer;
