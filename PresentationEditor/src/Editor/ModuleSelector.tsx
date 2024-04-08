import React, { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { SlideElement } from "../Model/PresentationModel";
import Preview from "./Preview";
import SpeakerNotesModule from "./SpeakerNotesModule";



interface ModuleSelectorProps {
    moduleName: string;
    editorData: string;
    setEditorData: React.Dispatch<React.SetStateAction<string>>
    slides: SlideElement[];
    setSlides: React.Dispatch<React.SetStateAction<SlideElement[]>>;
    selectedSlideIndex: number;
    setSelectedSlideIndex: React.Dispatch<React.SetStateAction<number>>;
    fetchHtml: () => string;
    fetchJson: () => string;
    speakerNoteData: string;
    setSpeakerNoteData: React.Dispatch<React.SetStateAction<string>>;
    speakerNotes: string[];
    setSpeakerNotes: React.Dispatch<React.SetStateAction<string[]>>;
    selectedSpeakerNoteIndex: number;
    setSelectedSpeakerNoteIndex: React.Dispatch<React.SetStateAction<number>>;
}


const ModuleSelector: React.FC<ModuleSelectorProps> = ({moduleName, editorData, setEditorData, slides, setSlides, selectedSlideIndex, setSelectedSlideIndex, fetchHtml, fetchJson, speakerNoteData, setSpeakerNoteData, speakerNotes, setSpeakerNotes, selectedSpeakerNoteIndex, setSelectedSpeakerNoteIndex}) => {
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [selectedModuleName, setSelectedModuleName] = useState<string>(moduleName);
    const modules = ["editor", "preview", "speakerNotes"];
    useEffect(() => {
        selectModule();
    }, [selectedModuleName, moduleName, slides, selectedSlideIndex, editorData, speakerNoteData, selectedSpeakerNoteIndex]);

    function selectModule() {
        switch (selectedModuleName) {
            case "editor": 
                setSelectedModule(<EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} />);
            break;
            case "preview":
                setSelectedModule(<Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />)
            break; 
            case "speakerNotes":
                setSelectedModule(<SpeakerNotesModule data={speakerNoteData} setSpeakerNoteData={setSpeakerNoteData} speakerNotes={speakerNotes} setSpeakerNotes={setSpeakerNotes} selectedSpeakerNoteIndex={selectedSpeakerNoteIndex} setSelectedSpeakerNoteIndex={setSelectedSpeakerNoteIndex}/>);
            break;
        }
    }
    return (
        <>
            <select name="modules" onChange={(e) => { setSelectedModuleName(e.target.value); }}>
                {modules.map((module) => (
                    <option key={module} value={module}>
                        {module}
                    </option>
                ))}
            </select>
            {selectedModule && selectedModule}
        </>
    );
}

export default ModuleSelector;