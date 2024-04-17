import React, { useState } from "react";

interface PreviewProps {
  data: string;
}

const Preview: React.FC<PreviewProps> = ({data}) => {
  return (
    <div>
      {data && data}
    </div>
  );
}

export default Preview;
