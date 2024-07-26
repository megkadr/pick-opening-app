/* eslint-disable @typescript-eslint/no-misused-promises */
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import Style from './Login.module.css';
import { login } from '../../utils/RequestServices/UserService';
import { Alert, CircularProgress } from '@mui/material';
import { useAuthStore } from '../../utils/contextStore/authStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const setAuthUser = useAuthStore((state) => state.login);

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
        if (!formData.login.trim()) return "Name is required";

        if (!formData.password) return "Password is required";
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
            const response = await login(formData);      
            if (response) {
                setAuthUser(response);
                navigate('/mainPage');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Style.containerForm}>
            <div className={Style.form}>
                <h1>Login</h1>
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
                        <InputLabel htmlFor="outlined-adornment-login">Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-login"
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleInputChange}
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
                    <Button 
                        type="submit" 
                        variant="contained" 
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
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