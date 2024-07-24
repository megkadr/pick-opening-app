/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import Style from "./AddAnime.module.css";
import TextField from '@mui/material/TextField';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { Button, CircularProgress } from "@mui/material";
import { addAnimeOpening } from "../../../utils/RequestServices/OpeningsService";
import { Opening } from "../../../assets/DTO/Opening";

export default function AddAnimeForm() {
    const [formData, setFormData] = useState<Opening>({
        id: 0,
        title: '',
        openingNumber: 0,
        src: '',
        year: 0,
        serieName: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

        // Helper function to convert Google Drive viewing link to usable video source
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: id === 'openingNumber' || id === 'year' ? 
                (value === '' ? 0 : parseInt(value, 10)) : 
                value
        }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
    
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (formData.title.length > 300) newErrors.title = "Title must be 300 characters or less";
    
        if (formData.openingNumber <= 0) newErrors.openingNumber = "Opening number must be positive";
    
        if (!formData.src.trim()) newErrors.src = "Source is required";
    
        if (formData.year <= 0) newErrors.year = "Year must be positive";
    
        if (!formData.serieName.trim()) newErrors.serieName = "Serie name is required";
        if (formData.serieName.length > 150) newErrors.serieName = "Serie name must be 150 characters or less";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                const response = await addAnimeOpening(formData);
                console.log('Opening added successfully:', response.data);
                // Reset form or show success message
            } catch (error) {
                console.error('Error adding opening:', error);
                // Show error message to user
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={Style.container}>
            <form className={Style.form} onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccessibleForwardIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="title" 
                        label="Title" 
                        variant="standard" 
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccessibleForwardIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="openingNumber" 
                        label="Opening Number" 
                        variant="standard" 
                        type="number" 
                        value={formData.openingNumber}
                        onChange={handleChange}
                        error={!!errors.openingNumber}
                        helperText={errors.openingNumber}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccessibleForwardIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="src" 
                        label="Src" 
                        variant="standard" 
                        value={formData.src}
                        onChange={handleChange}
                        error={!!errors.src}
                        helperText={errors.src || "Paste Google Drive viewing link here"}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccessibleForwardIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="year" 
                        label="Year" 
                        variant="standard" 
                        type="number" 
                        value={formData.year}
                        onChange={handleChange}
                        error={!!errors.year}
                        helperText={errors.year}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccessibleForwardIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="serieName" 
                        label="Serie Name" 
                        variant="standard" 
                        value={formData.serieName}
                        onChange={handleChange}
                        error={!!errors.serieName}
                        helperText={errors.serieName}
                    />
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        endIcon={!isLoading && <SendIcon />}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </form>
        </div>
    );
}