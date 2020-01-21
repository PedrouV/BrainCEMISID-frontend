import React, { Fragment } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Paper, makeStyles, Tabs, Tab, AppBar, Typography, Box, LinearProgress } from '@material-ui/core'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    paper: {
        display: 'inline-block',
        margin: 'auto',
        padding: theme.spacing(0,0,4,0)
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

const Authentication = (props) => {
    const classes = useStyles();
    const {user, loginStatus} = props

    const path = props.match.params.type;
    const [tab, setTab] = React.useState(path === 'signup' ? 1 : 0);

    const handleChange = (event, newValue) => {
      setTab(newValue);
    };

    if(user !== null){
        return(<Redirect to='/projects'></Redirect>)
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {loginStatus.status === 'trying' && <LinearProgress color='secondary'/>}
                <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Iniciar Sesión" />
                    <Tab label="Registrar" />
                </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                    <SignIn></SignIn>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <SignUp></SignUp>
                </TabPanel>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return({
        loginStatus: state.Auth.loginStatus,
        user: state.Auth.user,
        userInfo: state.Auth.userInfo,
    })
}

export default connect(mapStateToProps)(Authentication)