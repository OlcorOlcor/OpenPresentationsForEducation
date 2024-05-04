import { Button, Checkbox, Dialog, DialogTitle, FormControlLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { PresentationParser } from "../Model/PresentationParser";
import { Lane, Presentation, SlideElement } from "../Model/PresentationModel";
import { MarkdownVisitor } from "../Model/Visitors";

interface EditLaneDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    setSlideMode: React.Dispatch<React.SetStateAction<boolean>>;
    slides: SlideElement[];
    setSlides: React.Dispatch<React.SetStateAction<SlideElement[]>>;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    editorView: boolean;
    setEditorView: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditLaneDialog: React.FC<EditLaneDialogProps> = ({dialogOpen, setDialogOpen, lanes, setLanes, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex, setSlideMode, setSlides, setEditorData}) => {
    
    const [dialogLane, setDialogLane] = useState<Lane>(lanes[selectedLaneIndex]);
    
    useEffect(() => {
        setDialogLane(lanes[selectedLaneIndex]);
    }, [selectedLaneIndex])

    function deleteLane() {
        setLanes(prev => {
            let updated = [...prev];
            updated.splice(selectedLaneIndex, 1);
            setDialogOpen(false);

            if (updated.length <= 1) {
                setSelectedLaneIndex(-1);
            } else if (selectedLaneIndex - 1 === otherLaneIndex) {
                if (selectedLaneIndex <= updated.length) {
                    setSelectedLaneIndex(selectedLaneIndex);
                } else {
                    setSelectedLaneIndex(otherLaneIndex - 1);
                }
            } else {
                setSelectedLaneIndex(selectedLaneIndex - 1);
            }

            return updated;
        })
    }

    function handleClose() {
        setLanes(prev => {
            let updated = [...prev];
            updated[selectedLaneIndex] = dialogLane;
            return updated;
        });
        setSlideMode(dialogLane.outputAsPresentation);
        setDialogOpen(false);
    }

    function handleNameChange(name: string) {
        setDialogLane(prev => ({ ...prev, name: name }));
    };

    function handleOutputTypeChange() {
        setDialogLane(prev => (
            {...prev, outputAsPresentation: !prev.outputAsPresentation}
        ));
    }

    const importFile = (event: ChangeEvent<HTMLInputElement>) => {
        let element = event.target as HTMLInputElement;
        let file = element.files?.[0];
        if (!file) {
          return;
        }
        let reader = new FileReader();
    
        reader.onload = (e) => {
          let content = e.target?.result as string;
          let pp = new PresentationParser(JSON.parse(content));
          let presentation = pp.GetPresentation();
          let parsedSlides = (presentation as Presentation).getSlides();
          setSlides(parsedSlides);
          let visitor = new MarkdownVisitor();
          visitor.visitSlideNode((presentation as Presentation).getSlides()[0]);
          setEditorData(visitor.getResult());
        }
        reader.readAsText(file);
        setDialogOpen(false);
    }


    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Lane settings</DialogTitle>
                <div>
                    <div>
                        <input type="file" id="fileInput" onChange={importFile} />
                    </div>
                    <div>
                        <TextField id="Lane name" variant="standard" label="Name" value={dialogLane.name} onChange={(e) => handleNameChange(e.target.value)}/>
                    </div>
                    <div>
                        <FormControlLabel control={<Checkbox checked={dialogLane.outputAsPresentation}/>} label="Output as presentation" onChange={handleOutputTypeChange}/>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button color="primary" onClick={handleClose}>Confirm</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="error" onClick={deleteLane}>Delete</Button>
                        </Grid>
                    </Grid>
                </div>
        </Dialog>
    )
}

export default EditLaneDialog;