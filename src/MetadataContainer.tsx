import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CustomArea } from "./CustomAreaProcessor";


export type MetadataContainerMethods = {
  updateAreas(newAreas: CustomArea[]) : void;
}

const MetadataContainer = forwardRef<MetadataContainerMethods, {}>((_, ref) => {
  const [areas, setAreas] = useState<CustomArea[]>([]);

  useImperativeHandle(ref, () => ({
    updateAreas(newAreas: CustomArea[]) {
      console.log(newAreas);
      setAreas(newAreas);
    }
  }));
  
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
});

export default MetadataContainer;
