import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useWelcomeDialogStore } from '../../utils/contextStore/welcomeDialogStore'; // Import your Zustand store

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        paper: '#121212',
        },
        text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
        },
    },
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const WelcomeDialog = () => {
    const { isWelcomeDialogOpen, closeWelcomeDialog } = useWelcomeDialogStore();

    return (
        <ThemeProvider theme={darkTheme}>
        <StyledDialog open={isWelcomeDialogOpen} onClose={closeWelcomeDialog}>
            <DialogTitle sx={{ color: 'text.primary' }}>Welcome to AniPick!</DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom color="text.primary">
                Thank you for visiting AniPick! I hope you enjoy your time here.
            </Typography>
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <Typography variant="h6" gutterBottom color="text.primary">
                How to Play
            </Typography>
            <Typography gutterBottom color="text.primary">
                After clicking the start button, the game will begin. For each year, a selection of anime openings will be
                chosen and displayed. The current year is shown at the top of the screen, and each opening will play automatically.
                Once all the openings from the displayed year have finished playing, you can choose your favorite opening
                that you believe is the best for that year.
            </Typography>
            <Typography gutterBottom color="text.primary">
                After you make your selection, the game will progress to the next year, where 6 new anime openings from that
                year will be randomly selected and played. This process continues year by year, allowing you to choose your
                favorite opening for each year.
            </Typography>
            <Typography gutterBottom color="red" fontWeight="bold">
                Important: If you want to save your selections and view them later, you need to log in to your account. Without
                logging in, your picks will not be saved. You can access your saved picks in the UserPanel, which is available
                in the navigation bar after logging in.
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={closeWelcomeDialog} color="primary">
                Close
            </Button>
            </DialogActions>
        </StyledDialog>
        </ThemeProvider>
    );
};

export default WelcomeDialog;