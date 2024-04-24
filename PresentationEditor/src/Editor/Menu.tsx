import { Button } from "@mui/material";
import React from "react";
import "./css/Menu.css";


interface MenuProps {
    addLane(): void;
    swapLane(): void;
}

const Menu: React.FC<MenuProps> = ({addLane, swapLane}) => {
    return (
        <div className="menu">
            <div>
                <Button variant="contained" onClick={addLane}>Add Lane</Button>
            </div>
            <div>
                <Button variant="contained" onClick={swapLane}>Swap Lanes</Button>
            </div>
        </div>
    )
}

export default Menu;