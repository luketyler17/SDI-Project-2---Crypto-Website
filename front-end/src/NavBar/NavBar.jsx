import React, { useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { CoinContext } from '../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
  const { setSearch, setUrl, colorMode } = useContext(CoinContext);
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
            onClick={() => {
              navigate('/', { replace: false });
              setSearch('');
            }}
          >
            <img
              src='/images/vector/default-Logo.svg'
              alt='logo'
              style={{ width: 'auto', height: '2rem' }}
            />
          </IconButton>
          <MenuItem onClick={() => navigate('/search', { replace: false })}>
            <Typography textAlign='center'>Coins</Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate('/exchange', { replace: false })}>
            <Typography textAlign='center'>Exchanges</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/advancedsearch', { replace: false });
            }}
          >
            <Typography textAlign='center'>Advanced Search</Typography>
          </MenuItem>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          ></Typography>
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color='inherit'
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Name/Symbol...'
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={event => {
                if (event.key === 'Enter') {
                  navigate('/search', { replace: false });
                  setSearch(event.target.value);
                  // setUrl(`${event.target.value}`);
                  console.log(event.target.value);
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
