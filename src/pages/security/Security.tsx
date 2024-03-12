import { useAuth } from '../../hooks/AuthProvider';
import { Grid, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OuterContainer, Horizantal, TypographyTitle, InnerContainer } from './securityStyles';

const Security = () => {
    const { userData } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [lowercase, setLowercase] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [number, setNumber] = useState(false);
    const [length, setLength] = useState(false);
    // const [loading, setLoading] = useState(false);

    const handleOldPasswordChange = (event: any) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
        setPasswordError('');
        setPasswordsMatch(event.target.value === confirmPassword);
        const lowerRegex = /^(?=.*[a-z])/;
        const upperRegex = /^(?=.*[A-Z])/;
        const numberRegex = /^(?=.*\d)/;
        const lengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const specialCharRegex = /^(?=.*[@$!%*?&])/;
        setLowercase(lowerRegex.test(event.target.value));
        setUppercase(upperRegex.test(event.target.value));
        setNumber(numberRegex.test(event.target.value));
        setLength(lengthRegex.test(event.target.value));
        setSpecialChar(specialCharRegex.test(event.target.value))
    };

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === newPassword);
    };

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let errors = '';

        if (!oldPassword) {
            errors += 'Please enter old password. ';
        }

        if (!newPassword) {
            errors += 'Please enter new password. ';
        }

        if (!confirmPassword) {
            errors += 'Please confirm new password. ';
        }
        if (errors !== '') {
            setPasswordError(errors.trim());
            return;
        }

        setPasswordError('');

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else if (!passwordsMatch) {
            setPasswordError('Passwords do not match');
        } else {
            // setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/users/password-update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userData?.token}`,
                    },
                    body: JSON.stringify({
                        userId: userData?.user.id,
                        oldPassword,
                        newPassword,
                        confirmPassword,
                    }),
                });
                if (response.ok) {
                    console.log('Password updated successfully');
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    toast.success('Password updated successfully', {
                        position: 'top-center'
                    });

                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
            } catch (error) {
                console.error('Error updating password:', error);
                toast.error('Failed to update password');

            } 
        }
    };



    return (
        <>
            <ToastContainer />
            <OuterContainer maxWidth="md" >
                <Horizantal>
                    <TypographyTitle variant="h4" >
                    PASSWORD GUIDELINES
                    </TypographyTitle>
                </Horizantal>
                <InnerContainer container spacing={2}>
                    <Grid item lg={6} xs={12}>
                        <Typography variant="h6">Password must meet these requirement:</Typography>
                        <Typography>
                            {lowercase ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />} At least One <b>Lowercase</b> letter
                        </Typography>
                        <Typography>
                            {uppercase ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />} At least One <b>Uppercase</b> letter
                        </Typography>
                        <Typography>
                            {number ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />} At least One <b>Number</b>
                        </Typography>
                        <Typography>
                            {length ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />} At least <b>8 characters</b>
                        </Typography>
                        <Typography>
                            {specialChar ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />} At least One <b>special character (@$!%*?&)</b>
                        </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Old Password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle old password visibility"
                                                onClick={toggleShowOldPassword}
                                                edge="end"
                                            >
                                                {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={!oldPassword && !!passwordError}
                                helperText={!oldPassword && !!passwordError ? 'Please enter old password' : ''}
                                style={{ marginBottom: '20px' }}
                            />
                            <TextField
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle new password visibility"
                                                onClick={toggleShowNewPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={!newPassword && !!passwordError}
                                helperText={!newPassword && !!passwordError ? 'Please enter new password' :'password meet the requirement'}
                                style={{ marginBottom: '20px' }}
                            />
                            <TextField
                                label="Confirm New Password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={toggleShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={!!confirmPassword && !passwordsMatch}
                                helperText={confirmPassword && !passwordsMatch ? 'Confirm passwords do not match' : ''}
                                style={{ marginBottom: '20px' }}
                            />

                            <Button type="submit" variant="contained" color="primary"  sx={{mt:'15px'}}>
                                 Change Password
                            </Button>
                        </form>
                    </Grid>
                </InnerContainer>
            </OuterContainer>
        </>
    )
}

export default Security;
