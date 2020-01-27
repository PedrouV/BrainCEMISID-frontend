import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Switch, Route} from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Overview from './Dashboard/Overview';
import Episodes from './Dashboard/Episodes';
import Hearing from './Dashboard/Hearing';
import Sight from './Dashboard/Sight';
import Queries from './Dashboard/Queries';
import RelNetwork from './Dashboard/RelNetwork';
import Learning from './Dashboard/Learning';
import NewEpisode from './Dashboard/NewEpisode';
import NewCard from './Dashboard/NewCard';
import { PrimaryItems, SecondaryItems, ExtraItems } from './Dashboard/MenuItems';
import { connect } from 'react-redux';
import { getSNB } from '../Store/Actions/Project';
import { logOut } from '../Store/Actions/Auth';
import Intentions from './Dashboard/Intentions';
import ImageRoom from './Dashboard/ImageRoom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = (props) => {

  useEffect(() => {
    if(props.token)
    props.getSNB();
  }, [props.token])
  
  const pid = props.match.params.id
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const logOut = () => {
    props.logOut();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Panel de Proyecto: {props.projectName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <PrimaryItems pathId={pid}/>
        </List>
        <Divider/>
        <List>
          <SecondaryItems pathId={pid}/>
        </List>
        <Divider/>
        <List>
          <ExtraItems pathId={pid} logOutFunction={logOut}/>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
            <Route exact path='/dashboard/:id/' component={Overview}/>
            <Route exact path='/dashboard/:id/learning' component={Learning}/>
            <Route exact path='/dashboard/:id/queries' component={Queries}/>
            <Route exact path='/dashboard/:id/episodes' component={Episodes}/>
            <Route exact path='/dashboard/:id/sight' component={Sight}/>
            <Route exact path='/dashboard/:id/hearing' component={Hearing}/>
            <Route exact path='/dashboard/:id/new-episode' component={NewEpisode}/>
            <Route exact path='/dashboard/:id/new-Card' component={NewCard}/>
            <Route exact path='/dashboard/:id/hearing' component={Hearing}/>
            <Route exact path='/dashboard/:id/intentions' component={Intentions}/>
            <Route exact path='/dashboard/:id/image-room' component={ImageRoom}/>
            <Route exact path='/dashboard/:id/relational-network' component={RelNetwork}/>
          </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    token: state.Auth.user ? state.Auth.user.token : null,
    projectName: state.Project.projectName
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getSNB: () => {
      dispatch(getSNB());
    },
    logOut: () => {
      dispatch(logOut())
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
