import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

interface ContactModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
    return (
        <ThemeProvider theme={darkTheme}>
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2, color: 'text.primary' }} id="customized-dialog-title">
            Contact
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.secondary',
            }}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers>
            <Typography gutterBottom color="text.primary">
                Thank you for your interest in my website. I appreciate your feedback and inquiries.
            </Typography>
            <Typography gutterBottom color="text.primary">
                If you have any questions, suggestions, or need support, feel free to reach out to me at:
            </Typography>
            <Typography
                gutterBottom
                color="text.primary"
                sx={{ fontWeight: 'bold' }}
                aria-label="contact email"
            >
                <a href="mailto:anipickopening@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                anipickopening@gmail.com
                </a>
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
                Close
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </ThemeProvider>
    );
}