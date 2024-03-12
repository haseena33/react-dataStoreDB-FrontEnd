import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  TextField,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
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
// import { useNavigate } from 'react-router-dom';
import {
  ButtonGrid,
  CustomButton,
  StyledFormGroup,
  OuterContainer,
  Horizantal,
} from "../signup/signupStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";

interface FormValues {
  fname: string;
  lname: string;
  mname: string;
  phonenumber: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
}

const EditProfile: React.FC<{ handleClose: () => void,handleUpdateProfile: any }> = ({
  handleClose,handleUpdateProfile
}) => {
  const [emailValid, setEmailValid] = useState<boolean>(true);
  // const navigate=useNavigate()
  const [form, setForm] = useState<FormValues>({
    fname: "",
    lname: "",
    mname: "",
    phonenumber: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
  });
  console.log(form, "form");
  const [errors, setErrors] = useState<FormValues>({
    fname: "",
    lname: "",
    mname: "",
    phonenumber: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
  });
  const populateFormData = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setForm({
      fname: userData.user.fname,
      lname: userData.user.lname,
      mname: userData.user.mname,
      phonenumber: userData.user.phonenumber,
      email: userData.user.email,
      //   password: userData.user.password,
      //   confirmPassword: userData.user.ConfirmPassword,
      address: userData.user.address,
      dob: userData.user.dob,
      gender: userData.user.gender,
    });
  };

  useEffect(() => {
    populateFormData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emptyFields = Object.keys(form).filter(
      (key) => form[key as keyof FormValues].trim() === ""
    );

    if (emptyFields.length > 0) {
      const newErrors: FormValues = emptyFields.reduce((acc, field) => {
        acc[field as keyof FormValues] = `Please enter ${
          field === "dob" ? "Date of Birth" : field
        }`;
        return acc;
      }, {} as FormValues);

      setErrors(newErrors);

      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const userId = userData.user.id;
      console.log(userId, "useriD");
      const response = await fetch(
        `http://localhost:3000/api/users/update-user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) {
        throw new Error("failed to Submit form");
      }
      handleUpdateProfile(form);

      setForm({
        fname: "",
        lname: "",
        mname: "",
        phonenumber: "",
        email: "",
        // password: '',
        // confirmPassword: '',
        address: "",
        dob: "", // Reset dob
        gender: "",
      });
      setErrors({
        fname: "",
        lname: "",
        mname: "",
        phonenumber: "",
        email: "",
        // password: '',
        // confirmPassword: '',
        address: "",
        dob: "",
        gender: "",
      });
      console.log("Form submitted successfully");
      toast.success("Updated successful!");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      toast.error("Updated failed.");
      console.log(err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let isValid = true;
    let errorMessage = "";

    if (value.trim() === "") {
      isValid = false;
      errorMessage = `Please enter ${name === "dob" ? "Date of Birth" : name}`;
    }
    switch (name) {
      case "fname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid
          ? ""
          : `Please enter valid ${
              name === "fname" ? "First" : name
            } name (Only alphabets are allowed)`;
        break;
      case "lname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid
          ? ""
          : `Please enter valid ${
              name === "lname" ? "Last" : name
            } name (Only alphabets are allowed)`;
        break;
      case "mname":
        isValid = /^[a-zA-Z\s]*$/.test(value);
        errorMessage = isValid
          ? ""
          : `Please enter valid ${
              name === "mname" ? "Middle" : name
            } name (Only alphabets are allowed)`;
        break;
      case "address":
        isValid = value.trim() !== "";
        break;
      case "phonenumber":
        isValid = /^\d{10}$/.test(value);
        errorMessage = isValid
          ? ""
          : "Phone number must not be greater than 10 digits";
        break;
      case "email":
        isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/.test(value);
        setEmailValid(isValid);
        errorMessage = isValid ? "" : "Invalid email format";
        break;
      case "dob":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        const monthDiff = currentDate.getMonth() - selectedDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())
        ) {
          isValid = age >= 18;
          errorMessage = isValid
            ? ""
            : "Age must be greater than or equal to 18";
        } else {
          isValid = false;
          errorMessage = "Age must be greater than or equal to 18";
        }
        break;
      case "gender":
        break;
      default:
        break;
    }

    // Update the form state
    setForm({ ...form, [name]: value });

    // Update the errors state
    setErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage, // Set the error message for the field
    }));
  };

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
    handleClose(); // Call the handleClose function passed from props
  };
  return (
    <>
      <ToastContainer />
      <OuterContainer maxWidth="lg">
        <Horizantal>
          <Typography variant="h4" textAlign={"center"} p={4}>
            Edit Profile
          </Typography>
          <IconButton
            style={{
              position: "absolute",
              top: 70,
              right: 230,
              color: "white",
            }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>
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
          </Grid>
          <Grid container spacing={2} mb={2}>
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
            <Grid item xs={12} lg={6}>
              <StyledTextField
                label="Phone Number"
                type="number"
                size="small"
                fullWidth
                name="phonenumber"
                placeholder="Middle Name"
                value={form.phonenumber}
                onChange={handleChange}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                type="email"
                size="small"
                label="Email"
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
                label="Date Of Birth"
                type="date"
                size="small"
                fullWidth
                name="dob"
                placeholder="Date of Birth"
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
              <Typography style={{ textAlign: "left" }}>
                {" "}
                Select Gender
              </Typography>
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
    </>
  );
};

export default EditProfile;
		