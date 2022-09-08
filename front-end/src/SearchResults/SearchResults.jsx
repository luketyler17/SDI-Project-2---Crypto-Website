import React, { useContext } from 'react';
import { CoinContext } from '../App';
import {
  Box,
  Paper,
  Grid,
  CardActionArea,
  Pagination,
  Typography,
} from '@mui/material/';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const { coinInfo, page, setPage, search } = useContext(CoinContext);
  const navigate = useNavigate();

  // console.log('search in results', search);
  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', marginY: '1rem', justifyContent: 'center' }}
      >
        {search === '' ? (
          <Box>
            <Pagination
              count={108}
              color='secondary'
              siblingCount={3}
              page={page / 100 + 1}
              onChange={(event, value) => {
                let pageQuery = (value - 1) * 100;
                console.log(pageQuery);
                setPage(pageQuery);
              }}
            />
          </Box>
        ) : (
          <></>
        )}
      </Grid>
      <Grid container spacing={2} sx={{ marginY: '1rem' }}>
        {coinInfo.map(coin => (
          <Grid item xs={3} key={`grid item${coin.id}`}>
            <CardActionArea onClick={() => navigate(`/coin/${coin.id}`)}>
              <Paper
                key={`paper${coin.id}`}
                elevation={3}
                sx={{
                  minHeight: '4.rem',
                  '&:hover': {
                    transform: 'scale(1.05,1.05)',
                    transformTimingFunction: 'ease',
                  },
                }}
              >
                <Box
                  sx={{
                    padding: '.5rem',
                    // backgroundColor: 'primary.main',
                    '&:hover': {
                      // backgroundColor: 'primary.light',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  key={`box${coin.id}`}
                >
                  <Grid container>
                    <Grid item xs={2} alignItems='center' left>
                      <img
                        onError={e => {
                          e.onerror = null;
                          e.target.src = `/images/coins/color/generic.svg`;
                        }}
                        src={`/images/coins/color/${coin.symbol.toLowerCase()}.svg`}
                        alt={coin.symbol}
                        style={{ height: '3rem' }}
                        key={`img${coin.id}`}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      alignItems='center'
                      sx={{ textAlign: 'center' }}
                    >
                      <Typography variant='h5' align='center'>
                        {coin.name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      alignItems='center'
                      sx={{ textAlign: 'center' }}
                    >
                      <Typography variant='subtitle1' component='span'>
                        # {coin.rank}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </CardActionArea>
          </Grid>
        ))}
        <Grid
          container
          sx={{ display: 'flex', marginY: '1rem', justifyContent: 'center' }}
        >
          {search === '' ? (
            <Box>
              <Pagination
                count={108}
                color='secondary'
                siblingCount={3}
                page={page / 100 + 1}
                onChange={(event, value) => {
                  let pageQuery = (value - 1) * 100;
                  console.log(pageQuery);
                  setPage(pageQuery);
                }}
              />
            </Box>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchResults;
