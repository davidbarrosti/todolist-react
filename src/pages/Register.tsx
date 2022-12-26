import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { register } from '../store/modules/LoginSlice';

const Register: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const userLogged = loginRedux.userList.findIndex(user => user.logged);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged !== -1) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleRegister = () => {
    if (email.length >= 6 && password.length >= 6 && password === confirmPassword) {
      dispatch(
        register({
          email,
          password,
          confirmPassword,
          logged: false
        })
      );
      navigate('/login');
    } else {
      alert('Preencha todos os campos! \nEmail e senha precisam ter pelo menos 6 digitos');
    }
  };
  const handleToLogin = () => {
    navigate('/login');
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: '0 20px' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="h4">To do List</Typography>
            <AssignmentIcon fontSize="large" />
          </Grid>
          <Grid item xs={12} alignItems="center">
            <Typography variant="h6" align="center">
              Cadastre seu email e senha!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email-basic"
              onChange={ev => setMail(ev.target.value)}
              label="Email"
              value={email || ''}
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password-basic"
              onChange={ev => setPassword(ev.target.value)}
              label="Senha"
              value={password || ''}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="confirmPassword-basic"
              onChange={ev => setconfirmPassword(ev.target.value)}
              label="Confirme sua Senha"
              value={confirmPassword || ''}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleRegister} variant="contained">
                  Cadastrar
                </Button>
                <Button variant="text" onClick={handleToLogin}>
                  Já possui conta? Faça login!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Register;
