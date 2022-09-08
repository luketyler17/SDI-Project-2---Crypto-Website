import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Skeleton,
  Grid,
} from '@mui/material';
import SplashPage from './Splash/SplashPage';
import { useCoinLore, useMarketFetch } from './useCoinLore';
import SearchResults from './SearchResults/SearchResults.jsx';
import AdvancedSearch from './AdvancedSearch/advancedsearch';
import { CoinDetail } from './CoinDetail/CoinDetail';
import { FourOFour } from './FourOFour';
import ExchangeSearch from './ExchangeSearch/ExchangeSearch.jsx';
import { ExchangeDetail } from './ExchangeDetail/ExchangeDetail.jsx';
import { CompareCoin } from './CompareCoin/CompareCoin.jsx';

export const CoinContext = React.createContext();

const App = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading, coinInfo, setCoinInfo, serverError] =
    useCoinLore([page, search]);
  const [marketInfo, setMarketInfo] = useMarketFetch();
  const [mode, setMode] = useState('light');
  const [bgColor, setBgColor] = useState('#f8f8ff');

  let skelArray = [];
  for (let i = 0; i < 36; i++) {
    skelArray.push(i);
  }

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
        setBgColor(prevMode =>
          prevMode === '#f8f8ff' ? '#303030' : '#f8f8ff'
        );
      },
    }),
    []
  );

  const passContext = {
    coinInfo,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    colorMode,
    mode,
    marketInfo,
    setMarketInfo,
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#703fb5',
            light: '#8C65C3',
            dark: '#4E2C7E',
          },
          secondary: {
            main: '#B4373D',
            light: '#C35F63',
            dark: '#7D262A',
          },
          background: {
            default: bgColor,
          },
        },
      }),
    [mode, bgColor]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CoinContext.Provider value={passContext}>
          <CssBaseline />
          <NavBar />
          <Container maxWidth='xl'>
            <Routes>
              <Route
                path='/'
                element={
                  !isLoading ? (
                    <SplashPage />
                  ) : (
                    <>
                      <Skeleton
                        variant='text'
                        sx={{ fontSize: '14rem', marginTop: '10rem' }}
                      />
                      <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
                        <Grid item xs={3}>
                          <Skeleton variant='circular' width={50} height={50} />
                          <Skeleton
                            variant='rounded'
                            width={300}
                            height={250}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Skeleton variant='circular' width={50} height={50} />
                          <Skeleton
                            variant='rounded'
                            width={300}
                            height={250}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Skeleton variant='circular' width={50} height={50} />
                          <Skeleton
                            variant='rounded'
                            width={300}
                            height={250}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Skeleton variant='circular' width={50} height={50} />
                          <Skeleton
                            variant='rounded'
                            width={300}
                            height={250}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )
                }
              ></Route>
              <Route
                path='/search'
                element={
                  !isLoading ? (
                    <SearchResults />
                  ) : (
                    <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                      {skelArray.map(index => (
                        <Grid item xs={3} key={index}>
                          <Skeleton variant='circular' width={40} height={40} />
                          <Skeleton variant='rounded' width={350} height={70} />
                        </Grid>
                      ))}
                    </Grid>
                  )
                }
              />
              <Route
                path='/advancedsearch'
                element={!isLoading ? <AdvancedSearch /> : <h1>Loading...</h1>}
              ></Route>
              <Route
                path='/coin/:id'
                element={!isLoading ? <CoinDetail /> : <h1>Loading...</h1>}
              />
              <Route path='*' element={<FourOFour />}></Route>
              <Route
                path='/exchange'
                element={
                  !isLoading ? (
                    <ExchangeSearch style={{ height: '100%' }} />
                  ) : (
                    <Grid container sx={{ marginTop: '1rem' }}>
                      <Grid item xs={12}>
                        <Skeleton variant='rounded' height={500} />
                      </Grid>
                    </Grid>
                  )
                }
              />
              <Route
                path='/exchange/:name'
                element={
                  !isLoading && marketInfo !== null ? (
                    <ExchangeDetail style={{ height: '100%' }} />
                  ) : (
                    <h1>Loading...</h1>
                  )
                }
              />
              <Route
                path='/compare/:pair'
                element={
                  !isLoading && marketInfo !== null ? (
                    <CompareCoin style={{ height: '100%' }} />
                  ) : (
                    <h1>Loading...</h1>
                  )
                }
              />
            </Routes>
          </Container>
        </CoinContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
