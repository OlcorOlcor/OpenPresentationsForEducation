import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
interface EditorProps {
  data: string;
  //setEditorData: React.Dispatch<React.SetStateAction<string>>;
  onEditorChange(timeout: NodeJS.Timeout, editor: any): void;
}

const EditorContainer: React.FC<EditorProps> =({data, onEditorChange}) => {
  let timeout: NodeJS.Timeout;
  function handleMount(editor: any) {
    editor.onDidChangeModelContent(() => {
      onEditorChange(timeout, editor);
    });
  }

  return (
    <Editor height="100%" value={data} defaultLanguage="Markdown" onMount={handleMount} />
  );
};

export default EditorContainer;
