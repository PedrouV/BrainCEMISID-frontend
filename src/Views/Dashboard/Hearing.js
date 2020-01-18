import React from 'react'
import {Container, Paper, List, ListItem, Divider, ListSubheader, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    }
}))

export default function Hearing(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper>
            <List>
                <ListSubheader>Neuronas de Oído</ListSubheader>
                <Divider/>
                <ListItem>
                    <Typography>1</Typography>
                    <Typography></Typography>
                </ListItem>

            </List>
            </Paper>
        </div>
    )
}
