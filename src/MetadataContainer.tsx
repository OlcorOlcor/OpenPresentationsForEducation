import React, { useEffect, useRef, useState } from "react";
import { CustomArea, CustomAreaProcessor } from "./CustomAreaProcessor";

interface MetadataProps {
  areaProcessor: CustomAreaProcessor;
}

const MetadataContainer: React.FC<MetadataProps> = (props) => {
  const [areas, setAreas] = useState<CustomArea[]>([]);
  useEffect(() => {
    const handleChange = () => {
      setAreas(props.areaProcessor.getAreas());
    };
  });

  //TODO: The select doesn't get updated on change.
  return (
    <div>
      <select>
        {areas.map((area) => (
          <option key={area.id} value={area.text}>
            {area.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MetadataContainer;
