import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useColorMode } from "./ThemeContext";

interface EditorProps {
    data: string;
    onEditorChange(editorData: string): void;
}

const EditorContainer: React.FC<EditorProps> = ({ data, onEditorChange }) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const { mode } = useColorMode();

    function handleMount(editor: any) {
        editor.onDidChangeModelContent(() => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                onEditorChange(editor.getValue());
            }, 1000);
        });
    }

    return (
        <Editor
            value={data}
            height={"100%"}
            defaultLanguage="markdown"
            language="markdown"
            onMount={handleMount}
            theme={mode === "light" ? "vs-light" : "vs-dark"}
            options={{
                minimap: { enabled: false },
                wordWrap: "on",
                scrollbar: {
                    vertical: "auto",
                    horizontal: "auto",
                    handleMouseWheel: true,
                    useShadows: false,
                    alwaysConsumeMouseWheel: false,
                },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                overviewRulerLanes: 0,
            }}
        />
    );
};

export default EditorContainer;
