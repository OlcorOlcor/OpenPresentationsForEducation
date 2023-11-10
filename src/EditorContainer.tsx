import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import * as marked from "marked";
import { AreaTokenizer } from "./AreaTokenizer";

interface FuncProps {
  onDataChange(newData: string): void;
}

const EditorContainer: React.FC<FuncProps> = (props) => {
  const editorRef = useRef(null);

  function HandleChange() {
    if (editorRef.current != null) {
      const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
      console.log(AreaTokenizer(editor.getValue()));
      const html = marked.parse(editor.getValue());
      props.onDataChange(html);
    }
  }

  function HandleMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="Markdown"
      onMount={HandleMount}
      onChange={HandleChange}
    />
  );
};

export default EditorContainer;
