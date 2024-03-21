import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import Editor from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";
import { CustomAreaProcessor, CustomArea } from "./CustomAreaProcessor";

export interface EditorMethods {
  getData: () => string;
}

interface EditorProps {
  data: string;
  regenerateSlide: () => void;
}

const EditorContainer = forwardRef<EditorMethods, EditorProps>((props, ref) => {
  const editorRef = useRef(null);
  let timeout: NodeJS.Timeout;
  function handleMount(editor: any) {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => props.regenerateSlide(), 2000);
    });
  }

  function getData(): string {
    if (editorRef.current === null) {
      return "";
    }
    const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
    return editor.getValue();
  }


  useImperativeHandle(ref, () => ({
    getData
  }));

  return (
    <Editor height="100%" value={props.data} defaultLanguage="Markdown" onMount={handleMount} />
  );
});

export default EditorContainer;
