import { AppBar, Box, Button, ClickAwayListener, Container, Grid, Grow, MenuItem, MenuList, Paper, Popper, Toolbar, Menu, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Constraints, Metadata } from "../Model/PresentationTypes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowDownTwoTone, KeyboardArrowRight } from "@mui/icons-material";
import ConstraintsDialog from "./ConstraintsDialog";
import MenuIcon from '@mui/icons-material/Menu';

interface MenuProps {
    importPresentation(file: File): void;
    exportPresentationAsJson(): void;
    exportPresentationAsReveal(): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
}

const AppMenu: React.FC<MenuProps> = ({
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
    const [anchorElFile, setAnchorElFile] = useState(null);
    const [anchorElView, setAnchorElView] = useState(null);
    const anchorFileRef = React.useRef<HTMLButtonElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const prevExportOpen = React.useRef(exportOpen);
    /*
    React.useEffect(() => {
      if (prevExportOpen.current === true && exportOpen === false) {
        anchorRef.current!.focus();
      }
  
      prevExportOpen.current = exportOpen;
    }, [exportOpen]);
    */
    function openMetadata() {
        setMetadataDialogOpen(true);
    }

    function openConstraints() {
        setConstraintsDialogOpen(true);
    }

    const handleExportToggle = () => {
        setExportOpen(!exportOpen);
    };

    /*
    const handleExportClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setExportOpen(false);
    };
    */
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

    function handleFileClick(event: any) {
        setAnchorElFile(event.currentTarget);
    };
    
    function handleFileClose() {
        setAnchorElFile(null);
    };

    function handleViewClick(event: any) {
        setAnchorElView(event.currentTarget);
    };
    
    function handleViewClose() {
        setAnchorElView(null);
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center'}}>
                        Open Slide Editor
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={handleFileClick}
                        aria-controls="file-menu"
                        aria-haspopup="true"
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        File
                    </Button>
                    <Menu
                        id="file-menu"
                        anchorEl={anchorElFile}
                        open={Boolean(anchorElFile)}
                        onClose={handleFileClose}
                    >
                        <MenuItem onClick={handleFileClose}>New</MenuItem>
                        <MenuItem onClick={handleFileClose}>Open</MenuItem>
                        <MenuItem onClick={handleFileClose}>Save</MenuItem>
                    </Menu>
                    <Button
                        color="inherit"
                        onClick={handleViewClick}
                        aria-controls="view-menu"
                        aria-haspopup="true"
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        View
                    </Button>
                    <Menu
                        id="view-menu"
                        anchorEl={anchorElView}
                        open={Boolean(anchorElView)}
                        onClose={handleViewClose}
                    >
                        <MenuItem onClick={handleViewClose}>Single view</MenuItem>
                        <MenuItem onClick={handleViewClose}>Side by side</MenuItem>
                    </Menu>
                    <Button color="inherit">Lanes</Button>
                    <Button color="inherit" onClick={openMetadata}>Metadata</Button>
                    <Button color="inherit" onClick={openConstraints}>Constraints</Button>
                    <Button color="inherit">Export</Button>
                </Box>
            </Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2, display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <MetadataDialog dialogOpen={metadataDialogOpen} setDialogOpen={setMetadataDialogOpen} metadata={metadata} setMetadata={setMetadata} />
            <ConstraintsDialog dialogOpen={constraintsDialogOpen} setDialogOpen={setConstraintsDialogOpen} constraints={constraints} setConstraints={setConstraints} />
        </AppBar>
    );
};

export default AppMenu;
