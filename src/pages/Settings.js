import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import axios from "axios";
import {
  Avatar,
  Box,
  FormControl,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Alert,
  List,
  ListItem,
  Autocomplete,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  ListItemText,
  Switch,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  IconButton,
} from "@mui/material";

import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";

import PageHeader from "../components/PageHeader";

import { setMessage } from "../feature/message";

import {
  updateUserInStore,
  updateProfile,
  updateUserPreferences,
} from "../feature/auth/auth";

import BookedItemCard from "../components/BookedItemCard";
function Settings(props) {
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    idNumber: "",
    cellphoneNumber: "",
  });

  const validateFields = () => {
    const errors = {};

    if (userFormData.firstName.trim() === "") {
      errors.firstName = "First Name is required";
    }

    if (
      userFormData.idNumber.length !== 13 ||
      !/^\d+$/.test(userFormData.idNumber)
    ) {
      errors.idNumber =
        "ID Number must be 13 digits long and contain only numbers";
    }

    if (
      userFormData.cellphoneNumber.length !== 10 ||
      !/^\d+$/.test(userFormData.cellphoneNumber)
    ) {
      errors.cellphoneNumber =
        "Cellphone Number must be 10 digits long and contain only numbers";
    }

    return errors;
  };
  const profileImageUrl = "YourProfileImageUrl";

  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);

  const { user: currentUser } = useSelector((state) => state.auth);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
const [firstNameInput, setFirstNameInput] = useState("");

  const [userFormData, setUserFormData] = useState({
    firstName: currentUser.userProfile.firstName,
    lastName: currentUser.userProfile.lastName,
    idNumber: currentUser.userProfile.idNumber,
    email: currentUser.userProfile.email,
    cellphoneNumber: currentUser.userProfile.cellphoneNumber,
  });

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const errors = validateFields();

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      const response = await dispatch(updateProfile(userFormData));

      if (response.error) {
        // Update was not successful, show an error message
        console.error("Profile update error:", response.payload);

        setSnackbarMessage(response.payload); // Assuming the payload contains the error message
        setSnackbarSeverity("error");
        setSnackbarOpen(true);

        setUserFormData({
          ...userFormData,
          firstName: currentUser.userProfile.firstName,
          lastName: currentUser.userProfile.lastName,
          idNumber: currentUser.userProfile.idNumber,
          email: currentUser.userProfile.email,
          cellphoneNumber: currentUser.userProfile.cellphoneNumber,
        });
      } else {
        // Update was successful, show a success message
        console.log("Profile update successful");

        setSnackbarMessage("Profile update successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Profile update error:", error.message);

      // Show an error message using Snackbar
      setSnackbarMessage(error.payload); // Assuming the payload contains the error message
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setFirstNameInput(""); // Reset the first name input
  };

  // Sample data for user preferences (initial states)
  const [emailNotifications, setEmailNotifications] = useState(
    currentUser.userProfile.emailNotification
  );
  const [pushNotifications, setPushNotifications] = useState(
    currentUser.userProfile.pushNotification
  );

  const handleEmailNotificationChange = async (event) => {
    try {
      const updatedValue = event.target.checked;
      console.log("handleEmailNotificationChange", updatedValue);
      setEmailNotifications(updatedValue);

      // Update the user preferences in the API
      const response = await updatePreferences({
        emailNotifications: updatedValue,
        pushNotifications,
      });

      if (response) {
        setSnackbarMessage(
          "Profile Push Email Preferences updated successfully."
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.payload); // Assuming the payload contains the error message
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handlePushNotificationChange = async (event) => {
    try {
      const updatedValue = event.target.checked;
      setPushNotifications(updatedValue);

      // Update the user preferences in the API
      const response = await updatePreferences({
        emailNotifications,
        pushNotifications: updatedValue,
      });
      console.log("setting response", response);
      if (response) {
        setSnackbarMessage(
          "Profile Push Notification Preferences updated successfully."
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.payload); // Assuming the payload contains the error message
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const [locationInput, setLocationInput] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const handleLocationChange = (event, newValue) => {
    setLocationInput(newValue);
  };

  const fetchLocationSuggestions = async (inputValue) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=AIzaSyBv-zpXWYxisfm3w13xs176U1onsgOKkco`
      );
      if (response.data.predictions) {
        setLocationOptions(response.data.predictions);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSetLocation = () => {
    // Handle setting the selected location
    console.log("Selected Location:", locationInput);
  };

  const updatePreferences = async (updatedPreferences) => {
    console.log("data", updatedPreferences);

    try {
      const response = await dispatch(
        updateUserPreferences(updatedPreferences)
      );
      console.log("data response", response);
      return response;
    } catch (error) {
      // Handle error
      return { success: false, error: "Failed to update preferences" };
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const errors = validateFields();
    setFieldErrors(errors);
  }, [userFormData]);
  return (
    <Container maxWidth="lg">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <PageHeader title="Profile" description="short user" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Avatar
            alt={currentUser.userProfile.firstName}
            src={profileImageUrl}
            sx={{ width: 200, height: 200, mx: "auto", mb: 2 }}
          />
          <Typography variant="h6" align="center">
            {currentUser.userProfile.firstName}{" "}
            {currentUser.userProfile.lastName}
          </Typography>
          <Box textAlign="center">
            <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
              Upload Photo
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              position: "initial",
              borderRadius: "4px",
              borderColor: "rgba(0, 0, 0, 0.23)",
              boxShadow: "none", // Remove drop-shadow
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                {" "}
                Basic Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>You can sign in with your email address.</p>

              <TextField
                required
                id="outlined-required"
                fullWidth
                name="firstName"
                label="First Name"
                onChange={handleInputChange}
                value={userFormData.firstName}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
              />
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
                value={userFormData.lastName}
                sx={{
                  mt: 2,

                  width: "100%", // Add width to ensure the form is 100% wide
                }}
                // Add flexGrow to make the second field take equal space
              />
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                disabled
                sx={{
                  mt: 2,
                }} // Add flexGrow and marginRight to create space between fields
              />

              <TextField
                required
                fullWidth
                id="outlined-required"
                label="South African Id Number"
                defaultValue="Enter Id number"
                name="idNumber"
                onChange={handleInputChange}
                value={userFormData.idNumber}
                error={!!fieldErrors.idNumber}
                helperText={fieldErrors.idNumber}
                sx={{
                  mt: 2,
                }}
              />
              <TextField
                required
                fullWidth
                id="outlined-required"
                name="cellphoneNumber"
                label="Cellphone Number"
                onChange={handleInputChange}
                value={userFormData.cellphoneNumber}
                error={!!fieldErrors.cellphoneNumber}
                helperText={fieldErrors.cellphoneNumber}
                sx={{
                  mt: 2,
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
              <Box sx={{ mt: 3 }}>
                <Button
                  startIcon={<SettingsIcon />}
                  variant="contained"
                  onClick={handleUpdateProfile}
                >
                  Update Information
                </Button>
              </Box>
            </AccordionDetails>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              position: "initial",
              borderRadius: "4px",
              borderColor: "rgba(0, 0, 0, 0.23)",
              boxShadow: "none", // Remove drop-shadow
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Edit User Preferences
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Email Notifications</Typography>
                  <Typography variant="body2">
                    Receive email notifications for updates.
                  </Typography>
                  <Switch
                    checked={emailNotifications}
                    onChange={handleEmailNotificationChange}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Push Notifications</Typography>
                  <Typography variant="body2">
                    Receive push notifications on your device.
                  </Typography>
                  <Switch
                    checked={pushNotifications}
                    onChange={handlePushNotificationChange}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "4px",
              borderColor: "rgba(0, 0, 0, 0.23)",
              boxShadow: "none", // Remove drop-shadow
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Edit Location
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Alert severity="success">
                    This is a success alert — check it out!
                  </Alert>

                  <p>
                    To change your password, please fill in your old password as
                    well as the new password you want to use.
                  </p>

                  <Box>
                  <Autocomplete
        freeSolo
        options={locationOptions.map((option) => option.description)}
        value={locationInput}
        onChange={handleLocationChange}
        onInputChange={(event, newValue) => {
          setLocationInput(newValue);
          fetchLocationSuggestions(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search location" variant="outlined" fullWidth />
        )}
      />
                  </Box>

                  <Button sx={{ mt: 3 }} variant="contained">
                    Set location
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "4px",
              borderColor: "rgba(0, 0, 0, 0.23)",
              boxShadow: "none", // Remove drop-shadow
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" gutterBottom>
                Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Alert severity="success">
                    This is a success alert — check it out!
                  </Alert>

                  <p>
                    To change your password, please fill in your old password as
                    well as the new password you want to use.
                  </p>

                  <Box
                    component="form"
                    sx={{
                      my: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "49%", // Add width to ensure the form is 100% wide
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      required
                      id="outlined-required"
                      label="Old Password"
                      defaultValue="Hello World"
                      sx={{ flexGrow: 1 }} // Add flexGrow and marginRight to create space between fields
                    />
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      my: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%", // Add width to ensure the form is 100% wide
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      required
                      id="outlined-required"
                      label="New Passwords"
                      defaultValue="Hello World"
                      sx={{ flexGrow: 1, marginRight: 2 }} // Add flexGrow and marginRight to create space between fields
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Confirm new password"
                      defaultValue="Hello World"
                      sx={{ flexGrow: 1 }} // Add flexGrow to make the second field take equal space
                    />
                  </Box>

                  <Button sx={{ mt: 3 }} variant="contained">
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
  sx={{
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
    position: "initial",
    borderColor: "rgba(0, 0, 0, 0.23)",
    boxShadow: "none", // Remove drop-shadow
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography variant="subtitle2" gutterBottom>
      Delete Profile
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1">
          Are you sure you want to delete your profile? This action cannot be undone.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" color="error" onClick={handleOpenConfirmDialog}>
            Delete Profile
          </Button>
        </Box>
        <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirm Profile Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To confirm the profile deletion, please enter your first name.
            </DialogContentText>
            <TextField
              fullWidth
              label="Enter Your First Name"
              value={firstNameInput}
              onChange={(event) => setFirstNameInput(event.target.value)}
              sx={{
                mt: 2,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (firstNameInput === currentUser.userProfile.firstName) {
                  // Perform the profile deletion
                  // Call the delete profile function here
                  handleCloseConfirmDialog();
                } else {
                  // Display an error message
                  setSnackbarMessage("First name does not match the profile's first name.");
                  setSnackbarSeverity("error");
                  setSnackbarOpen(true);
                }
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  </AccordionDetails>
</Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;
