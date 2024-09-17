import { ThemeProvider, createTheme } from '@mui/material/styles';
import Style from "./UserPanel.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getUserAccountDetails } from '../../utils/RequestServices/UserService';
import { useAuthStore } from '../../utils/contextStore/authStore';
import { useEffect, useState } from 'react';
import { Alert, CircularProgress, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AccountDetailsModel from '../../assets/DTO/AccountDetailsModel';
import ChangePasswordContent from './ChangePasswordContent';

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
            },
        },
    },
});

export default function UserPanelContent() {
    const user = useAuthStore(state => state.user);
    const [userDetails, setUserDetails] = useState<AccountDetailsModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserAccountDetails = async () => {
            if (!user) {
                setError('User not authenticated');
                setIsLoading(false);
                return;
            }

            try {
                const response = await getUserAccountDetails(user.id);
                console.log("response.data", response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError('Failed to fetch user details');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchUserAccountDetails();
    }, [user]);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

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
                            Account Details
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Name" 
                                        secondary={userDetails?.name} primaryTypographyProps={{
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                            letterSpacing: 0,
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                            letterSpacing: 0,
                                            color: 'white'
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Favorite Opening" 
                                        secondary={`${userDetails?.favoriteOpeningName} (Click count: ${userDetails?.favoriteOpeningClickCount})`} primaryTypographyProps={{
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                            letterSpacing: 0,
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                            letterSpacing: 0,
                                            color: 'white'
                                        }}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            Change Password
                        </AccordionSummary>
                        <AccordionDetails>
                            <ChangePasswordContent />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            Most frequently chosen openings for a given year
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Year</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Opening Number</TableCell>
                                            <TableCell>Click Count</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userDetails?.userFavouriteOpenings.map((opening, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{opening.year}</TableCell>
                                                <TableCell>{opening.name}</TableCell>
                                                <TableCell>{opening.openingNumber}</TableCell>
                                                <TableCell>{opening.openingClickCount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </ThemeProvider>
    );
}