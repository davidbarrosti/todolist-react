import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { login } from '../store/modules/LoginSlice';

const Login: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = loginRedux.userList.findIndex(user => user.logged);
    if (userLogged !== -1) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleLogin = () => {
    if (email.length < 6 || password.length < 6) {
      alert('Preencha os campos corretamente ou Cadastre - se');
    } else {
      const userExist = loginRedux.userList.findIndex(user => user.email === email);
      if (userExist === -1) return alert('Usuario não encontrado');
      const isPasswordOk = loginRedux.userList[userExist].password === password;
      if (!isPasswordOk) return alert('Senha incorreta');
      dispatch(login(email));
      navigate('/');
    }
  };
  const handleToRegister = () => {
    navigate('/register');
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: '0 20px' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="h4">To do List</Typography>
            <ListAltIcon fontSize="large" />
          </Grid>
          <Grid item xs={12} alignItems="center">
            <Typography variant="h6" align="center">
              Que bom que voltou !<br></br>
              Utilize seu email e senha para logar.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-email"
              onChange={ev => setMail(ev.target.value)}
              label="Email"
              type="email"
              value={email || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-Password"
              onChange={ev => setPassword(ev.target.value)}
              label="Senha"
              type="password"
              value={password || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleLogin} variant="contained">
                  Entrar
                </Button>
                <Button variant="text" onClick={handleToRegister}>
                  Novo por aqui? Cadastre-se agora!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
