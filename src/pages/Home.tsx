import React, { useCallback, useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import FormNote from '../components/FormNote/FormNote';
import { NoteType } from '../types/index';
import ItemNote from '../components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addNote, selectNotes } from '../store/modules/NotesSlice';
import { logoff } from '../store/modules/LoginSlice';
import ResponsiveAppBar from '../components/ResponsiveAppBar/ResponsiveAppBar';

const Home: React.FC = () => {
  const notesRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const userLogged = loginRedux.userList.find(user => user.logged);
  const userNote = notesRedux.filter(note => note.user === userLogged?.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate('/login');
    }
  }, [loginRedux, navigate]);

  const handleLogOff = () => {
    const logOut = confirm(' Você ira Sair? \n Até Breve !');
    if (logOut) {
      dispatch(logoff());
    }
  };

  const handleAddNote = useCallback((note: NoteType) => {
    dispatch(addNote(note));
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormNote action={handleAddNote} />
        </Grid>
        {userNote.length && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: '5px' }}>
              {userNote.map(item => {
                return <ItemNote key={item.id} note={item} />;
              })}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} display="flex">
          <Button variant="contained" endIcon={<LogoutIcon />} onClick={handleLogOff}>
            Sair
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
