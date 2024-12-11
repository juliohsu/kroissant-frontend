import React from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImage from '../../../../assets/inicio-bg.jpg'; // Update the path and filename accordingly
import logoImage from '../../../../assets/inicio-logo.png'; // Update the path to your logo image

const Inicio: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile

  return (
    <Box
      sx={{
        height: isMobile ? '78vh' : '85vh', // Use 85vh on mobile, 92vh otherwise
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '1px 1px 2px black',
        textAlign: 'center',
        padding: '0 1rem', // Adjust padding as needed
      }}
    >
      <img 
        src={logoImage} 
        alt="Logo" 
        style={{
          width: '200px', // Adjust width as needed
          marginBottom: '1rem', // Adjust margin as needed
        }} 
      />
      
      <Typography 
        variant="h1" 
        sx={{
          fontSize: {
            xs: '3rem',  // small screen
            sm: '4rem',  // medium screen
            md: '4rem',  // large screen
            lg: '5rem',  // extra large screen
            xl: '6rem'   // ultra large screen
          },
          marginBottom: '1rem', // Adjust margin as needed
        }}
      >
        CROISSANT AUTÊNTICO.
      </Typography>
    </Box>
  );
}

export default Inicio;
