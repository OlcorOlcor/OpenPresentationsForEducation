import React from 'react';
import Editor from '@monaco-editor/react';

function EditorContainer() {
    return (
        <Editor height="100%" defaultLanguage="Markdown" />
    );
}

export default EditorContainer;