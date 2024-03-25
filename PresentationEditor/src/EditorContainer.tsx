import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { CustomAreaProcessor, CustomArea } from "./CustomAreaProcessor";
interface EditorProps {
  data: string;
  regenerateSlide: () => void;
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
}

const EditorContainer: React.FC<EditorProps> =({data, regenerateSlide, setEditorData}) => {
  let timeout: NodeJS.Timeout;
  function handleMount(editor: any) {
    editor.onDidChangeModelContent(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setEditorData(editor.getValue());
      }, 2000);
    });
  }

  return (
    <Editor height="100%" value={data} defaultLanguage="Markdown" onMount={handleMount} />
  );
};

export default EditorContainer;
