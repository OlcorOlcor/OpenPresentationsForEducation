import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import * as marked from "marked";
import { areaTokenizer } from "./AreaTokenizer";

interface FuncProps {
  onDataChange(newData: string): void;
}

const EditorContainer: React.FC<FuncProps> = (props) => {
  const editorRef = useRef(null);

  function handleChange() {
    if (editorRef.current != null) {
      const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
      console.log(areaTokenizer(editor.getValue()));
      const html = marked.parse(editor.getValue());
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
