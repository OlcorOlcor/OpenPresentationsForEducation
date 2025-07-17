import { Box, Button } from "@mui/material";

interface EmptyLaneProps {
    addLane(): void;
}

const EmptyLane: React.FC<EmptyLaneProps> = ({ addLane }) => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Button color="primary" variant="contained" onClick={addLane}>
                Add Lane
            </Button>
        </Box>
    );
};

export default EmptyLane;
