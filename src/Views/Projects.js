import React from 'react'
import Navbar from '../Components/Navbar'
import { Container, Typography, makeStyles } from '@material-ui/core'
import ProjectList from '../Components/ProjectList'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { getUserProjects } from '../Store/Actions/Auth'
import { useEffect } from 'react'

function Copyright(props) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={props.className}>
        {'Copyright © BrainCEMISID '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles(theme=>({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textWrapper: {
        padding: '3em 0',
        background: theme.palette.primary.dark,
        color: 'white',
    },
    text: {

    },
    copyright: {
        background: '#EEE',
        padding: theme.spacing(1)
    }
}))

const Projects = (props) => {

    const {user} = props
    const classes = useStyles();
    useEffect(()=>{
        if(user)
        props.getProjects();
    }, [])

    if(user == null){
        return(
            <Redirect to='/auth/login'/>
        )
    }

    return (
        <div className={classes.root}>
            <div className={null}>
            <Navbar/>
            <div className={classes.textWrapper}>
                <Container>
                    <Typography className={classes.text}>Hola {user.username}, bienvenido a tu panel de proyectos BrainCEMISID, acá podrás crear nuevos proyectos y consultar tus proyectos existentes.</Typography>
                </Container>
                </div>
            <Container>
                <ProjectList/>
            </Container>
            </div>
            <Copyright className={classes.copyright}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return({
        user: state.Auth.userInfo,
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        getProjects: () => {
            dispatch(getUserProjects())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)