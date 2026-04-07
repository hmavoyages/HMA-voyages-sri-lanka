import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = ({ fullScreen = true }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullScreen ? '100vh' : '400px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img 
          src="/hma-logo.jpg" 
          alt="HMA Voyages Loading" 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
          }} 
        />
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
