import { useState, useRef, KeyboardEvent } from 'react';
import { TextField, Grid, Typography, IconButton} from '@mui/material';
import { GridContainer, GridButtonContainer } from './otpStyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../login/loginStyles';
import { Close } from '@mui/icons-material';

const OTPInput:React.FC<{length?: number; handleClose: () => void }> = ({ length = 6, handleClose}) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef(Array(length).fill(null));
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value !== '' && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && index !== 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitOTP = async (e:any) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      setErrorMessage('Please fill all OTP fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/otp', { otp: otp.join('') });
      console.log('Response:', response);
      if (response.status === 200) {
        setErrorMessage('');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      setErrorMessage('Incorrect OTP');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleClose();
  };

  return (
    <>
      {showModal && ( 
        <GridContainer container spacing={1} direction="column" alignItems="center" minHeight={300}>
          <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleCloseModal} >
            <Close />
          </IconButton>
          <form onSubmit={handleSubmitOTP}>
            <Typography variant="h6" style={{ color: "#570987", textAlign: "center", paddingBottom: '20px' }}>Enter OTP code</Typography>
            <Typography variant='body2'>
              We have sent you Email with 6 digit verification code (OTP) on your Register Email address
            </Typography>
            <Grid item>
              <Grid container spacing={1} justifyContent="center" padding={2} pt={5}>
                {otp.map((digit, index) => (
                  <Grid item key={index}>
                    <TextField
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      variant="outlined"
                      type="text"
                      size="small"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          width: '1rem',
                          borderRadius: '45px',
                          textAlign: 'center',
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {errorMessage && (
              <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                {errorMessage}
              </Typography>
            )}
          
          <GridButtonContainer>
           
            <ButtonComponent variant="contained" onClick={handleSubmitOTP} fullWidth style={{ borderRadius: '50px', background: "green" }}>
              Validate
            </ButtonComponent>
          </GridButtonContainer>
          </form>
        </GridContainer>
      )}
    </>
  );
};

export default OTPInput;
