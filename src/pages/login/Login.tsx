import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Link,
  Grid,
  Modal,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import OTPInput from "../otp/Otp";
import {
  FormContainer,
  TitleBox,
  InnerContainer,
  ButtonComponent,
} from "./loginStyles";
import { TypographyTitle } from "../security/securityStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {
  const { setUserData } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value)
        ? ""
        : "Please enter a valid email address";
    }

    setFormData({ ...formData, [name]: value, [`${name}Error`]: error });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // Clear previous error messages
    setFormData((prevData) => ({
      ...prevData,
      emailError: "",
      passwordError: "",
    }));
    setErrorMessage("");

    // Validate form fields
    let isValid = true;

    if (!formData.email.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        emailError: "Please enter your email",
      }));
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      setFormData((prevData) => ({
        ...prevData,
        emailError: "Please enter a valid email address",
      }));
      isValid = false;
    }

    if (!formData.password.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        passwordError: "Please enter your password",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      console.log("Submitting form data:", formData); // Log form data before sending request
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      localStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      console.log("Response:", data); // Log response data
      if (!response.ok) {
        if (data.error === "InvalidEmail") {
          setFormData((prevData) => ({
            ...prevData,
            emailError: "Invalid email",
          }));
        } else if (data.error === "InvalidPassword") {
          setFormData((prevData) => ({
            ...prevData,
            passwordError: "Invalid password",
          }));
        } else {
          setErrorMessage("Invalid credentials");
        }
        return;
      }
      // If response is successful, handle it as needed
      toast.success("Login successful!", {
        onClose: () => {
            setShowModal(true); // Open the modal popup after the toast is closed
        }
    });      console.log("Login successful!"); // Log success message
    } catch (error) {
      console.error("Error submitting form:", error); // Log any errors that occur during form submission
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ToastContainer />
      <FormContainer maxWidth="md">
        <TitleBox>
          <TypographyTitle variant="h3">Login Form</TypographyTitle>
        </TitleBox>
        <InnerContainer>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Enter your email address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!formData.emailError}
              helperText={formData.emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!formData.passwordError}
              helperText={formData.passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
            <ButtonComponent
              type="submit"
              fullWidth
              style={{ marginTop: "30px" }}
              variant="contained"
              color="primary"
            >
              Submit
            </ButtonComponent>
            <Grid container>
              <Grid container mt={3}>
                <Grid item>
                  <p>Don't have an account?</p>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup">
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </InnerContainer>
        <Modal open={showModal} onClose={closeModal}>
          <Box>
            <OTPInput handleClose={closeModal}/>
          </Box>
        </Modal>
      </FormContainer>
    </>
  );
};

export default Login;
