import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'

const Link = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));   

const Navbar = () => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Proyectos BrainCEMISID
                </Typography>
                <IconButton component={Link} to='/settings' color="inherit">
                   <AccountCircleIcon  fontSize='large'/> 
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
