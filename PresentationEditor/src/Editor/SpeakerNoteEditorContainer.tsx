import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

interface SpeakerNoteEditorProps {
    data: string;
    setSpeakerNoteData: React.Dispatch<React.SetStateAction<string>>;
}

const SpeakerNoteEditorContainer: React.FC<SpeakerNoteEditorProps> = ({data, setSpeakerNoteData}) => {
    let timeout: NodeJS.Timeout;
    function handleMount(editor: any) {
        editor.onDidChangeModelContent(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setSpeakerNoteData(editor.getValue());
            });
        });
    }
    
    return (
        <Editor height="90%" value={data} defaultLanguage="Markdown" onMount={handleMount} />
    );
}

export default SpeakerNoteEditorContainer;