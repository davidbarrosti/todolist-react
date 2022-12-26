import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NotesCounter from '../NotesCounter/NotesCounter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ListAltIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1
            }}
          />
          
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            To do List
          </Typography>

          <AssignmentTurnedInIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              flex: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            To do List
          </Typography>
          <NotesCounter />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
