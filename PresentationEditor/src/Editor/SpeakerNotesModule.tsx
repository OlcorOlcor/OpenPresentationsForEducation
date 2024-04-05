import Grid from "@mui/material/Grid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EditorContainer from "./EditorContainer";

interface SpeakerNotesModuleProps {
    data: string;
    setSpeakerNoteData: React.Dispatch<React.SetStateAction<string>>;
}

const SpeakerNotesModule: React.FC<SpeakerNotesModuleProps> = ({data, setSpeakerNoteData}) => {

    function editorChange(timeout: NodeJS.Timeout, editor: any): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSpeakerNoteData(editor.getValue());
        });
    }
    return (
        <Grid container direction="column" spacing={1} style={{ height: "100%" }}>
            <Grid item xs={3}>
                <div>TODO</div>    
            </Grid>
            <Grid item xs={8}>
                <EditorContainer data={data} onEditorChange={editorChange} />
            </Grid>
        </Grid>
    )
}

export default SpeakerNotesModule;