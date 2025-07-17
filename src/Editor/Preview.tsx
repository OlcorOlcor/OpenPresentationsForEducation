import React from "react";
import { useColorMode } from "./ThemeContext"

interface PreviewProps {
    html: string;
    css: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css }) => {
    const { mode } = useColorMode();
    
    const themeStyles = mode === "dark" ? "body {background-color: #121212;color: #ffffff;}" : "body {background-color: #ffffff;color: #000000;}";
    const srcDoc = `<!DOCTYPE html><html><head><meta charset="utf-8" /><style>${css} ${themeStyles}</style></head><body>${html}</body></html>`;

    return (
        <iframe
        title="User Preview"
        sandbox="allow-same-origin"
        srcDoc={srcDoc}
        style={{ width: "100%", height: "100%", border: "none" }}
        />
    );
};

export default Preview;
