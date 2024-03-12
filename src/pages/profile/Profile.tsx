
import { useEffect, useState } from 'react';
import userimage from "../../assets/profile.png";
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Button, Modal } from "@mui/material";
import { Edit } from '@mui/icons-material'; 
import { InnerContainer, profileImageStyle, StyleTypography,StyleTypographyName} from './profileStyles';
import { UserData, useAuth } from '../../hooks/AuthProvider';
// import { useNavigate } from 'react-router-dom';
import EditProfile from '../editprofile/EditProfile';

const Profile = () => {
  const { userData,setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  // const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [userData]);

  if (!userData || isLoading) {
    return <Box className="profile-container no-user-data">No user data found</Box>;
  }
  const handleEdit=()=>{
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false);
  };
  const handleUpdateProfile = (updatedUserData: UserData) => {
    // Update the state with the new user data
    setUserData({ ...userData, user: updatedUserData });
};
  return (
    <Box>
    <InnerContainer>
      <Grid container spacing={2}>
        <Grid item lg={4} >
          {isLoading ? (
            <Skeleton width={200} height={200} animation="wave" />
          ) : (
            <img src={userimage} alt="Profile" style={profileImageStyle}  />
          )}
        </Grid>
        <Grid item lg={6} sm={6}>
          <StyleTypographyName variant='h2'>
            Welcome, {userData.user?.fname.charAt(0).toUpperCase() + userData.user?.fname.slice(1)} {userData.user?.lname.charAt(0).toUpperCase() + userData.user?.lname.slice(1)}!
          </StyleTypographyName>
          <StyleTypography variant='h6'><strong>First Name:</strong> {userData.user?.fname}</StyleTypography>
          <StyleTypography variant='h6'><strong>Middle Name:</strong> {userData.user?.mname}</StyleTypography>
          <StyleTypography variant='h6'><strong>Last Name:</strong> {userData.user?.lname}</StyleTypography>

          <StyleTypography variant='h6'><strong>Email:</strong> {userData.user?.email}</StyleTypography>
          <StyleTypography><strong>Phone Number:</strong> {userData.user?.phonenumber}</StyleTypography>
          <StyleTypography><strong>Address:</strong> {userData.user?.address}</StyleTypography>
          <StyleTypography><strong>Date of Birth:</strong> {userData.user?.dob}</StyleTypography>
          <StyleTypography><strong>Gender:</strong> {userData.user?.gender}</StyleTypography>

        </Grid>
        <Grid item lg={2}>
         <Button onClick={handleEdit}>
         <Edit /> Edit Profile
         </Button>
                   
        </Grid>
      </Grid>
    </InnerContainer>
    
    <Modal open={showModal} onClose={closeModal}>
  
      <EditProfile handleClose={closeModal} handleUpdateProfile={handleUpdateProfile}/>

  </Modal>
  </Box>
  );
};

export default Profile;