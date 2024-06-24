import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Metadata } from "../Model/PresentationTypes";

interface MetadataListContainerProps {
    metadata: Metadata[];
    selectMetadata(index: number): void;
    addMetadata(): void;
    deleteMetadata(): void;
    selectedMetadataIndex: number;
}

const MetadataListContainer: React.FC<MetadataListContainerProps>  = ({metadata, selectMetadata, addMetadata, deleteMetadata, selectedMetadataIndex}) => {
    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item xs style={{ height: "90%", overflowY: 'auto'}}>
                <List>
                    {metadata.map((item, index) => (
                        <ListItemButton
                            key={index} 
                            onClick={() => selectMetadata(index)}
                            style={{ padding: '4px 8px' }}
                            selected={index === selectedMetadataIndex}
                        >
                        <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Grid>
            <Grid item>
                <Grid container spacing="20px">
                    <Grid item>
                        <Button 
                            onClick={addMetadata} 
                            variant="contained" 
                            color="primary" 
                            style={{ marginTop: '10px' }}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs>
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