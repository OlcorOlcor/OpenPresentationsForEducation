import React, { useState } from "react";

interface PreviewProps {
  data: string;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

export default Preview;
