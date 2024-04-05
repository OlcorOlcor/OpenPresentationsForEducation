import React, { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { SlideElement } from "../Model/PresentationModel";
import Preview from "./Preview";
import SpeakerNoteEditorContainer from "./SpeakerNoteEditorContainer";


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
}


const ModuleSelector: React.FC<ModuleSelectorProps> = ({moduleName, editorData, setEditorData, slides, setSlides, selectedSlideIndex, setSelectedSlideIndex, fetchHtml, fetchJson, speakerNoteData, setSpeakerNoteData}) => {
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [selectedModuleName, setSelectedModuleName] = useState<string>(moduleName);
    const modules = ["editor", "preview", "speakerNotes"];
    useEffect(() => {
        selectModule();
    }, [selectedModuleName, moduleName, slides, selectedSlideIndex, editorData]);

    function selectModule() {
        switch (selectedModuleName) {
            case "editor": 
                setSelectedModule(<EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} />);
            break;
            case "preview":
                setSelectedModule(<Preview fetchHtml={fetchHtml} fetchJson={fetchJson} />)
            break; 
            case "speakerNotes":
                setSelectedModule(<SpeakerNoteEditorContainer data={speakerNoteData} setSpeakerNoteData={setSpeakerNoteData}/>);
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