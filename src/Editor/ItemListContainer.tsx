import { Button, Grid, List, ListItemButton, ListItemText } from "@mui/material";


interface ItemListContainerProps {
    items: any[];
    selectItem(index: number): void;
    addItem(): void;
    deleteItem(): void;
    selectedItemIndex: number;
}

const ItemListContainer: React.FC<ItemListContainerProps>  = ({items, selectItem, addItem, deleteItem, selectedItemIndex}) => {
    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item xs style={{ height: "90%", overflowY: 'auto'}}>
                <List>
                    {items.map((item, index) => (
                        <ListItemButton
                            key={index} 
                            onClick={() => selectItem(index)}
                            style={{ padding: '4px 8px' }}
                            selected={index === selectedItemIndex}
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
                            onClick={addItem} 
                            variant="contained" 
                            color="primary" 
                            style={{ marginTop: '10px' }}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button 
                            onClick={deleteItem} 
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

export default ItemListContainer;