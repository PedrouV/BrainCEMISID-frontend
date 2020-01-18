import React from 'react'
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    }
}))

export default function Sight() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            Sight
        </div>
    )
}
