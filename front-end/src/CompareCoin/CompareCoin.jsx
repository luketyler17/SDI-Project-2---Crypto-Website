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
import { loadCoins } from '../loadCoins.js';
import { uniqWith, isEqual } from 'lodash';

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

export const CompareCoin = () => {
  const { coinInfo } = useContext(CoinContext);
  const [pairData, setPairData] = useState(null);
  const navigate = useNavigate();
  let { pair } = useParams();
  let coins = pair.split(',');
  let loadedCoins = loadCoins();
  let coinSelection = [];

  for (let i of coins) {
    // console.log(i);
    let currentFilter = loadedCoins.filter(
      coin =>
        coin.symbol.toString().toLowerCase() === i.toString().toLowerCase()
    );
    coinSelection.push(currentFilter[0]);
  }

  let url = `https://api.coinlore.net/api/ticker/?id=${coinSelection[0].id},${coinSelection[1].id}`;

  // console.log('url check', url);
  useMemo(() => {
    console.log('fetching pair info...');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPairData(data);
      });
  }, [url]);

  console.log('pair data', pairData);
  return (
    <>
      {pairData !== null ? (
        <>
          <Grid container spacing={2} sx={{ marginTop: '5rem' }}>
            <Grid item xs={4.5}>
              <Paper sx={{ height: 'fit-content' }} elevation={6}>
                <Box>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={3} sx={{ padding: '0' }}>
                      <img
                        onError={e => {
                          e.onerror = null;
                          e.target.src = `/images/coins/color/generic.svg`;
                        }}
                        src={`/images/coins/color/${pairData[0].symbol.toLowerCase()}.svg`}
                        alt={pairData[0].symbol}
                        style={{ height: '8rem', margin: '1rem' }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant='h2'
                        component='span'
                        sx={{ marginLeft: '2rem', fontSize: 'fit-content' }}
                      >
                        {pairData[0].name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Information</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>ID:</ListItem>
                          <ListItem>Symbol:</ListItem>
                          <ListItem>Name ID:</ListItem>
                          <ListItem>Market Rank:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>{pairData[0].id}</ListItem>
                          <ListItem>{pairData[0].symbol}</ListItem>
                          <ListItem>{pairData[0].nameid}</ListItem>
                          <ListItem>{pairData[0].rank}</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Price Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
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
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>${pairData[0].price_usd}</ListItem>
                          <ListItem>{pairData[0].price_btc}</ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_24h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_1h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_7d)}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Market Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>Market Cap:</ListItem>
                          <ListItem>Market Volume 24:</ListItem>
                          <ListItem>Market Volume 24a:</ListItem>
                          <ListItem>Market Supply:</ListItem>
                          <ListItem>Coin Supply:</ListItem>
                          <ListItem>Coin Total Supply:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>
                            $
                            {Number(
                              pairData[0].market_cap_usd
                            ).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(pairData[0].volume24).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(pairData[0].volume24a).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[0].msupply).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[0].csupply).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[0].tsupply).toLocaleString()}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: 'fit-content' }} elevation={6}>
                <Paper sx={{ height: 'fit-content' }} elevation={6}>
                  <Grid
                    container
                    spacing={2}
                    alignItems='center'
                    sx={{ paddingTop: '5rem', paddingBottom: '3rem' }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant='h4' component='span'>
                        Compare
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Information</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'right' }}
                      >
                        <List dense>
                          <ListItem>{pairData[0].id}</ListItem>
                          <ListItem>{pairData[0].symbol}</ListItem>
                          <ListItem>{pairData[0].nameid}</ListItem>
                          <ListItem>
                            {pairData[0].rank < pairData[1].rank ? (
                              <Typography color='Green'>
                                {`# `}
                                {Number(pairData[0].rank).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`# `}
                                {Number(pairData[0].rank).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'left' }}
                      >
                        <List dense>
                          <ListItem>{pairData[1].id}</ListItem>
                          <ListItem>{pairData[1].symbol}</ListItem>
                          <ListItem>{pairData[1].nameid}</ListItem>
                          <ListItem>
                            {pairData[1].rank < pairData[0].rank ? (
                              <Typography color='Green'>
                                {`# `}
                                {Number(pairData[1].rank).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`# `}
                                {Number(pairData[1].rank).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Price Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'right' }}
                      >
                        <List dense>
                          <ListItem>
                            {pairData[0].price_usd > pairData[1].price_usd ? (
                              <Typography color='Green'>
                                {pairData[0].price_usd}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {pairData[0].price_usd}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].price_btc > pairData[1].price_btc ? (
                              <Typography color='Green'>
                                {pairData[0].price_btc}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {pairData[0].price_btc}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_24h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_1h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[0].percent_change_7d)}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'left' }}
                      >
                        <List dense>
                          <ListItem>
                            {pairData[1].price_usd > pairData[0].price_usd ? (
                              <Typography color='Green'>
                                {pairData[1].price_usd}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {pairData[1].price_usd}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].price_btc > pairData[0].price_btc ? (
                              <Typography color='Green'>
                                {pairData[0].price_btc}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {pairData[0].price_btc}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_24h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_1h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_7d)}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Market Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'right' }}
                      >
                        <List dense>
                          <ListItem>
                            {pairData[0].market_cap_usd >
                            pairData[1].market_cap_usd ? (
                              <Typography color='Green'>
                                $
                                {Number(
                                  pairData[0].market_cap_usd
                                ).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                $
                                {Number(
                                  pairData[0].market_cap_usd
                                ).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].volume24 > pairData[1].volume24 ? (
                              <Typography color='Green'>
                                ${Number(pairData[0].volume24).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                ${Number(pairData[0].volume24).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].volume24a > pairData[1].volume24a ? (
                              <Typography color='Green'>
                                $
                                {Number(pairData[0].volume24a).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                $
                                {Number(pairData[0].volume24a).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].msupply > pairData[1].msupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[0].msupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[0].msupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].csupply > pairData[1].csupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[0].csupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[0].csupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[0].tsupply > pairData[1].tsupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[0].tsupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[0].tsupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{ float: 'left' }}
                      >
                        <List dense>
                          <ListItem>
                            {pairData[1].market_cap_usd >
                            pairData[0].market_cap_usd ? (
                              <Typography color='Green'>
                                $
                                {Number(
                                  pairData[1].market_cap_usd
                                ).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                $
                                {Number(
                                  pairData[1].market_cap_usd
                                ).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].volume24 > pairData[0].volume24 ? (
                              <Typography color='Green'>
                                ${Number(pairData[1].volume24).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                ${Number(pairData[1].volume24).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].volume24a > pairData[0].volume24a ? (
                              <Typography color='Green'>
                                $
                                {Number(pairData[1].volume24a).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                $
                                {Number(pairData[1].volume24a).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].msupply > pairData[0].msupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[1].msupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[1].msupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].csupply > pairData[0].csupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[1].csupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[1].csupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                          <ListItem>
                            {pairData[1].tsupply > pairData[0].tsupply ? (
                              <Typography color='Green'>
                                {`#`}
                                {Number(pairData[1].tsupply).toLocaleString()}
                              </Typography>
                            ) : (
                              <Typography color='Red'>
                                {`#`}
                                {Number(pairData[1].tsupply).toLocaleString()}
                              </Typography>
                            )}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={4.5}>
              <Paper sx={{ height: 'fit-content' }} elevation={6}>
                <Box>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={3} sx={{ padding: '0' }}>
                      <img
                        onError={e => {
                          e.onerror = null;
                          e.target.src = `/images/coins/color/generic.svg`;
                        }}
                        src={`/images/coins/color/${pairData[1].symbol.toLowerCase()}.svg`}
                        alt={pairData[1].symbol}
                        style={{ height: '8rem', margin: '1rem' }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant='h2'
                        component='span'
                        sx={{
                          marginLeft: '2rem',
                        }}
                      >
                        {pairData[1].name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Information</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>ID:</ListItem>
                          <ListItem>Symbol:</ListItem>
                          <ListItem>Name ID:</ListItem>
                          <ListItem>Market Rank:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>{pairData[1].id}</ListItem>
                          <ListItem>{pairData[1].symbol}</ListItem>
                          <ListItem>{pairData[1].nameid}</ListItem>
                          <ListItem>{pairData[1].rank}</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Price Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
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
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>${pairData[1].price_usd}</ListItem>
                          <ListItem>{pairData[1].price_btc}</ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_24h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_1h)}
                          </ListItem>
                          <ListItem>
                            {valueCheck(pairData[1].percent_change_7d)}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle'>Market Data</Divider>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>Market Cap:</ListItem>
                          <ListItem>Market Volume 24:</ListItem>
                          <ListItem>Market Volume 24a:</ListItem>

                          <ListItem>Market Supply:</ListItem>

                          <ListItem>Coin Supply:</ListItem>
                          <ListItem>Coin Total Supply:</ListItem>
                        </List>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: '1rem' }}>
                      <Typography variant='body1' component='span'>
                        <List dense>
                          <ListItem>
                            $
                            {Number(
                              pairData[1].market_cap_usd
                            ).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(pairData[1].volume24).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            ${Number(pairData[1].volume24a).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[1].msupply).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[1].csupply).toLocaleString()}
                          </ListItem>
                          <ListItem>
                            {`#`}
                            {Number(pairData[1].tsupply).toLocaleString()}
                          </ListItem>
                        </List>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <h1>loading..</h1>
        </>
      )}
    </>
  );
};
