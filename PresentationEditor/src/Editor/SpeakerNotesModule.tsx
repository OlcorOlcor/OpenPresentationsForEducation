import Grid from "@mui/material/Grid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EditorContainer from "./EditorContainer";
import SelectContainer from "./SelectContainer";

interface SpeakerNotesModuleProps {
    data: string;
    setSpeakerNoteData: React.Dispatch<React.SetStateAction<string>>;
    speakerNotes: string[];
    setSpeakerNotes: React.Dispatch<React.SetStateAction<string[]>>;
    selectedSpeakerNoteIndex: number;
    setSelectedSpeakerNoteIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SpeakerNotesModule: React.FC<SpeakerNotesModuleProps> = ({data, setSpeakerNoteData, speakerNotes, setSpeakerNotes, selectedSpeakerNoteIndex, setSelectedSpeakerNoteIndex}) => {

    useEffect(() => {
        updateEditor();
    }, [selectedSpeakerNoteIndex]);

    useEffect(() => {
        regenerateSpeakerNote();
    }, [data]);

    function updateEditor() {
        setSpeakerNoteData(speakerNotes[selectedSpeakerNoteIndex]);
    }

    function editorChange(timeout: NodeJS.Timeout, editor: any): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSpeakerNoteData(editor.getValue());
        }, 2000);
    }

    function regenerateSpeakerNote(): void {
        setSpeakerNotes(prevNotes => {
            const updatedNotes = [...prevNotes];
            updatedNotes[selectedSpeakerNoteIndex] = data;
            return updatedNotes;
        })
    }


    function newSpeakerNote() {
        setSpeakerNotes(prevNotes => {
            let newSpeakerNote = "";
            const newNotes = [...prevNotes, newSpeakerNote];
            setSelectedSpeakerNoteIndex(newNotes.length - 1);
            return newNotes;
        })
    }

    function selectSpeakerNote(index: number) {
        setSelectedSpeakerNoteIndex(index);
    }

    return (
        <Grid container direction="column" spacing={1} style={{ height: "100%" }}>
            <Grid item xs={3}>
                <SelectContainer onAdd={newSpeakerNote} elements={speakerNotes} onSelect={selectSpeakerNote}/>  
            </Grid>
            <Grid item xs={8}>
                <EditorContainer data={data} onEditorChange={editorChange} />
            </Grid>
        </Grid>
    )
}

export default SpeakerNotesModule;