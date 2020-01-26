import React, { Fragment } from 'react'
import {Container, Paper, List, ListItem, Divider, ListSubheader, Typography, ListItemAvatar, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getSNB, createImageFromBooleanArray, transformHexArrayToBooleanArray, amplifyBooleanArrayImage } from '../../Store/Actions/Project';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { biology, cultural, feelings } from '../../Components/colors';


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
    icon: {

    },
    label: {
        fontWeight: 500
    },
    biology: {
        color: biology       
    },
    cultural: {
        color: cultural
    },
    feelings: {
        color: feelings
    }
}))

const Episodes = (props) => {

    const classes = useStyles();
    const [neuronArray, setNeuronArray] = React.useState([])

    useEffect(()=>{
        props.getSNB()
    }, [])

    useEffect(()=>{

    }, [props.neurons])

    return (
        <div className={classes.root}>
            <Paper>
            <List>
                <ListSubheader>Memorias Episódicas</ListSubheader>
                <Divider/>
                {props.neurons.map((group, index) => {
                    return (<ExpansionPanel key={index}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <Typography><b>Episodio {index}</b> - Tamaño del Episodio: {group.length-2}</Typography>
                            <Typography>index_bip: {group[group.length-1].index_bip}</Typography>
                            <Typography></Typography>
                        </div>
                        <Typography className={classes.heading}> </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={{width: '100%'}}>
                                {group.map((ev,index)=>{
                                    return (
                                    <ListItem style={{flexDirection: 'column'}}>
                                        {index < group.length-2 && 
                                            <div style={{alignSelf: 'flex-start'}}>
                                                <Typography><b>-</b> Neurona de Oído {ev._knowledge} reconocida mediante el patrón visual.</Typography>
                                            </div>
                                        }
                                        {index === group.length-2 && <Fragment>
                                        <Typography style={{alignSelf: 'flex-start'}} className={classes.label}>BCF al final del episodio</Typography>
                                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                            <Typography className={clsx(classes.label, classes.biology)}>Biology: {Math.round(ev._knowledge.biology*100)/100}</Typography>
                                            <Typography className={clsx(classes.label, classes.cultural)}>Culture: {Math.round(ev._knowledge.culture*100)/100}</Typography>
                                            <Typography className={clsx(classes.label, classes.feelings)}>Feelings: {Math.round(ev._knowledge.feelings*100)/100}</Typography>
                                        </div>
                                        </Fragment>}                                       
                                    </ListItem>
                                )})}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    )
                })}

            </List>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    let episodicMemory = [...state.Project.episodicMemory]
    episodicMemory.forEach(memory => {

    })
    return ({
        neurons: state.Project.episodicMemory,
        snbHearing: state.Project.snbHearing,      
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getSNB: () => {
            dispatch(getSNB());
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes)
