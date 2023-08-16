import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { EventRounded, MoreVert as MoreVertIcon } from '@mui/icons-material';

const BookedItemCard = () => {
  return (
    <Card variant="outlined" sx={{ display: 'flex', p: 1, mb: 2 }}>
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt="Booked Item Image"
        src="/static/images/cards/booked-item.png"
        sx={{
          borderRadius: 0.5,
          width: { xs: '100%', sm: 100 },
          mr: { sm: 1.5 },
          mb: { xs: 1.5, sm: 0 },
        }}
      />
      <Box sx={{ alignSelf: 'center', ml: 2, flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Booked Item Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Booked by: Jane Doe
        </Typography>
        <Typography component="div" fontWeight="bold" gutterBottom>
          $150 per day
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Chip
            icon={<EventRounded />}
            label="Booked from Aug 10, 2023 to Aug 12, 2023"
            sx={{
              fontSize: 12,
              mr: 1,
              borderRadius: '4px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'success.900' : 'success.50',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#fff' : 'success.700',
            }}
          />
        </Box>
      </Box>
      <MoreVertIcon sx={{ alignSelf: 'flex-start', ml: 'auto' }} />
    </Card>
  );
};

export default BookedItemCard;