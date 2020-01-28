import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { LoginUser } from '../../Store/Actions/Auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © BrainCEMISID '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  })

  const handleChanges = (e) =>{
    setLoginForm({...loginForm, [e.target.id]: e.target.value})
  }

  const validateData = () =>{
    const {username, password} = loginForm
    const result = username
      && password.length >= 6
    return result;
  }

  const handleLogin = (e) =>{
    e.preventDefault();
    if(validateData()){
      props.loginUser(loginForm)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Autenticación
        </Typography>
        {props.status.errors && <Typography style={{fontSize: '0.8em', color: 'red'}}>Credenciales Incorrectas</Typography>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            value={loginForm.username}
            onChange={handleChanges}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginForm.password}
            onChange={handleChanges}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleLogin}
            disabled={!loginForm.username || loginForm.password.length < 6}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return({
    status: state.Auth.loginStatus
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
      loginUser: (credentials) =>{
          dispatch(LoginUser(credentials))
      }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)