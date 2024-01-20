import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";
import { CustomAreaProcessor, CustomArea } from "./CustomAreaProcessor";

export interface EditorMethods {
  getData: () => string;
}

const EditorContainer = forwardRef<EditorMethods>((props, ref) => {
  const editorRef = useRef(null);

  function handleMount(editor: any) {
    editorRef.current = editor;
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
  }));

  return (
    <Editor height="100%" defaultLanguage="Markdown" onMount={handleMount} />
  );
});

export default EditorContainer;
