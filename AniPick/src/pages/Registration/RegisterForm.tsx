/* eslint-disable @typescript-eslint/no-misused-promises */
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import Style from './Registration.module.css';
import { addUser } from '../../utils/RequestServices/UserService'; // Import the addUser function
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
        if (formData.password.length < 6) return "Password must be at least 6 characters long";
        if (formData.password !== formData.rePassword) return "Passwords don't match";
        return "";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userData = {
                id: 0,
                name: formData.name,
                passwordHash: formData.password, // Only send the first password
                email: formData.email,
                userOpenings: [],
                userClaims: [],
            };
            await addUser(userData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Style.containerForm}>
            <div className={Style.form}>
                <h1>Registration</h1>
                <form onSubmit={handleSubmit} className={Style.formContainer}>
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
                        <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountCircle  color='primary'/>
                                </InputAdornment>
                            }
                            label="Name"
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
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            label="Email"
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
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        color='primary'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
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
                        <InputLabel htmlFor="outlined-adornment-repassword">Re Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-repassword"
                            type={showPassword ? 'text' : 'password'}
                            name="rePassword"
                            value={formData.rePassword}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle repassword visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        color='primary'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Re Password"
                        />
                    </FormControl>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
                {error && (
                    <Alert severity="error" style={{ marginTop: '1rem' }}>
                        {error}
                    </Alert>
                )}
            </div>
        </div>
    )
}