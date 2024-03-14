import React, { useState } from "react";

interface PreviewProps {
  fetchHtml: () => string;
  fetchJson: () => string;
}

const Preview: React.FC<PreviewProps> = ({ fetchHtml, fetchJson } ) => {
  const [data, setData] = useState<string>("");

  function getHtml() {
    setData(fetchHtml());
  }

  function getJson() {
    setData(fetchJson());
  }

  return (
    <div>
      <nav>
        <button onClick={() => getHtml()}>html</button>
        <button onClick={() => getJson()}>json</button>
      </nav>
      <div>
          {data}
      </div>
    </div>
  );
}

export default Preview;
