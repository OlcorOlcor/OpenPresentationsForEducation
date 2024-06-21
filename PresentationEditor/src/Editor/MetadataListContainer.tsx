import { Button, Grid } from "@mui/material";
import { Metadata } from "../Model/PresentationTypes";

interface MetadataListContainerProps {
    metadata: Metadata[];
    selectMetadata(index: number): void;
    addMetadata(): void;
    deleteMetadata(): void;
}

const MetadataListContainer: React.FC<MetadataListContainerProps>  = ({metadata, selectMetadata, addMetadata, deleteMetadata}) => {
    return (
        <Grid container style={{height: "100%"}}>
            <Grid item xs={12} style={{height: "75%"}}>
                {metadata.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => selectMetadata(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item.name}
                    </div>
                ))}
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Button 
                            onClick={addMetadata} 
                            variant="contained" 
                            color="primary" 
                            style={{ marginTop: '10px' }}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button 
                            onClick={deleteMetadata} 
                            variant="contained" 
                            color="error" 
                            style={{ marginTop: '10px' }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MetadataListContainer;