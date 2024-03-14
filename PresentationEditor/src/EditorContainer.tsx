import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import Editor from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";
import { CustomAreaProcessor, CustomArea } from "./CustomAreaProcessor";

export interface EditorMethods {
  getData: () => string;
  setData: (text: string) => void;
}

interface EditorProps {
  data: string;
}

const EditorContainer = forwardRef<EditorMethods, EditorProps>((props, ref) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState<string>(props.data);
  function handleMount(editor: any) {
    editorRef.current = editor;
  }
  
  function setData(text: string): void {
    setEditorValue(text);
  }

  function getData(): string {
    if (editorRef.current === null) {
      return "";
    }
    const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
    return editor.getValue();
  }


  useImperativeHandle(ref, () => ({
    getData,
    setData
  }));

  return (
    <Editor height="100%" value={editorValue} defaultLanguage="Markdown" onMount={handleMount} />
  );
});

export default EditorContainer;
