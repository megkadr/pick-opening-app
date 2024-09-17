/* eslint-disable @typescript-eslint/no-misused-promises */
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { changePassword } from '../../utils/RequestServices/UserService';
import Style from "./UserPanel.module.css";
import { useAuthStore } from '../../utils/contextStore/authStore';

export default function ChangePasswordContent() { 
    const user = useAuthStore(state => state.user);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'error' | 'success'>('error');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userId: 0,
        currentPassword: '',
        newPassword: '',
    });
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.currentPassword.trim()) return "current password is required";

        if (!formData.newPassword.trim()) return "New password is required";
        return "";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setMessage(validationError);
            setSeverity('error');
            return;
        }
        if (!user) {
            setMessage('User is not logged in');
            setSeverity('error');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            formData.userId = user.id;
            console.log("formData", formData);
            const response = await changePassword(formData);      
            if (response) {
                setMessage('Password changed successfully');
                setSeverity('success');
            } else {
                setMessage('Check if typed current password is correct.');
                setSeverity('error');
            }
        } catch (error) {
            console.error('Change password failed:', error);
            setMessage('Check if typed current password is correct.');
            setSeverity('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={Style.passwordsContainer}>
                <FormControl 
                    sx={{ 
                        m: 1, 
                        width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'primary.main' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root': { color: 'primary.main' },
                    }} 
                    variant="outlined" 
                    color='primary'
                >
                    <InputLabel htmlFor="outlined-adornment-currentPassword">Current password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle current password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color='primary'
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Current password"
                    />
                </FormControl>
                <FormControl 
                    sx={{ 
                        m: 1, 
                        width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'primary.main' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root': { color: 'primary.main' },
                    }} 
                    variant="outlined" 
                    color='primary'
                >
                    <InputLabel htmlFor="outlined-adornment-newPassword">New password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-newPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle new password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color='primary'
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="newPassword"
                    />
                </FormControl>
                <Button 
                    type="submit" 
                    variant="contained" 
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockPersonIcon />}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Change Password'}
                </Button>
            </form>
            {message && (
                <Alert severity={severity} style={{ marginTop: '1rem' }}>
                    {message}
                </Alert>
            )}
        </>
    )
}