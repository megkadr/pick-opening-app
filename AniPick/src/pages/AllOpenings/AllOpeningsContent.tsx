import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAllOpenings } from '../../utils/RequestServices/OpeningsService';
import { OpeningsByYear } from "../../assets/DTO/OpeningsByYear";
import Style from "./AllOpenings.module.css";

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
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0f1214',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0f1214',
                },
                
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0f1214',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                },
                head: {
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export default function AllOpeningsContent() {
    const [openings, setOpenings] = useState<OpeningsByYear[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOpenings = async () => {
        setLoading(true);
        setError(null); // Clear any previous error
        try {
            const data = await getAllOpenings();
            setOpenings(data);
        } catch (error) {
            setError("Error fetching openings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchOpenings();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className={Style.mainLayout}>
                <section className={Style.allOpeningsContainer}>
                    {loading && <CircularProgress />}
                    {error && <Alert severity="error">{error}</Alert>}
                    {!loading && !error && openings.length === 0 && (
                        <Typography>No openings available.</Typography>
                    )}

                    {!loading && !error && openings.length > 0 && (
                        <>
                            <h1 style={{ fontSize: "3rem" }}>All Openings</h1>
                            {openings.map((yearlyData) => (
                                <Accordion key={yearlyData.year}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{yearlyData.year}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Title</TableCell>
                                                        <TableCell>Opening Number</TableCell>
                                                        <TableCell>Series Name</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {yearlyData.openings.map((opening) => (
                                                        <TableRow key={opening.id}>
                                                            <TableCell>{opening.title}</TableCell>
                                                            <TableCell>{opening.openingNumber}</TableCell>
                                                            <TableCell>{opening.serieName}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </>
                    )}
                </section>
            </div>
        </ThemeProvider>
    );
}