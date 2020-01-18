import React, { useEffect } from 'react'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { makeStyles } from '@material-ui/styles'
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import N1 from '../Assets/1.png'

export default function EpisodeCard(props) {

    // useEffect(()=>{
    //     props.onStop()
    // })

    const useStyles = makeStyles(theme=>({
        box: {
            display: 'inline-flex',
            background: '#fff',
            border: '1px solid #999',
            borderRadius: '3px',
            width: '180px',
            minWidth: '180px',
            maxWidth: '180px',
            height: `180px`,
            margin: '10px',
            padding: '10px',
            float: 'left',
            background: `url(${props.src})`,
            backgroundSize: 'cover',
            zIndex: props.zIndex
        },
        closeButton: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
        img:{

        }
    }))
    

    const classes = useStyles();
    return (
        <Draggable onStop={props.onStop} cancel="span" bounds="parent" axis='x' id={props.id} grid={[100, 0]}>
            <div className={classes.box}>
                <span className={classes.closeButton}>
                    <IconButton  color='secondary' onClick={props.onRemove ? props.onRemove(props.id) : null}><CloseIcon/></IconButton>
                </span>
            </div>
        </Draggable>
    )
}
