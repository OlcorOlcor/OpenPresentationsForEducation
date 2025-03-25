import React, { useState } from "react";

interface PreviewProps {
    data: string;
    layout: string;
}

const Preview: React.FC<PreviewProps> = ({ data, layout }) => {
    return <div className={`preview ${layout}`} dangerouslySetInnerHTML={{ __html: data }}></div>;
};

export default Preview;
