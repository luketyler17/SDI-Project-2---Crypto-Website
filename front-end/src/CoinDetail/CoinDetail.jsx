import React, { useContext, useState, useMemo } from 'react';
import { CoinContext } from '../App';
import {
  Box,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  Skeleton,
  Divider,
  CardActionArea,
} from '@mui/material/';
import { useParams, useNavigate } from 'react-router-dom';

const valueCheck = coinInput => {
  if (coinInput > 0) {
    return (
      <>
        <Typography component='p' color='Green'>
          {coinInput}
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
        <Typography component='p' color='Red'>
          {coinInput}
        </Typography>
        <img
          src='/images/Red_Arrow_Down.svg'
          alt='green arrow up'
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

const marketTime = time => {
  let marketTime = new Date(time * 1000);
  return marketTime.toLocaleString();
};

export const CoinDetail = () => {
  const { coinInfo } = useContext(CoinContext);
  const [marketData, setMarketData] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  let currentCoin = coinInfo.filter(coin => coin.id === id);
  let coin = currentCoin[0];

  if (coin === undefined) {
    navigate('../search', { replace: true });
  }

  let skelArray = [];
  for (let i = 0; i < 12; i++) {
    skelArray.push(i);
  }

  // fetch coin market info
  useMemo(() => {
    fetch(`https://api.coinlore.net/api/coin/markets/?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setMarketData(data);
      });
  }, [id]);

  return (
    <>
      {coin !== undefined ? (
        <Grid container sx={{ marginY: '3rem' }}>
          <Grid item xs={12}>
            <Paper sx={{ height: 'fit-content' }} elevation={6}>
              <Grid container>
                <Grid item xs={1.5}>
                  <img
                    onError={e => {
                      e.onerror = null;
                      e.target.src = `/images/coins/color/generic.svg`;
                    }}
                    src={`/images/coins/color/${coin.symbol.toLowerCase()}.svg`}
                    alt={coin.symbol}
                    style={{ height: '8rem', margin: '15px' }}
                  />
                </Grid>
                <Grid item xs={9.5}>
                  <Typography
                    variant='h1'
                    component='p'
                    sx={{ marginTop: '2rem', fontSize: 'fit-content' }}
                  >
                    {coin.name}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle'>Information</Divider>
              <Grid container sx={{ paddingY: '1rem', paddingX: '5rem' }}>
                <Grid item xs={4}>
                  <Typography variant='h3' component='p'>
                    Coin Data
                  </Typography>
                  <Grid container sx={{ marginY: '2rem' }}>
                    <Grid item xs={4} sx={{ float: 'left' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>ID:</ListItem>
                          <ListItem>Symbol:</ListItem>
                          <ListItem>Name ID:</ListItem>
                          <ListItem>Market Rank:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ float: 'left' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>{coin.id}</ListItem>
                          <ListItem>{coin.symbol}</ListItem>
                          <ListItem>{coin.nameid}</ListItem>
                          <ListItem>{coin.rank}</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h3' component='p'>
                    Price Data
                  </Typography>
                  <Grid container sx={{ marginY: '2rem' }}>
                    <Grid item xs={5} sx={{ float: 'left' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>Price to USD:</ListItem>
                          <ListItem>Price to BTC:</ListItem>
                          <ListItem>Change% 24 Hour:</ListItem>
                          <ListItem>Change% 1 Hour:</ListItem>
                          <ListItem>Change% 7 Days:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ float: 'right' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>{coin.price_usd}</ListItem>
                          <ListItem>{coin.price_btc}</ListItem>
                          <ListItem>
                            {valueCheck(coin.percent_change_24h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(coin.percent_change_1h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(coin.percent_change_7d)}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant='h3' component='p'>
                    Market Data
                  </Typography>
                  <Grid container sx={{ marginY: '2rem' }}>
                    <Grid item xs={5} sx={{ float: 'left' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>Market Cap:</ListItem>
                          <ListItem>Market Volume 24:</ListItem>
                          <ListItem>Market Volume 24a:</ListItem>
                          {coin.msupply !== '' ? (
                            <ListItem>Market Supply:</ListItem>
                          ) : (
                            <></>
                          )}
                          <ListItem>Coin Supply:</ListItem>
                          <ListItem>Coin Total Supply:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ float: 'left' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>
                            {Number(coin.market_cap_usd).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(coin.volume24).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(coin.volume24a).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {coin.msupply !== '' ? (
                              <>{Number(coin.msupply).toLocaleString()}</>
                            ) : (
                              <></>
                            )}
                          </ListItem>
                          <ListItem>
                            {Number(coin.csupply).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {Number(coin.tsupply).toLocaleString()}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {marketData !== null ? (
        <Grid container spacing={2} sx={{ marginY: '3rem' }}>
          {marketData.map(market => {
            if (market.name === null) {
              return null;
            } else {
              return (
                <Grid item xs={3} key={`grid${market.volume}${market.name}`}>
                  <CardActionArea
                    onClick={() => navigate(`/exchange/${market.name}`)}
                  >
                    <Paper
                      elevation={4}
                      key={`paper${market.volume}${market.name}`}
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.05,1.05)',
                          transformTimingFunction: 'ease',
                        },
                      }}
                    >
                      <Box
                        key={`box${market.volume}${market.name}`}
                        sx={{
                          padding: '.5rem',
                          height: 'fit-content',
                          '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                      >
                        <Typography
                          variant='h4'
                          sx={{ marginX: '1rem', marginTop: '.5rem' }}
                        >
                          {market.name}
                        </Typography>
                        <Divider variant='middle'></Divider>
                        <Box>
                          <Typography variant='subtitle2' component='span'>
                            <List dense>
                              <ListItem>
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
                                      src={`/images/coins/color/${market.base.toLowerCase()}.svg`}
                                      alt={coin.symbol}
                                      style={{
                                        height: '1.5rem',
                                        marginRight: '5px',
                                      }}
                                    />

                                    <Typography variant='h5' component='span'>
                                      {market.base}
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
                                      src={`/images/coins/color/${market.quote.toLowerCase()}.svg`}
                                      alt={coin.symbol}
                                      style={{
                                        height: '1.5rem',
                                        marginRight: '5px',
                                      }}
                                    />
                                    <Typography variant='h5' component='span'>
                                      {market.quote}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            </List>
                            <Divider variant='middle'>Exchange</Divider>
                            <Grid container alignItems='center'>
                              <Grid
                                item
                                xs={5}
                                sx={{
                                  textAlign: 'center',
                                }}
                                alignItems='center'
                              >
                                <List dense>
                                  <ListItem>Price: </ListItem>
                                  <ListItem>USD Price: </ListItem>
                                  <ListItem>Volume: </ListItem>
                                  <ListItem>Volume USD: </ListItem>
                                  <ListItem>Market Time: </ListItem>
                                </List>
                              </Grid>
                              <Grid
                                item
                                xs={7}
                                sx={{
                                  textAlign: 'center',
                                }}
                                alignItems='center'
                              >
                                <List dense>
                                  <ListItem>
                                    ${Number(market.price).toLocaleString()}
                                  </ListItem>
                                  <ListItem>
                                    ${Number(market.price_usd).toLocaleString()}
                                  </ListItem>
                                  <ListItem>
                                    {`#`}
                                    {Number(market.volume).toLocaleString()}
                                  </ListItem>
                                  <ListItem>
                                    {`#`}
                                    {Number(market.volume_usd).toLocaleString()}
                                  </ListItem>
                                  <ListItem>{marketTime(market.time)}</ListItem>
                                </List>
                              </Grid>
                            </Grid>
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </CardActionArea>
                </Grid>
              );
            }
          })}
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginY: '3rem' }}>
            {skelArray.map(index => (
              <Grid item xs={3} key={index}>
                <Skeleton variant='rounded' width={300} height={200} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
