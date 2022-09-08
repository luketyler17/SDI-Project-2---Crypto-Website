import React, { useContext, useMemo, useState } from 'react';
import { CoinContext } from '../App';
import {
  Box,
  Paper,
  Grid,
  CardActionArea,
  Typography,
  List,
  ListItem,
  Divider,
} from '@mui/material/';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const marketTime = time => {
  let marketTime = new Date(time * 1000);
  return marketTime.toLocaleString();
};

export const ExchangeDetail = () => {
  const { marketInfo, setMarketInfo } = useContext(CoinContext);
  const navigate = useNavigate();
  const { name } = useParams();
  const [currentMarket, setCurrentMarket] = useState(null);
  const [exchangeData, setExchangeData] = useState(null);
  const theme = useTheme();
  // console.log(marketInfo);

  useMemo(() => {
    for (let market of marketInfo) {
      if (market.name === name) setCurrentMarket(market);
    }
  }, [name, marketInfo]);

  // fetch coin market info
  useMemo(() => {
    if (currentMarket !== null) {
      console.log('fetchin current market info');
      fetch(`https://api.coinlore.net/api/exchange/?id=${currentMarket.id}`)
        .then(res => res.json())
        .then(data => {
          setExchangeData(data.pairs);
        });
    }
  }, [currentMarket]);

  console.log('current market info', currentMarket);
  // console.log(exchangeData);
  return (
    <>
      {currentMarket !== null ? (
        <Box white='100vw'>
          <Paper sx={{ height: 'fit-content' }} elevation={6}>
            <Grid
              container
              spacing={2}
              sx={{ margin: '3rem' }}
              alignItems='center'
            >
              <Grid item xs={4}>
                <Typography variant='h1' component='span'>
                  {currentMarket.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h5' component='span'>
                  Launch Date:{' '}
                  {currentMarket.date_live !== null
                    ? `${currentMarket.date_live}`
                    : ' N/A'}
                  <br />
                  Country:{' '}
                  {currentMarket.country !== ''
                    ? `${currentMarket.country}`
                    : ' N/A'}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h5' component='span'>
                  <a
                    href={currentMarket.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      color: `${theme.palette.text.primary}`,
                    }}
                  >
                    {currentMarket.url}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          {exchangeData !== null ? (
            <Grid container spacing={2} sx={{ marginY: '3rem' }}>
              {exchangeData.map(pair => {
                if (pair.base === null || pair.quote === null) return null;

                return (
                  <Grid item xs={3} key={`grid${pair.volume}${pair.base}`}>
                    <CardActionArea
                      onClick={() => {
                        navigate(`/compare/${pair.base},${pair.quote}`);
                      }}
                      key={`cardAct${pair.volume}${pair.base}`}
                    >
                      <Paper
                        elevation={4}
                        key={`paper${pair.volume}${pair.base}`}
                        sx={{
                          '&:hover': {
                            transform: 'scale(1.05,1.05)',
                            transformTimingFunction: 'ease',
                          },
                        }}
                      >
                        <Box
                          key={`box${pair.volume}${pair.name}`}
                          sx={{
                            padding: '.5rem',
                            height: 'fit-content',
                            '&:hover': {
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                        >
                          <Grid container alignItems='center'>
                            <Grid
                              item
                              xs={4}
                              sx={{
                                textAlign: 'center',
                              }}
                              alignItems='center'
                            >
                              <img
                                onError={e => {
                                  e.onerror = null;
                                  e.target.src = `/images/coins/color/generic.svg`;
                                }}
                                src={`/images/coins/color/${pair.base.toLowerCase()}.svg`}
                                alt={pair.symbol}
                                style={{
                                  height: '1.5rem',
                                  marginRight: '5px',
                                }}
                              />

                              <Typography variant='h5' component='span'>
                                {pair.base}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={3.5}
                              sx={{
                                textAlign: 'center',
                              }}
                              alignItems='center'
                            >
                              <Typography variant='h5' component='span'>
                                to
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <img
                                onError={e => {
                                  e.onerror = null;
                                  e.target.src = `/images/coins/color/generic.svg`;
                                }}
                                src={`/images/coins/color/${pair.quote.toLowerCase()}.svg`}
                                alt={pair.symbol}
                                style={{
                                  height: '1.5rem',
                                  marginRight: '5px',
                                }}
                              />
                              <Typography variant='h5' component='span'>
                                {pair.quote}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Divider variant='middle'>Information</Divider>
                          <Grid container alignItems='center'>
                            <Grid
                              item
                              xs={4}
                              sx={{
                                textAlign: 'left',
                                marginLeft: '10%',
                              }}
                              alignItems='center'
                            >
                              <List dense>
                                <ListItem>Volume:</ListItem>
                                <ListItem>Pair Price:</ListItem>
                                <ListItem>Price USD:</ListItem>
                                <ListItem>Query Time:</ListItem>
                              </List>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                textAlign: 'right',
                              }}
                              alignItems='center'
                            >
                              <List dense>
                                <ListItem>
                                  {Number(pair.volume).toLocaleString()}
                                </ListItem>
                                <ListItem>
                                  {Number(pair.price).toLocaleString()}
                                </ListItem>
                                <ListItem>
                                  {Number(pair.price_usd).toLocaleString()}
                                </ListItem>
                                <ListItem>{marketTime(pair.time)}</ListItem>
                              </List>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </CardActionArea>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <h1>Loading</h1>
          )}
        </Box>
      ) : (
        <>
          <h1>Loading</h1>
        </>
      )}
    </>
  );
};
