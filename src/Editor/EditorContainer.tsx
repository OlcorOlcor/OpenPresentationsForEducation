import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

interface EditorProps {
    data: string;
    onEditorChange(editorData: string): void;
}

const EditorContainer: React.FC<EditorProps> = ({ data, onEditorChange }) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);

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
            defaultLanguage="markdown"
            language="markdown"
            onMount={handleMount}
            options={{
                minimap: { enabled: false }
            }}
        />
    );
};

export default EditorContainer;
