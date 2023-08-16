import React from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const PageHeader = ({ title, description, onBackClick, breadcrumbs }) => {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& > *': {
        marginBottom: '8px',
      },
    },
  };

  const backButtonStyle = {
    marginRight: '16px',
  };

  return (
    <Box style={headerStyle}>
      {onBackClick && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          style={backButtonStyle}
          onClick={onBackClick}
        >
          Back
        </Button>
      )}
      <Box>
        <Typography variant="h5" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </Box>
      {breadcrumbs && (
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <Link key={index} color="inherit" href={breadcrumb.link}>
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default PageHeader;