import { Button } from "@mui/material";
import React from "react";
import "./css/Menu.css";

interface MenuProps {
    addLane(): void;
    swapLane(): void;
    importPresentation(file: File): void;
}

const Menu: React.FC<MenuProps> = ({addLane, swapLane, importPresentation}) => {
    return (
        <div className="menu">
            <div>
                <Button variant="contained" onClick={addLane}>Add Lane</Button>
            </div>
            <div>
                <Button variant="contained" onClick={swapLane}>Swap Lanes</Button>
            </div>
            <div>
                <input type="file" id="fileInput" onChange={(e) => importPresentation(e.target.files?.[0]!)} />
            </div>
        </div>
    )
}

export default Menu;