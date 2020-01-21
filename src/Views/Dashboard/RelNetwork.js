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
    },
    number: {
        marginRight: theme.spacing(2)
    }
}))

const RelNetwork = (props) => {

    const classes = useStyles();
    const [neuronArray, setNeuronArray] = React.useState([])

    const getNeuronId = (hid, sid) => {
        let response = {hindex: -1, sindex: -1} 
        for(let i = 0; i < props.hearing.length ; i++){
            if(hid === props.hearing[i].id-1){
                response.hindex = i;
            }
        }
        for(let i = 0; i < props.sight.length ; i++){
            if(sid === props.sight[i].id-1){
                response.sindex = i;
            }
        }
        return response
    }

    useEffect(()=>{
        props.getSNB()
    }, [])

    useEffect(()=>{
        let promises = []
        props.neurons.forEach(neuron=>{
            const h_id = neuron._h_id;
            const s_id = neuron._s_id;
            const ids = getNeuronId(h_id, s_id);
            console.log(ids)
            let hHexPattern = JSON.parse(props.hearing[ids.hindex].knowledge)._pattern;
            let sHexPattern = JSON.parse(props.sight[ids.sindex].knowledge)._pattern;

            let hBoolArr = transformHexArrayToBooleanArray(hHexPattern)
            let sBoolArr = transformHexArrayToBooleanArray(sHexPattern)

            promises.push(createImageFromBooleanArray(amplifyBooleanArrayImage(sBoolArr, 4, 16, 16), 16*4, 16*4, {true: {r: 238, g: 154, b: 18}, false: {r: 239, g: 239, b: 239}}))
            promises.push(createImageFromBooleanArray(amplifyBooleanArrayImage(hBoolArr, 4, 16, 16), 16*4, 16*4, {true: {r: 119, g: 221, b: 119}, false: {r: 239, g: 239, b: 239}}))
            console.log(props.sight[s_id], props.hearing[h_id])
        })
        // setNeuronArray(props.neurons)
        Promise.all(promises).then(imgs=>{
            let newNeuronArray = [];
            let images = [];
            for(let i = 0; i < imgs.length ; i = i+2){
                let aux = {}
                aux['simg'] = imgs[i]
                aux['himg'] = imgs[i+1];
                images.push(aux);
            }
            props.neurons.forEach((neuron, index)=>{
                newNeuronArray.push({...neuron, himg: images[index].himg, simg: images[index].simg})
            })
            setNeuronArray(newNeuronArray);
        })
    }, [props.neurons])

    return (
        <div className={classes.root}>
            <Paper>
            <List>
                <ListSubheader>Neuronas de Relacionales</ListSubheader>
                <Divider/>
                <ListItem>
                    <Grid container>
                        <Grid item xs={1} className={classes.bolder}>
                            {`N° Neurona`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Neurona Vista`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Neurona Oído`}
                        </Grid>
                        <Grid item xs={3} className={classes.bolder}>
                            {`Peso`}
                        </Grid>
                        <Grid item xs={2} className={classes.bolder}>
                            {`HIT`}
                        </Grid>
                    </Grid>
                </ListItem>
                {neuronArray.map((neuron, index) => {
                    return (<Fragment>
                        <Divider/>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={1} className={clsx(classes.bolder, classes.gridCell)}>
                                    <Typography className={classes.bolder}>{index}</Typography>
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    <Typography className={classes.number}>ID: {neuron._s_id}</Typography>
                                    {<img className={classes.card} src={neuron.simg}/>}
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    <Typography className={classes.number}>ID: {neuron._h_id}</Typography>
                                    {<img className={classes.card} src={neuron.himg}/>}
                                </Grid>
                                <Grid item xs={3} className={classes.gridCell}>
                                    <Typography>{neuron._weight}</Typography>
                                </Grid>
                                <Grid item xs={2} className={classes.gridCell}>
                                    <Typography>{neuron._hit ? 'True' : 'False'}</Typography>
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
        neurons: state.Project.relNetwork,
        sight: state.Project.snbSight,
        hearing: state.Project.snbHearing,       
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getSNB: () => {
            dispatch(getSNB());
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(RelNetwork)
