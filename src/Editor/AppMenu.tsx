import { AppBar, Box, Button, MenuItem, Toolbar, Menu, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Constraints, ImageFile, Metadata, Styles } from "../Model/PresentationTypes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ConstraintsDialog from "./ConstraintsDialog";
import MenuIcon from '@mui/icons-material/Menu';
import LaneDialog from "./LaneDialog";
import { Lane } from "../Model/PresentationModel";
import { ViewMode } from "./ViewMode";
import ImageDialog from "./ImageDialog";
import StyleURLDialog from "./StyleURLDialog";
import { useColorMode } from './ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CustomExportDialog from "./CustomExportDialog";
import ImportPresentationURLDialog from "./ImportPresentationURLDialog";
import SaveToURLDialog from "./ExportPresentationURLDialog";
import RevealExportDialog from "./RevealExportDialog";

interface AppMenuProps {
    importPresentation(file: File): void;
    exportPresentationAsJson(): void;
    exportPresentationAsReveal(main: Lane, secondary: Lane): void;
    exportPresentationAsHtml(js: string): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
    constraints: Constraints;
    setConstraints: React.Dispatch<React.SetStateAction<Constraints>>;
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    addLane(): void;
    deleteLane(index: number): void;
    newProject(): void;
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    images: ImageFile[];
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    exportCss(): void;
    newStyle(file: File): void;
    setStyle: React.Dispatch<React.SetStateAction<Styles>>;
    exportPresentationToURL(url: string): void;
    loadTutorial(): void;
}

const AppMenu: React.FC<AppMenuProps> = ({
    importPresentation,
    exportPresentationAsJson,
    exportPresentationAsReveal,
    exportPresentationAsHtml,
    metadata,
    setMetadata,
    constraints,
    setConstraints,
    lanes,
    setLanes,
    addLane,
    deleteLane,
    newProject,
    setViewMode,
    images,
    setImages,
    exportCss,
    newStyle,
    setStyle,
    exportPresentationToURL,
    loadTutorial
}) => {
    const [metadataDialogOpen, setMetadataDialogOpen] = useState<boolean>(false);
    const [constraintsDialogOpen, setConstraintsDialogOpen] = useState<boolean>(false);
    const [lanesDialogOpen, setLanesDialogOpen] = useState<boolean>(false);
    const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
    const [styleURLDialogOpen, setStyleURLDialogOpen] = useState<boolean>(false);
    const [customExportOpen, setCustomExportOpen] = useState(false);
    const [exportRevealDialogOpen, setExportRevealDialogOpen] = useState(false);
    const [presentationURLDialogOpen, setPresentationURLDialogOpen] = useState(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [anchorElSave, setAnchorElSave] = useState(null);
    const [anchorElNew, setAnchorElNew] = useState(null);
    const [anchorElFile, setAnchorElFile] = useState(null);
    const [anchorElView, setAnchorElView] = useState(null);
    const [anchorElExport, setAnchorElExport] = useState(null);
    const [anchorElStyles, setAnchorElStyles] = useState(null);
    const [anchorElOpenFile, setAnchorElOpenFile] = useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileSubmenuAnchorEl, setMobileSubmenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({ file: null, view: null });

    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const styleInputRef = React.useRef<HTMLInputElement>(null);
    const { mode, toggleColorMode } = useColorMode();

    function handleExportClose() {
        setAnchorElExport(null);
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    function handleMobileMenuClose() {
        setMobileMenuAnchorEl(null);
        setMobileSubmenuAnchorEl({ file: null, view: null });
    };

    const handleSubmenuOpen = (menuKey: string) => (event: React.MouseEvent<HTMLElement>) => {
        setMobileSubmenuAnchorEl(prev => ({ ...prev, [menuKey]: event.currentTarget }));
    };

    const handleSubmenuClose = (menuKey: string) => {
        setMobileSubmenuAnchorEl(prev => ({ ...prev, [menuKey]: null }));
    };

    function openMetadata() {
        setMetadataDialogOpen(true);
    }

    function openConstraints() {
        setConstraintsDialogOpen(true);
    }

    function openLanes() {
        setLanesDialogOpen(true);
    }

    function openImages() {
        setImageDialogOpen(true);
    }

    function handleSaveOpen() {
        setSaveDialogOpen(true);
    }

    function handleSaveClose() {
        setAnchorElSave(null);
    }

    function handleOpenCustomExport() {
        setCustomExportOpen(true);
    };

    function handleCloseCustomExport() {
        setCustomExportOpen(false);
    };

    function handleOpenFileClose() {
        setAnchorElOpenFile(null);
    }

    function handleOpenFileClick(event: any) {
        setAnchorElOpenFile(event.currentTarget);
    }

    function handleOpenRevealExport() {
        setExportRevealDialogOpen(true);
    }

    function handleCloseRevealExport() {
        setExportRevealDialogOpen(false);
    }

    function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            importPresentation(file);
        }
    }

    function handleStyleFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            newStyle(file);
        }
    }

    function handleImportClick() {
        handleFileClose();
        if (fileInputRef.current != null) {
            fileInputRef.current.click();
        }
    }

    function handleStylesImportClick() {
        handleFileClose();
        handleStylesClose();
        if (styleInputRef.current != null) {
            styleInputRef.current.click();
        }
    }

    function handleStylesImportURLClick() {
        setStyleURLDialogOpen(true);
    }

    function exportJson() {
        exportPresentationAsJson();
        setExportOpen(false);
    }

    function handleSaveClick(event: any) {
        setAnchorElSave(event.currentTarget);
    }

    function handleFileClick(event: any) {
        setAnchorElFile(event.currentTarget);
    };

    function handleExportClick(event: any) {
        setAnchorElExport(event.currentTarget);
    }

    function handleStylesClick(event: any) {
        setAnchorElStyles(event.currentTarget);
    }

    function handleFileClose() {
        setAnchorElFile(null);
    };

    function newFile() {
        handleFileClose();
        newProject();
    }

    function handleViewClick(event: any) {
        setAnchorElView(event.currentTarget);
    };

    function handleViewClose() {
        setAnchorElView(null);
    };

    function handleStylesClose() {
        setAnchorElStyles(null);
    }

    function handleNewClick(event: any) {
        setAnchorElNew(event.currentTarget);
    }
    
    function handleNewClose() {
        setAnchorElNew(null);
    }

    return (
        <AppBar position="static" style={{ padding: "0 1%" }}>
            <Toolbar disableGutters sx={{ justifyContent: "space-between", width: "100%" }}>
                <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: "center", marginRight: "3%", whiteSpace: "nowrap" }}>
                    <a href=".">Open Slide Editor</a>
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === "light" ? (<DarkModeIcon />) : (<LightModeIcon/>)}
                </IconButton>
                    <Button color="inherit" onClick={handleFileClick} aria-controls="file-menu" aria-haspopup="true" endIcon={<KeyboardArrowDownIcon />}>
                        File
                    </Button>
                    <Menu id="file-menu" anchorEl={anchorElFile} open={Boolean(anchorElFile)} onClose={handleFileClose}>
                        <MenuItem onClick={handleNewClick}>New <KeyboardArrowRightIcon style={{ marginLeft: "auto" }}/></MenuItem>
                        <Menu id="new-menu" anchorEl={anchorElNew} open={Boolean(anchorElNew)} onClose={handleNewClose} anchorOrigin={{ vertical: "top", horizontal: "right"}} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                            <MenuItem onClick={() => { newFile(); handleNewClose(); }}>Empty</MenuItem>
                            <MenuItem onClick={() => { loadTutorial(); handleNewClose(); }}>Tutorial</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleOpenFileClick}>Open <KeyboardArrowRightIcon style={{ marginLeft: "auto" }}/></MenuItem>
                        <Menu id="open-menu" anchorEl={anchorElOpenFile} open={Boolean(anchorElOpenFile)} onClose={handleOpenFileClose} anchorOrigin={{ vertical: "top", horizontal: "right"}} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                            <MenuItem onClick={handleImportClick}>From file</MenuItem>
                            <MenuItem onClick={() => { setPresentationURLDialogOpen(true); handleOpenFileClose(); }}>From URL</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleSaveClick}>Save <KeyboardArrowRightIcon style={{ marginLeft: "auto" }}/></MenuItem>
                        <Menu id="save-menu" anchorEl={anchorElSave} open={Boolean(anchorElSave)} onClose={handleSaveClose} anchorOrigin={{ vertical: "top", horizontal: "right"}} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                            <MenuItem onClick={exportJson}>Save as File</MenuItem>
                            <MenuItem onClick={handleSaveOpen}>Save to URL</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleStylesClick}>Import style <KeyboardArrowRightIcon style={{ marginLeft: "auto" }}/></MenuItem>
                        <Menu id="styles-menu" anchorEl={anchorElStyles} open={Boolean(anchorElStyles)} onClose={handleStylesClose} anchorOrigin={{ vertical: "top", horizontal: "right"}} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                            <MenuItem onClick={handleStylesImportClick}>From file</MenuItem>
                            <MenuItem onClick={handleStylesImportURLClick}>From URL</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleExportClick}>Export <KeyboardArrowRightIcon style={{ marginLeft: "auto" }}/></MenuItem>
                        <Menu id="export-menu" anchorEl={anchorElExport} open={Boolean(anchorElExport)} onClose={handleExportClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                            <MenuItem onClick={() => {handleExportClose(); handleOpenRevealExport();}}>Reveal to Reveal</MenuItem>
                            <MenuItem onClick={() => { handleExportClose(); handleOpenCustomExport();}}>Export to plain HTML</MenuItem>
                            <MenuItem onClick={exportCss}>Export styles</MenuItem>
                        </Menu>
                    </Menu>
                    <Button color="inherit" onClick={handleViewClick} aria-controls="view-menu" aria-haspopup="true" endIcon={<KeyboardArrowDownIcon />}>
                        View
                    </Button>
                    <Menu id="view-menu" anchorEl={anchorElView} open={Boolean(anchorElView)} onClose={handleViewClose}>
                        <MenuItem onClick={() => {setViewMode(ViewMode.SINGLE); handleViewClose();}}>Single view</MenuItem>
                        <MenuItem onClick={() => {setViewMode(ViewMode.SPLIT); handleViewClose();}}>Side by side</MenuItem>
                    </Menu>
                    <Button color="inherit" onClick={openLanes}>Lanes</Button>
                    <Button color="inherit" onClick={openMetadata}>Metadata</Button>
                    <Button color="inherit" onClick={openConstraints}>Constraints</Button>
                    <Button color="inherit" onClick={openImages}>Images</Button>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size="large" color="inherit" aria-label="open menu" onClick={handleMobileMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <Menu anchorEl={mobileMenuAnchorEl} open={isMobileMenuOpen} onClose={handleMobileMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
            <MenuItem onClick={handleSubmenuOpen("file")}> File <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /></MenuItem>
            <Menu anchorEl={mobileSubmenuAnchorEl.file} open={Boolean(mobileSubmenuAnchorEl.file)} onClose={() => handleSubmenuClose("file")} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem onClick={handleNewClick}>New <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /></MenuItem>
                <Menu id="new-menu" anchorEl={anchorElNew} open={Boolean(anchorElNew)} onClose={handleNewClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MenuItem onClick={() => { newFile(); handleNewClose(); handleMobileMenuClose(); }}>Empty</MenuItem>
                    <MenuItem onClick={() => { loadTutorial(); handleNewClose(); handleMobileMenuClose(); }}>Tutorial</MenuItem>
                </Menu>
                <MenuItem onClick={handleOpenFileClick}>Open <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /></MenuItem>
                <Menu id="open-menu" anchorEl={anchorElOpenFile} open={Boolean(anchorElOpenFile)} onClose={handleOpenFileClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MenuItem onClick={handleImportClick}>From file</MenuItem>
                    <MenuItem onClick={() => { setPresentationURLDialogOpen(true); handleOpenFileClose(); }}>From URL</MenuItem>
                </Menu>
                <MenuItem onClick={handleSaveClick}>Save <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /></MenuItem>
                <Menu id="save-menu" anchorEl={anchorElSave} open={Boolean(anchorElSave)} onClose={handleSaveClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MenuItem onClick={() => {exportJson(); handleMobileMenuClose();}}>Save as File</MenuItem>
                    <MenuItem onClick={() => {handleSaveOpen(); handleMobileMenuClose();}}>Save to URL</MenuItem>
                </Menu>
                <MenuItem onClick={handleSubmenuOpen("style")}>Import style <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /></MenuItem>
                <Menu anchorEl={mobileSubmenuAnchorEl.style} open={Boolean(mobileSubmenuAnchorEl.style)} onClose={() => handleSubmenuClose("style")} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MenuItem onClick={() => { handleStylesImportClick(); handleMobileMenuClose(); }}>From file</MenuItem>
                    <MenuItem onClick={() => { handleStylesImportURLClick(); handleMobileMenuClose(); }}>From URL</MenuItem>
                </Menu>
                <MenuItem onClick={handleSubmenuOpen("export")}>Export<KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} /> </MenuItem>
                <Menu anchorEl={mobileSubmenuAnchorEl.export} open={Boolean(mobileSubmenuAnchorEl.export)} onClose={() => handleSubmenuClose("export")} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MenuItem onClick={() => {handleExportClose(); handleOpenRevealExport(); handleMobileMenuClose();}}>Reveal to Reveal</MenuItem>
                    <MenuItem onClick={() => { handleExportClose(); handleOpenCustomExport(); handleMobileMenuClose();}}>Export to plain HTML</MenuItem>
                    <MenuItem onClick={() => { exportCss(); handleMobileMenuClose(); }}>Export styles</MenuItem>
                </Menu>
            </Menu>
            <MenuItem onClick={handleSubmenuOpen("view")}>
                View <KeyboardArrowLeftIcon style={{ marginLeft: "auto" }} />
            </MenuItem>
            <Menu anchorEl={mobileSubmenuAnchorEl.view} open={Boolean(mobileSubmenuAnchorEl.view)} onClose={() => handleSubmenuClose("view")} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem onClick={() => { setViewMode(ViewMode.SINGLE); handleMobileMenuClose(); }}>Single View</MenuItem>
                <MenuItem onClick={() => { setViewMode(ViewMode.SPLIT); handleMobileMenuClose(); }}>Side by Side</MenuItem>
            </Menu>
                <MenuItem onClick={() => { openLanes(); handleMobileMenuClose(); }}>Lanes</MenuItem>
                <MenuItem onClick={() => { openMetadata(); handleMobileMenuClose(); }}>Metadata</MenuItem>
                <MenuItem onClick={() => { openConstraints(); handleMobileMenuClose(); }}>Constraints</MenuItem>
                <MenuItem onClick={() => { openImages(); handleMobileMenuClose(); }}>Images</MenuItem>
            </Menu>

            <MetadataDialog dialogOpen={metadataDialogOpen} setDialogOpen={setMetadataDialogOpen} metadata={metadata} setMetadata={setMetadata} />
            <ConstraintsDialog dialogOpen={constraintsDialogOpen} setDialogOpen={setConstraintsDialogOpen} constraints={constraints} setConstraints={setConstraints} />
            <LaneDialog lanes={lanes} dialogOpen={lanesDialogOpen} setDialogOpen={setLanesDialogOpen} setLanes={setLanes} addLane={addLane} deleteLane={deleteLane} selectLane={(index: number) => { }} />
            <ImageDialog dialogOpen={imageDialogOpen} setDialogOpen={setImageDialogOpen} images={images} setImages={setImages} />
            <StyleURLDialog dialogOpen={styleURLDialogOpen} setDialogOpen={setStyleURLDialogOpen} setStyle={setStyle} />
            <CustomExportDialog open={customExportOpen} onClose={handleCloseCustomExport} onExport={exportPresentationAsHtml} />
            <ImportPresentationURLDialog dialogOpen={presentationURLDialogOpen} setDialogOpen={setPresentationURLDialogOpen} importPresentation={importPresentation}/>
            <SaveToURLDialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} savePresentation={exportPresentationToURL} />
            <RevealExportDialog lanes={lanes} open={exportRevealDialogOpen} onClose={handleCloseRevealExport} exportPresentationAsReveal={exportPresentationAsReveal} />
            
            <input type="file" accept=".json" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
            <input type="file" accept=".css" style={{ display: "none" }} ref={styleInputRef} onChange={handleStyleFileChange} />
        </AppBar>
    );
};

export default AppMenu;
