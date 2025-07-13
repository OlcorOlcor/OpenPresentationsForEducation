import React, { useEffect, useRef, useState } from "react";

interface PreviewProps {
    html: string;
    css: string;
    layout: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, layout }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        doc.body.innerHTML = "";
        doc.head.innerHTML = "";

        const styleEl = doc.createElement("style");
        styleEl.textContent = css;
        doc.head.appendChild(styleEl);

        const wrapper = doc.createElement("div");
        wrapper.className = `preview ${layout}`;
        wrapper.innerHTML = html;

        doc.body.appendChild(wrapper);
    }, [html, css, layout]);

    return (
        <iframe ref={iframeRef} title="User Preview" sandbox="allow-same-origin" style={{ width: "100%", height: "100%", border: "none" }}/>
  );
};

export default Preview;
