import React from 'react'
import Navbar from '../Components/Navbar'
import { Container, Breadcrumbs, Typography, makeStyles, Link, Paper, TextField, Button } from '@material-ui/core'
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
    const {user} = props
    const [name, setName] = React.useState('')
    const [noNameError, setNoNameError] = React.useState(false)
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
                            <Button onClick={createProject} variant='contained' color='secondary' className={classes.button}>Create Project</Button>
                            <Button component={RLink} to='/projects' variant='outlined' color='secondary' className={classes.button} >Cancel</Button>
                        </div>
                    </Paper>
                </Container>
            </div>
            <Copyright className={classes.copyright}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return ({
        user: state.Auth.userInfo
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
