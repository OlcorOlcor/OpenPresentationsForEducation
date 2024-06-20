import { Button } from "@mui/material";
import { Metadata } from "../Model/PresentationTypes";

interface MetadataListContainerProps {
    metadata: Metadata[];
    selectMetadata(index: number): void;
    addMetadata(): void;
}

const MetadataListContainer: React.FC<MetadataListContainerProps>  = ({metadata, selectMetadata, addMetadata}) => {
    return (
        <div style={{height: "100%"}}>
            {metadata.map((item, index) => (
                <div
                    key={index}
                    onClick={() => selectMetadata(index)}
                    style={{ cursor: 'pointer' }}
                >
                    {item.name}
                </div>
            ))}
            <Button 
                onClick={addMetadata} 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px' }}>
                Add
            </Button>
        </div>
    )
}

export default MetadataListContainer;