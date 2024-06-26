import { Button, Dialog, FormControl, Grid, TextField } from "@mui/material";
import React from "react";
import { Constraints } from "../Model/PresentationTypes";

interface ConstraintsDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
}

const ConstraintsDialog: React.FC<ConstraintsDialogProps> = ({dialogOpen, setDialogOpen, constraints, setConstraints}) => {    
    const [words, setWords] = React.useState<number>(constraints.words);
    const [characters, setCharacters] = React.useState<number>(constraints.characters);
    const [images, setImages] = React.useState<number>(constraints.images);
    const [links, setLinks] = React.useState<number>(constraints.links);
    const [headings, setHeadings] = React.useState<number>(constraints.headings);
    const [bulletPoints, setBulletPoints] = React.useState<number>(constraints.bullet_points);

    function handleSubmit(words: number, characters: number, images: number, links: number, headings: number, bulletPoints: number): void {
        setConstraints({words: words, characters: characters, images: images, links: links, headings: headings, bullet_points: bulletPoints});
    }

    function handleWordsChange(e: any): void {
        setWords(e.target.value);
    }

    function handleCharactersChange(e: any): void {
        setCharacters(e.target.value);
    }

    function handleImagesChange(e: any): void {
        setImages(e.target.value);
    }

    function handleLinksChange(e: any): void {
        setLinks(e.target.value);
    }

    function handleHeadingsChange(e: any): void {
        setHeadings(e.target.value);
    }

    function handleBulletPointsChange(e: any): void {
        setBulletPoints(e.target.value);
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
                </Grid>
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit(words, characters, images, links, headings, bulletPoints)}>
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