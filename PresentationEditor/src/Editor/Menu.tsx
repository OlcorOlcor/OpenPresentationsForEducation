import { Button, ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Constraints, Metadata } from "../Model/PresentationTypes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConstraintsDialog from "./ConstraintsDialog";

interface MenuProps {
    addLane(): void;
    swapLane(): void;
    importPresentation(file: File): void;
    exportPresentationAsJson(): void;
    exportPresentationAsReveal(): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
}

const Menu: React.FC<MenuProps> = ({
    addLane,
    swapLane,
    importPresentation,
    exportPresentationAsJson,
    exportPresentationAsReveal,
    metadata,
    setMetadata,
    constraints,
    setConstraints
}) => {
    const [metadataDialogOpen, setMetadataDialogOpen] = useState<boolean>(false);
    const [constraintsDialogOpen, setConstraintsDialogOpen] = useState<boolean>(false);
    const [exportOpen, setExportOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const prevExportOpen = React.useRef(exportOpen);
    React.useEffect(() => {
      if (prevExportOpen.current === true && exportOpen === false) {
        anchorRef.current!.focus();
      }
  
      prevExportOpen.current = exportOpen;
    }, [exportOpen]);
  
    function openMetadata() {
        setMetadataDialogOpen(true);
    }

    function openConstraints() {
        setConstraintsDialogOpen(true);
    }

    const handleExportToggle = () => {
        setExportOpen(!exportOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setExportOpen(false);
    };

    function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            importPresentation(file);
        }
    }

    function handleImportClick() {
        if (fileInputRef.current != null) {
           fileInputRef.current.click();
        }
    }

    return (
        <Grid container spacing={4} style={{marginBottom: "10px"}}>
            <Grid item>
                <Button variant="contained" onClick={addLane}>
                    Add Lane
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={swapLane}>
                    Swap Lanes
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={openMetadata}>
                    Manage metadata
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={openConstraints}>
                    Manage slide constraints
                </Button>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    id="fileInput"
                    style={{display: "none"}}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleImportClick}
                >
                    Import
                </Button>
            </Grid>
            <Grid item>
                <Button
                ref={anchorRef}
                variant="contained"
                id="composition-button"
                aria-controls={exportOpen ? 'composition-menu' : undefined}
                aria-expanded={exportOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleExportToggle}
                endIcon={<KeyboardArrowDownIcon />}
                >
                Export
                </Button>
                <Popper open={exportOpen} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal style={{zIndex: 2}}>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={exportOpen} id="composition-menu" aria-labelledby="composition-button">
                            <MenuItem onClick={exportPresentationAsJson}>Export JSON</MenuItem>
                            <MenuItem onClick={exportPresentationAsReveal}>Export Reveal</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </Grid>
            <MetadataDialog dialogOpen={metadataDialogOpen} setDialogOpen={setMetadataDialogOpen} metadata={metadata} setMetadata={setMetadata} />
            <ConstraintsDialog dialogOpen={constraintsDialogOpen} setDialogOpen={setConstraintsDialogOpen} constraints={constraints} setConstraints={setConstraints}></ConstraintsDialog>
    </Grid>
    );
};

export default Menu;
