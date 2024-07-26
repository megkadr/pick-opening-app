import { ThemeProvider, createTheme } from '@mui/material/styles';
import Style from "./UserPanel.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const theme = createTheme({
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    backgroundColor: '#191919',
                    '&:before': {
                        display: 'none',
                    },
                    '&.Mui-expanded': {
                        margin: '8px 0',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    color: '#1976d2',
                    '&.Mui-expanded': {
                        minHeight: 48,
                    },
                },
                content: {
                    '&.Mui-expanded': {
                        margin: '12px 0',
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    color: '#1976d2',
                },
            },
        },
    },
});

export default function UserPanelContent() {
    return (
        <ThemeProvider theme={theme}>
            <div className={Style.container}>
                <div className={Style.userData}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Szczegóły konta
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            Zmień hasło
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            Najczęściej wybierane openingi dla danego roku
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </ThemeProvider>
    );
}
