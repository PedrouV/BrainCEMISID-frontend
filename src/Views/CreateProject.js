import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Container, Breadcrumbs, Typography, makeStyles, Link, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import {Link as RouterLink, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import {CreateProject as create} from '../Store/Actions/Project'

function Copyright(props) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={props.className}>
        {'Copyright © BrainCEMISID '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const RLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme=>({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    content: {
        padding: theme.spacing(2,0)
    },
    textWrapper: {
        padding: '3em 0',
        background: theme.palette.primary.dark,
        color: 'white',
    },
    link: {
        color: 'white'
    },
    typo: {
        color: '#999'
    },
    copyright: {
        background: '#EEE',
        padding: theme.spacing(1)
    }, paper: {
        padding: theme.spacing(2,4),
        width: '50%',
        margin:'auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '40vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        width: '60%',
        margin: theme.spacing(2,0),
        textAlign: 'center'
    },
    button:{
        margin: theme.spacing(2,1)
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 800
    }
}))

const CreateProject = (props) => {

    const classes = useStyles();
    const {user, status} = props
    const [name, setName] = React.useState('')
    const [noNameError, setNoNameError] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        if(status === 'success' || status === 'failure'){
            setOpen(true)
        }
    }, [props.status])

    useEffect(()=>{
        setOpen(false)
    },[])

    if(!user){
        return (
            <Redirect to={'/auth/login'}/>
        )
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const createProject = (e) => {
        if(name !== ''){
            props.createProject(name)
        }
        else{
            setNoNameError(true)
        }
    }

    const handleClose = (e) => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <div>
                <Navbar/>
                <div className={classes.textWrapper}>
                    <Container>
                        <Breadcrumbs className={classes.link}>
                            <Link component={RLink} to={`/projects`} className={classes.link}>Proyectos</Link>
                            <Typography className={classes.typo}>Nuevo Proyecto</Typography>
                        </Breadcrumbs>
                    </Container>
                </div>
                <Container className={classes.content}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title}>Nombre del proyecto</Typography>
                        <TextField
                            id='projectName'
                            onChange={handleChange}
                            fullWidth
                            className={classes.textField}
                            helperText={noNameError ? 'El nombre es necesario para su proyecto' : ''}
                        />
                        <div className={classes.buttonContainer}>
                            <Button onClick={createProject} variant='contained' color='secondary' className={classes.button}>Crear Proyecto</Button>
                            <Button component={RLink} to='/projects' variant='outlined' color='secondary' className={classes.button} >Atrás</Button>
                        </div>
                    </Paper>
                </Container>
            </div>
            <Copyright className={classes.copyright}/>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {props.status === 'success' ? 'Exito!' : 'Algo ha salido mal'}
                </DialogTitle>
                <DialogContent dividers>
                    {props.status === 'success' && <Typography>El proyecto <b>{name}</b> ha sido creado exitosamente</Typography>}
                    {props.status === 'failure' && <Typography>Algo ha salido mal, intente nuevamente :(</Typography>}
                </DialogContent>
                <DialogActions>
                  {status === 'success' &&<Button variant='contained' component={RLink} autoFocus to={`/projects`} color="primary">
                    Ir a los proyectos
                  </Button>}
                  {status === 'failure' &&<Button variant='contained' onClick={handleClose} autoFocus color="primary">
                    OK
                  </Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return ({
        user: state.Auth.userInfo,
        status: state.Project.creationProjectStatus,
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        createProject: (data) => {
            dispatch(create(data));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
