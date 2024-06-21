import { Button } from "@mui/material";
import React, { useState } from "react";
import "./css/Menu.css";
import MetadataDialog from "./MetadataDialog";
import { Metadata } from "../Model/PresentationTypes";

interface MenuProps {
    addLane(): void;
    swapLane(): void;
    importPresentation(file: File): void;
    exportPresentation(): void;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;

}

const Menu: React.FC<MenuProps> = ({
    addLane,
    swapLane,
    importPresentation,
    exportPresentation,
    metadata,
    setMetadata
}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    function openMetadata() {
        setDialogOpen(true);
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
                <label htmlFor="fileInput">Import Lanes: </label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => importPresentation(e.target.files?.[0]!)}
                />
            </div>
            <div>
                <Button variant="contained" onClick={exportPresentation}>
                    Export
                </Button>
            </div>
            <MetadataDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} metadata={metadata} setMetadata={setMetadata} />
        </div>
    );
};

export default Menu;
