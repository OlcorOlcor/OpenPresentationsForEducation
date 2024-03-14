import React, { useState } from "react";

interface PreviewProps {
  fetchHtml: () => string;
  fetchJson: () => string;
}

const Preview: React.FC<PreviewProps> = ({ fetchHtml, fetchJson } ) => {
  const [data, setData] = useState<string>("");

  const [code, setCode] = useState<boolean>(false);
  function getHtml() {
    setCode(false);
    setData(fetchHtml());
  }

  function getHtmlCode() {
    setCode(true);
    setData(fetchHtml());
  }

  function getJson() {
    setCode(false);
    setData(fetchJson());
  }

  return (
    <div>
      <nav>
        <button onClick={() => getHtmlCode()}>html</button>
        <button onClick={() => getHtml()}>html - code</button>
        <button onClick={() => getJson()}>json</button>
      </nav>
      {!code && 
        <div>
            {data}
        </div>
      }
      {code && 
        <div dangerouslySetInnerHTML={{__html: data}}></div>
      }
    </div>
  );
}

export default Preview;
