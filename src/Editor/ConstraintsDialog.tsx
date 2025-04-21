import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Constraints } from "../Model/PresentationTypes";

interface ConstraintsDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
}

const ConstraintsDialog: React.FC<ConstraintsDialogProps> = ({dialogOpen, setDialogOpen, constraints, setConstraints}) => {    
    const [words, setWords] = React.useState<number | null>(constraints.words);
    const [characters, setCharacters] = React.useState<number | null>(constraints.characters);
    const [images, setImages] = React.useState<number | null>(constraints.images);
    const [links, setLinks] = React.useState<number | null>(constraints.links);
    const [headings, setHeadings] = React.useState<number | null>(constraints.headings);
    const [bulletPoints, setBulletPoints] = React.useState<number | null>(constraints.bullet_points);
    const [tables, setTables] = React.useState<number | null>(constraints.tables);

    useEffect(() => {
        setWords(constraints.words);
        setCharacters(constraints.characters);
        setImages(constraints.images);
        setLinks(constraints.links);
        setHeadings(constraints.headings);
        setBulletPoints(constraints.bullet_points);
        setTables(constraints.tables);
    }, [constraints])

    function handleSubmit(): void {
        setConstraints({words: words, characters: characters, images: images, links: links, headings: headings, bullet_points: bulletPoints, tables: tables});
        setDialogOpen(false);
    }

    function handleWordsChange(e: any): void {
        setWords(+e.target.value);
    }

    function handleCharactersChange(e: any): void {
        setCharacters(+e.target.value);
    }

    function handleImagesChange(e: any): void {
        setImages(+e.target.value);
    }

    function handleLinksChange(e: any): void {
        setLinks(+e.target.value);
    }

    function handleHeadingsChange(e: any): void {
        setHeadings(+e.target.value);
    }

    function handleBulletPointsChange(e: any): void {
        setBulletPoints(+e.target.value);
    }

    function handleTablesChange(e: any): void {
        setTables(+e.target.value);
    }

    function handleClose() {
        setWords(constraints.words);
        setCharacters(constraints.characters);
        setLinks(constraints.links);
        setImages(constraints.images);
        setTables(constraints.tables);
        setHeadings(constraints.headings);
        setBulletPoints(constraints.bullet_points);
        setDialogOpen(false);
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
        >
            <DialogTitle>Constraints</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can set contrainst that will be applied to your slides.
                </DialogContentText>
                <TextField
                    type="text"
                    label="Words"
                    name="words"
                    value={words}
                    onChange={handleWordsChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Characters"
                    name="characters"
                    value={characters}
                    onChange={handleCharactersChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Images"
                    name="images"
                    value={images}
                    onChange={handleImagesChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Links"
                    name="links"
                    value={links}
                    onChange={handleLinksChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Headings"
                    name="headings"
                    value={headings}
                    onChange={handleHeadingsChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Bullet points"
                    name="bulletPoints"
                    value={bulletPoints}
                    onChange={handleBulletPointsChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
                <TextField
                    label="Tables"
                    name="tables"
                    value={tables}
                    onChange={handleTablesChange}
                    variant="standard" 
                    margin="dense"
                    fullWidth
                    inputProps={{type: "number"}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConstraintsDialog;