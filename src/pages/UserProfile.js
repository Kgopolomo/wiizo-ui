import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Settings as SettingsIcon, Notifications as NotificationsIcon } from '@mui/icons-material';


function UserProfile(props) {
   // Replace 'YourUserName' with the actual username, and 'YourProfileImageUrl' with the URL of the user's profile image
  const userName = 'YourUserName';
  const profileImageUrl = 'YourProfileImageUrl';

  // Sample data for requested items and booked items
  const requestedItems = ['Item 1', 'Item 2', 'Item 3'];
  const bookedItems = ['Item 4', 'Item 5'];

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar alt={userName} src={profileImageUrl} sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }} />
            <Typography variant="h6" align="center">
              {userName}
            </Typography>
            <Box textAlign="center">
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Upload Photo
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum fringilla metus, vel fringilla
              odio auctor sit amet.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Requested Items
            </Typography>
            <List dense>
              {requestedItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Booked Items
            </Typography>
            <List dense>
              {bookedItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Button startIcon={<SettingsIcon />} variant="outlined">
          Account Settings
        </Button>
        <IconButton sx={{ ml: 2 }} color="primary">
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default UserProfile;