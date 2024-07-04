import { Box, Button, ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Constraints, Metadata } from "../Model/PresentationTypes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowRight } from "@mui/icons-material";
import ConstraintsDialog from "./ConstraintsDialog";

interface MenuProps {
    importPresentation(file: File): void;
    exportPresentationAsJson(): void;
    exportPresentationAsReveal(): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
}

const Menu: React.FC<MenuProps> = ({
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
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = React.useRef<HTMLLIElement>(null);
    const menuRef = React.useRef<HTMLButtonElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const prevExportOpen = React.useRef(exportOpen);
    const prevMenuOpen = React.useRef(menuOpen);
    React.useEffect(() => {
      if (prevExportOpen.current === true && exportOpen === false) {
        anchorRef.current!.focus();
      }
  
      prevExportOpen.current = exportOpen;
    }, [exportOpen]);
  
    React.useEffect(() => {
        if (prevMenuOpen.current === true && menuOpen === false) {
          anchorRef.current!.focus();
        }
    
        prevMenuOpen.current = menuOpen;
      }, [menuOpen]);

    function openMetadata() {
        setMetadataDialogOpen(true);
    }

    function openConstraints() {
        setConstraintsDialogOpen(true);
    }

    const handleExportToggle = () => {
        setExportOpen(!exportOpen);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    const handleExportClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setExportOpen(false);
    };

    const handleMenuClose = (event: Event | React.SyntheticEvent) => {
        if (menuRef.current && menuRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setMenuOpen(false);
    }

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

    function exportJson() {
        exportPresentationAsJson();
        setExportOpen(false);
    }

    function exportReveal() {
        exportPresentationAsReveal();
        setExportOpen(false);
    }

    return (
        <Grid container spacing={4} style={{marginBottom: "10px"}}>
            <Grid item>
                <Button 
                    ref={menuRef}
                    variant="contained"
                    onClick={handleMenuToggle}
                    aria-controls={menuOpen ? 'composition-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                    aria-haspopup="true"
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Menu
                </Button>
                <Popper open={menuOpen} anchorEl={menuRef.current} role={undefined} placement="bottom-start" transition disablePortal style={{zIndex: 2}}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleMenuClose}>
                                <MenuList autoFocusItem={exportOpen} id="composition-menu" aria-labelledby="composition-button">
                                    <MenuItem onClick={openMetadata}>Manage metadata</MenuItem>
                                    <MenuItem onClick={openConstraints}>Manage slide constraints</MenuItem>
                                    <MenuItem onClick={handleImportClick}>Import</MenuItem>
                                    <MenuItem onClick={handleExportToggle} ref={anchorRef}>Export <Box sx={{ marginLeft: 'auto' }}><KeyboardArrowRight /></Box></MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                </Popper>
                <Popper open={exportOpen} anchorEl={anchorRef.current} role={undefined} placement="right-start" transition disablePortal style={{zIndex: 2}}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin: placement === 'right-start' ? 'left top' : 'left bottom',
                        }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleExportClose}>
                            <MenuList autoFocusItem={exportOpen} id="composition-menu" aria-labelledby="composition-button">
                                <MenuItem onClick={exportJson}>Export JSON</MenuItem>
                                <MenuItem onClick={exportReveal}>Export Reveal</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </Grid>
            <input
                    type="file"
                    id="fileInput"
                    style={{display: "none"}}
                    onChange={handleFileChange}
                    ref={fileInputRef}
            />
            <MetadataDialog dialogOpen={metadataDialogOpen} setDialogOpen={setMetadataDialogOpen} metadata={metadata} setMetadata={setMetadata} />
            <ConstraintsDialog dialogOpen={constraintsDialogOpen} setDialogOpen={setConstraintsDialogOpen} constraints={constraints} setConstraints={setConstraints}></ConstraintsDialog>
    </Grid>
    );
};

export default Menu;
