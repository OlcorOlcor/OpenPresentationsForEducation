import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Container style={{width: "100%"}}>
                <Typography variant="h2" style={{width: "100%", marginBottom: "5%"}}>
                    Welcome to Open Slides
                </Typography>
                <Button variant="contained" color="primary" size="large" onClick={() => navigate("/app")}>
                    Get Started
                </Button>
            </Container>
        </Box>
    );
}

export default LandingPage;