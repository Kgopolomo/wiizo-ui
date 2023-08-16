import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { InfoRounded, PeopleRounded, MoreVert as MoreVertIcon } from '@mui/icons-material';

const RequiredItemCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    // Handle menu item clicks here
    console.log('Action:', action);
    handleMenuClose();
  };

  return (
    <Card variant="outlined" sx={{ display: 'flex', p: 1, mb: 2 }}>
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt="123 Main St, Phoenix, AZ cover"
        src="/static/images/cards/real-estate.png"
        sx={{
          borderRadius: 0.5,
          width: { xs: '100%', sm: 100 },
          mr: { sm: 1.5 },
          mb: { xs: 1.5, sm: 0 },
        }}
      />
      <Box sx={{ alignSelf: 'center', ml: 2, flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Item Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Listed by: John Doe
        </Typography>
        <Typography component="div" fontWeight="bold" gutterBottom>
          $280k - $310k
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Chip
            icon={<InfoRounded />}
            label="Confidence score of 85%"
            sx={{
              fontSize: 12,
              mr: 1,
              borderRadius: '4px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#fff' : 'primary.700',
            }}
          />
          <Chip
            icon={<PeopleRounded />}
            label="5 people required"
            sx={{
              fontSize: 12,
              borderRadius: '4px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'info.900' : 'info.50',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#fff' : 'info.700',
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontStyle: 'italic' }}
        >
          Required Date: August 15, 2023
        </Typography>
      </Box>
      <IconButton
        aria-label="settings"
        sx={{ alignSelf: 'flex-start' }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('Edit')}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Delete')}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default RequiredItemCard;