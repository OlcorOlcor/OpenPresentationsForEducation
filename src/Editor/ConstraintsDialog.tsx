import { Button, Dialog, FormControl, Grid, TextField } from "@mui/material";
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

    function handleSubmit(words: number | null, characters: number | null, images: number | null, links: number | null, headings: number | null, bulletPoints: number | null, tables: number | null): void {
        setConstraints({words: words, characters: characters, images: images, links: links, headings: headings, bullet_points: bulletPoints, tables: tables});
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
        setDialogOpen(false);
    }

    return (
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <Grid container>
                <Grid item>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Words"
                            name="words"
                            value={words}
                            onChange={handleWordsChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Characters"
                            name="characters"
                            value={characters}
                            onChange={handleCharactersChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Images"
                            name="images"
                            value={images}
                            onChange={handleImagesChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Links"
                            name="links"
                            value={links}
                            onChange={handleLinksChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Headings"
                            name="headings"
                            value={headings}
                            onChange={handleHeadingsChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Bullet points"
                            name="bulletPoints"
                            value={bulletPoints}
                            onChange={handleBulletPointsChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Tables"
                            name="tables"
                            value={tables}
                            onChange={handleTablesChange}
                            variant="outlined"
                            inputProps={{type: "number"}}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit(words, characters, images, links, headings, bulletPoints, tables)}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ConstraintsDialog;