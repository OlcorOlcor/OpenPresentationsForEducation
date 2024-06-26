import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Metadata } from "../Model/PresentationTypes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface MenuProps {
    addLane(): void;
    swapLane(): void;
    importPresentation(file: File): void;
    exportPresentationAsJson(): void;
    exportPresentationAsReveal(): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;

}

const Menu: React.FC<MenuProps> = ({
    addLane,
    swapLane,
    importPresentation,
    exportPresentationAsJson,
    exportPresentationAsReveal,
    metadata,
    setMetadata
}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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
        setDialogOpen(true);
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
        <div className="menu">
            <div>
                <Button variant="contained" onClick={addLane}>
                    Add Lane
                </Button>
            </div>
            <div>
                <Button variant="contained" onClick={swapLane}>
                    Swap Lanes
                </Button>
            </div>
            <div>
                <Button variant="contained" onClick={openMetadata}>
                    Manage metadata
                </Button>
            </div>
            <div>
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
        </div>
        <div>
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
        </div>
            <MetadataDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} metadata={metadata} setMetadata={setMetadata} />
    </div>
    );
};

export default Menu;
