import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';


const pages = ['Home', 'Create', 'Search', 'Users'];
const settings = ['Profile', 'Logout'];
const theme = createTheme({
  palette: {
    primary: {
      main: '#E5E0D8',
    },
    secondary: {
      main: '#725C3A',
    },
    error: {
      main: '#F44336',
    },
    success: {
      main: '#4CAF50',
    }
  },
})

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex'}
        }}>
            <IconButton className='menu'
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center"
                    sx={{
                      color: 'secondary.light',
                      '&:hover': {
                        color: 'secondary.dark',
                      },
                    }}
                    >{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            variant="h5"
            component="a"
            fontFamily='logo'
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'logo',
              fontSize: '45px',
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'secondary.light',
              '&:hover': {
                color: 'secondary.dark',
              },
            }}
          >
            linker
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ 
                  color: 'primary.main',
                  bgcolor: 'secondary.light',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}  onClick={handleCloseUserMenu}>
                  <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center"
                    sx={{
                      color: 'secondary.light',
                      '&:hover': {
                        color: 'secondary.dark',
                      },
                    }}
                    >{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>  
  );
}
export default Header;