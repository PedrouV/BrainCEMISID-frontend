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
import { RegisterUser } from '../../Store/Actions/Auth';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {

  const classes = useStyles();

  const [registerForm, setRegisterForm] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [terms, setTerms] = React.useState(false)

  const handleChanges = (e) =>{
    setRegisterForm({...registerForm, [e.target.id]: e.target.value})
  }

  const triggerCheckbox = (e)=>{
    setTerms(!terms)
  }

  const validateData = () =>{
    const {email, password, passwordConfirm, username} = registerForm
    const emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = email && emailpattern.test(email )
      && password.length >= 6 && password === passwordConfirm
      && username
      && terms
    return result;
  }

  const handleRegister = (e) =>{
    e.preventDefault();

    if(validateData()){
      props.registerUser(registerForm)
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
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Usuario"
                autoFocus
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirmar Contraseña"
                type="password"
                id="passwordConfirm"
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox onChange={triggerCheckbox} color="primary" />}
                label="Acepto los términos y condiciones."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Regístrate
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) =>{
    return({
        registerUser: (data) =>{
            dispatch(RegisterUser(data))
        }
    })
}

export default connect(null, mapDispatchToProps)(SignUp)