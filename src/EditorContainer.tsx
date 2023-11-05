import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import * as marked from "marked";
//import "Preprocessor.ts";

interface FuncProps {
  onDataChange(newData: string): void;
}

interface AreaToken {
  type: 'area';
  id: string;
  content: string;
}

function AreaTokenizer(src: string): AreaToken[] {
  const tokens: AreaToken[] = [];
  const customAreaRegex = /<[A-Za-z]+: (.+?)>([\s\S]*?)<\/[A-Za-z]+>/g;

  let match;
  while ((match = customAreaRegex.exec(src)) !== null) {
    const content = match[2];
    const id = match[1];

    // Push custom token
    const customToken: AreaToken = {
      type: 'area',
      id: id,
      content: content
    };
    tokens.push(customToken);
  }

  return tokens;
};

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
