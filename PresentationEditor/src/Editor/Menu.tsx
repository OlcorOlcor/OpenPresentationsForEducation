import { Button } from "@mui/material";
import React from "react";
import "./css/Menu.css";

interface MenuProps {
    addLane(): void;
    swapLane(): void;
    importPresentation(file: File): void;
    exportPresentation(): void;
}

const Menu: React.FC<MenuProps> = ({addLane, swapLane, importPresentation, exportPresentation}) => {
    return (
        <div className="menu">
            <div>
                <Button variant="contained" onClick={addLane}>Add Lane</Button>
            </div>
            <div>
                <Button variant="contained" onClick={swapLane}>Swap Lanes</Button>
            </div>
            <div>
                <label htmlFor="fileInput">Import Lanes: </label>
                <input type="file" id="fileInput" onChange={(e) => importPresentation(e.target.files?.[0]!)} />
            </div>
            <div>
                <Button variant="contained" onClick={exportPresentation}>Export</Button>
            </div>
        </div>
    )
}

export default Menu;