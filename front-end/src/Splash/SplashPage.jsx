import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CardActionArea,
  ListItem,
  List,
  Divider,
} from '@mui/material/';
import { useContext, useState } from 'react';
import { CoinContext } from '../App';
import { useEffect } from 'react';
import MarketComponent from './MarketComponent';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const { coinInfo, url, setUrl, mode } = useContext(CoinContext);
  const numDisplayed = ['0', '1', '2', '3'];
  const navigate = useNavigate();
  const [marketInfo, setMarketInfo] = useState([]);
  useEffect(() => {
    fetch('https://api.coinlore.net/api/exchanges/')
      .then(res => res.json())
      .then(data => {
        setMarketInfo(data);
      });
  }, []);

  const valueCheck = coinInput => {
    if (coinInput > 0) {
      return (
        <>
          <Typography component='span' color='green'>
            {coinInput} %
          </Typography>
          <img
            src='/images/Green_Arrow_Up.svg'
            alt='green arrow up'
            style={{
              maxWidth: '1rem',
              maxHeight: '1rem',
              position: 'relative',
              left: '1rem',
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Typography component='span' color='red'>
            {coinInput} %
          </Typography>
          <img
            src='/images/Red_Arrow_Down.svg'
            alt='green arrow down'
            style={{
              maxWidth: '1rem',
              maxHeight: '1rem',
              direction: 'rtl',
              margin: '0',
              position: 'relative',
              left: '1rem',
            }}
          />
        </>
      );
    }
  };

  //
  return (
    <>
      <Box>
        {mode === 'light' ? (
          <img
            id='logoImg'
            src='/images/vector/default-monochrome.svg'
            alt='mainlogo'
            style={{
              height: '9rem',
              width: '100%',
              marginBottom: '9rem',
              marginTop: '9rem',
            }}
          />
        ) : (
          <img
            id='logoImg'
            src='/images/vector/default-monochrome-white.svg'
            alt='mainlogo'
            style={{
              height: '9rem',
              width: '100%',
              marginBottom: '9rem',
              marginTop: '9rem',
            }}
          />
        )}
      </Box>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        {numDisplayed.map(index => (
          <Grid item xs={3} key={`grid-item${index}`}>
            <CardActionArea
              onClick={() => navigate(`/coin/${coinInfo[index].id}`)}
            >
              <Paper
                elevation={4}
                key={coinInfo[index].name}
                sx={{
                  textAlign: 'left',
                  height: 'fit-content',
                  padding: '10px',
                  '&:hover': {
                    transform: 'scale(1.05,1.05)',
                    transformTimingFunction: 'ease',
                  },
                }}
              >
                <img
                  onError={e => {
                    e.onerror = null;
                    e.target.src = `/images/coins/color/generic.svg`;
                  }}
                  src={`/images/coins/color/${coinInfo[
                    index
                  ].symbol.toLowerCase()}.svg`}
                  alt={coinInfo[index].symbol}
                  style={{ height: '3rem', paddingRight: '10px' }}
                  key={`img${coinInfo[index].id}`}
                />
                <Typography
                  variant='h3'
                  component='span'
                  key={`coin-name${index}`}
                  sx={{ textAlign: 'center' }}
                >
                  {coinInfo[index].name}
                </Typography>{' '}
                <Typography
                  variant='subtitle2'
                  component='span'
                  sx={{ textAlign: 'right' }}
                  key={`coin-rank${index}`}
                >
                  <Typography
                    variant='h6'
                    component='span'
                    sx={{ float: 'right' }}
                  >
                    #{coinInfo[index].rank}
                  </Typography>
                </Typography>
                <Divider variant='middle'>Information</Divider>
                <Grid container>
                  <Grid item xs={6} sx={{ float: 'left' }}>
                    <List dense>
                      <ListItem>Ticker:</ListItem>
                      <ListItem>USD exchange:</ListItem>
                      <ListItem>Percent last 24h:</ListItem>
                      <ListItem>Percent last 7d:</ListItem>
                      <ListItem>Market Cap:</ListItem>
                      <ListItem>Trade volume 24h:</ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} sx={{ float: 'right' }}>
                    <List dense>
                      <ListItem>{coinInfo[index].symbol}</ListItem>
                      <ListItem>
                        {Number(coinInfo[index].price_usd).toLocaleString()}
                      </ListItem>
                      <ListItem>
                        {valueCheck(coinInfo[index].percent_change_24h)}
                      </ListItem>
                      <ListItem>
                        {valueCheck(coinInfo[index].percent_change_7d)}
                      </ListItem>
                      <ListItem>
                        $
                        {Number(
                          coinInfo[index].market_cap_usd
                        ).toLocaleString()}
                      </ListItem>
                      <ListItem>
                        ${Number(coinInfo[index].volume24).toLocaleString()}
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SplashPage;
