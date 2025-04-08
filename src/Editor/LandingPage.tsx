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
            <Container maxWidth="sm">
                <Typography variant="h2" gutterBottom>
                    Welcome to Open Slides
                </Typography>
                <Typography variant="h6" paragraph>

                </Typography>
                <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/app")}>
                    Get Started
                </Button>
            </Container>
        </Box>
    );
}

export default LandingPage;