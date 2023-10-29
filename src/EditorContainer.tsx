import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import * as marked from "marked";
import "Preprocessor.ts";

interface FuncProps {
  onDataChange(newData: string): void;
}

interface CustomMarkedExtension extends marked.MarkedExtension {
  lexer?: {
      inline: (text: string, tokens: marked.Token[]) => void;
      inlineTokens: (text: string) => marked.Token[];
    };
}

const Slide: CustomMarkedExtension = {
  name: "Slide",
  level: "block",
  start(src: string) { 
    return src.match(/^#Slide/)?.index; 
  },
  tokenizer(src: string, tokens: marked.Token[]): marked.Token | null {
    const rule = /^#Slide/;
    const match = rule.exec(src);
    if (match) {
      const token: marked.Token = {
        type: "Slide",
        raw: match[0],
        text: match[0].trim(),
        tokens: []
      }
      this.lexer?.inline(token.text, token.tokens as marked.Token[]);
      return token;
    }
    return null;
  },
  renderer(token) {
    return ""
  }
}

const EditorContainer: React.FC<FuncProps> = (props) => {
  const editorRef = useRef(null);

  function HandleChange() {
    if (editorRef.current != null) {
      const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
      let p: Preprocessor = new Preprocessor();
      //marked.use({lexer: {customLexer: p.handleSlides }});
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
