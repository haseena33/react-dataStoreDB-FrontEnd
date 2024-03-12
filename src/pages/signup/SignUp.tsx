import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
const StyledTextField = styled(TextField)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

import {
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Grid,
  IconButton,
  TextField,
  Typography,
  
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  ButtonGrid,
  CustomButton,
  StyledFormGroup,
  OuterContainer,
  Horizantal,
  Type,
  PageContainer,
  FormContainer,
} from "./signupStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordValidation {
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
  length: boolean;
  match: boolean;
  showValidation?: boolean;
}

interface FormValues {
  fname: string;
  lname: string;
  mname:string;
  phonenumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  dob: string;
  gender: string;
}

const SignUp: React.FC = () => {
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  console.log(passwordFocused);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      lowercase: false,
      uppercase: false,
      number: false,
      specialChar: false,
      length: false,
      match: false,
    });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<FormValues>({
    fname: "",
    lname: "",
    mname:"",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    dob: "",
    gender: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    fname: "",
    lname: "",
    mname:"",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    dob: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    if (!passwordValidation.match) {
      setPasswordValidation((prevState) => ({
        ...prevState,
        showValidation: true,
      }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors: Partial<FormValues> = {};
    Object.entries(form).forEach(([key, value]) => {
        if (value.trim() === "") {
            isValid = false;
            newErrors[key as keyof FormValues] = " This field is required";
        }
    });

    if (form.password.trim() === "") {
        isValid = false;
        newErrors.password = "field is required";
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            form.password
        )
    ) {
        isValid = false;
        newErrors.password =
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.";
    }
    if (form.confirmPassword.trim() === "") {
        isValid = false;
        newErrors.confirmPassword = "field is required";
    } else if (form.password !== form.confirmPassword) {
        isValid = false;
        newErrors.confirmPassword = "Confirm passwords do not match";
    }

    setErrors((prevState) => ({
        ...prevState,
        ...newErrors,
    }));

    if (!isValid) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.message === "Email already exists") {
                setErrors((prevState) => ({
                    ...prevState,
                    email: "Email already exists",
                }));
            } else {
                throw new Error("failed to Submit form");
            }
        } else {
            setForm({
                fname: "",
                lname: "",
                mname:"",
                phonenumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                dob: "",
                gender: "",
            });
            setErrors({
                fname: "",
                lname: "",
                mname:"",
                phonenumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                dob: "",
                gender: "",
            });
            console.log("Form submitted successfully");
            toast.success("SignUp successful!");
            setTimeout(()=>{
                navigate("/");
            },3000)
        }
    } catch (err) {
        toast.error("Failed to submit form. Please try again.");
        console.error("Failed to submit form:", err);
    }
};


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let isValid = true;
    let errorMessage = "";
    switch (name) {
      case "fname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid ? "" : "Please enter valid first name(Only alphabets are allows)";
        break;
      case "lname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid ? "" : "Please enter valid last name(Only alphabets are allows)";
        break;
        case "mname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid ? "" : "Please enter valid Middle name(Only alphabets are allows)";
        break;
      case "address":
        isValid = value.trim() !== "";
        break;
      case "phonenumber":
        isValid = /^\d{10}$/.test(value);
        errorMessage = isValid ? "" : "Phone number must not be greater than 10 digits";
        break;
      case "email":
        isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/.test(value);
        setEmailValid(isValid);
        errorMessage = isValid ? "" : "Invalid email format";
        break;
      case "password":
        isValid =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        setPasswordValidation((prevState) => ({
          ...prevState,
          lowercase: /[a-z]/.test(value),
          uppercase: /[A-Z]/.test(value),
          number: /\d/.test(value),
          specialChar: /[@$!%*?&]/.test(value),
          length: value.length >= 8,
        }));
        errorMessage = isValid
          ? ""
          : "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.";
        break;
      case "confirmPassword":
        isValid = value === form.password;
        errorMessage = isValid ? "" : "Confirm Passwords do not match";
        break;
        case "dob":
          const currentDate = new Date();
          const selectedDate = new Date(value);
          const age = currentDate.getFullYear() - selectedDate.getFullYear();
          const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
        
          if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
            isValid = age >= 18;
            errorMessage = isValid ? "" : "Age must be greater than or equal to 18";
          } else {
            isValid = false;
            errorMessage = "Age must be greater than or equal to 18";
          }
          break;
        default:
          break;
      }
  


    setForm({ ...form, [name]: value });
    if (name !== "email" && name !== "password" && name !== "confirmPassword") {
      setPasswordValidation((prevState) => ({ ...prevState, [name]: isValid }));
    }
    setErrors((prevState) => ({
      ...prevState,
      [name]: isValid ? "" : errorMessage || `Please enter ${name === "dob" ? "Date of Birth" : name}`,
    }));
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
    <PageContainer>
      <ToastContainer />
      <FormContainer>
      <OuterContainer maxWidth="lg">
        <Horizantal>
          <Typography variant="h3" p={4}>
            Registration Form
          </Typography>
        </Horizantal>
        <form
          onSubmit={handleSubmit}
          style={{ height: "auto", padding: "30px" }}
        >
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                label="First Name"
                type="text"
                size="small"
                fullWidth
                placeholder="First Name"
                name="fname"
                value={form.fname}
                onChange={handleChange}
                error={!!errors.fname}
                helperText={errors.fname}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Last Name"
                type="text"
                size="small"
                fullWidth
                name="lname"
                placeholder="Last Name"
                value={form.lname}
                onChange={handleChange}
                error={!!errors.lname}
                helperText={errors.lname}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={2}>
          <Grid item xs={12} lg={6}>
              <TextField
                label="Middle Name"
                type="text"
                size="small"
                fullWidth
                name="mname"
                placeholder="Middle Name"
                value={form.mname}
                onChange={handleChange}
                error={!!errors.mname}
                helperText={errors.mname}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
            <StyledTextField
                label="Phone Number"
                type="number"
                size="small"
                fullWidth
                name="phonenumber"
                placeholder="Phone Number"
                value={form.phonenumber}
                onChange={handleChange}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber}
                inputProps={{
                  inputMode: "numeric",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={2}>
          <Grid item xs={12} lg={6}>
              <TextField
                label="Email"
                type="email"
                size="small"
                fullWidth
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  setForm({ ...form, [name]: value });
                  setEmailValid(isValidEmail);
                }}
                error={!emailValid || !!errors.email}
                helperText={!emailValid ? "Invalid email format" : errors.email}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                placeholder="Password"
                fullWidth
                name="password"
                value={form.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="off"
              />
            </Grid>
            
          </Grid>
          <Grid container spacing={2} mb={2}>
          <Grid item xs={12} lg={6}>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                fullWidth
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Address"
                type="text"
                size="small"
                fullWidth
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Date of Birth"
                type="date"
                size="small"
                fullWidth
                name="dob"
                placeholder="DD-MM-YYYY"
                value={form.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>           
          </Grid>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <Type>Select Gender</Type>
              <RadioGroup
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <StyledFormGroup>
                  <FormControlLabel
                    value="male"
                    control={<Radio checked={form.gender === "male"} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio checked={form.gender === "female"} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio checked={form.gender === "other"} />}
                    label="Other"
                  />{" "}
                </StyledFormGroup>
              </RadioGroup>
              {!!errors.gender && (
                <Typography variant="body2" color="error">
                  {errors.gender}
                </Typography>
              )}
            </Grid>
          </Grid>
          <ButtonGrid>
            <CustomButton type="submit" variant="contained">
              Submit
            </CustomButton>
          </ButtonGrid>
        </form>
      </OuterContainer>
      </FormContainer>
      </PageContainer>
    </>
  );
};

export default SignUp;
