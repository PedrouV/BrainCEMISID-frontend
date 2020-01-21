import React, { Fragment } from 'react'
import {Container, Paper, List, ListItem, Divider, ListSubheader, Typography, ListItemAvatar, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getSNB, createImageFromBooleanArray, transformHexArrayToBooleanArray, amplifyBooleanArrayImage } from '../../Store/Actions/Project';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import clsx from 'clsx'


const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    },
    gridCell: {
        display: 'flex',
        alignItems: 'center',
    },
    bolder: {
        fontWeight: 800
    },
    card: {
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
}))

const Hearing = (props) => {

    const classes = useStyles();
    const [neuronArray, setNeuronArray] = React.useState([])

    useEffect(()=>{
        props.getSNB()
    }, [])

    useEffect(()=>{
        let promises = []
        props.neurons.forEach(neuron=>{
            let hexPattern = JSON.parse(neuron.knowledge)._pattern;
            let boolArray = transformHexArrayToBooleanArray(hexPattern)
            console.log(hexPattern)
            promises.push(createImageFromBooleanArray(amplifyBooleanArrayImage(boolArray, 5, 16, 16), 16*5, 16*5, {true: {r: 238, g: 154, b: 18}, false: {r: 239, g: 239, b: 239}}))
        })
        Promise.all(promises).then(imgs=>{
            let newNeuronArray = [];
            props.neurons.forEach((neuron, index)=>{
                newNeuronArray.push({...neuron, img: imgs[index], knowledge: JSON.parse(neuron.knowledge)})
            })
            setNeuronArray(newNeuronArray);
        })
    }, [props.neurons])

    return (
        <div className={classes.root}>
            <Paper>
            <List>
                <ListSubheader>Neuronas de Vista</ListSubheader>
                <Divider/>
                <ListItem>
                    <Grid container>
                        <Grid item xs={1} className={classes.bolder}>
                            {`N° Neurona`}
                        </Grid>
                        <Grid item xs={2} className={classes.bolder}>
                            {`Patrón de Conocimiento`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Categoría del Oído`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Conjunto`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Radio`}
                        </Grid>
                    </Grid>
                </ListItem>
                {neuronArray.map((neuron, index) => {
                    return (<Fragment>
                        <Divider/>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={1} className={clsx(classes.bolder, classes.gridCell)}>
                                    {neuron.id-1}
                                </Grid>
                                <Grid item xs={2} className={classes.gridCell}>
                                    {<img src={neuron.img} className={classes.card}/>}
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    {neuron.knowledge._class}
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    {neuron.knowledge._set}
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    {neuron.radius}
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Fragment>)
                })}

            </List>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        neurons: state.Project.snbSight       
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getSNB: () => {
            dispatch(getSNB());
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Hearing)
