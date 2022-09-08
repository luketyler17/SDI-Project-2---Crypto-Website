import React, { useContext } from 'react';
import { CoinContext } from './App';
import { Box, Paper, Grid, CardActionArea, Typography } from '@mui/material/';
import { useParams, useNavigate } from 'react-router-dom';

export const FourOFour = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          textAlign: 'right',
          marginTop: '1%',
        }}
      >
        <Typography variant='h1' component='span' sx={{ fontSize: '20rem' }}>
          404
        </Typography>
        <br />
        <Typography variant='h2' component='span' sx={{ fontSize: '10rem' }}>
          Uh oh,
          <br /> wrong
          <br /> location!
        </Typography>
      </Box>
      <img
        src='/images/404.png'
        alt='404'
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          height: '70vh',
          maxHeight: '80vh',
          maxWidth: '80vw',
        }}
      />
    </>
  );
};
