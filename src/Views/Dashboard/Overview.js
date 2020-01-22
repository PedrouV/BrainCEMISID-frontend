import React from 'react'
import { Grid, Paper, makeStyles, Typography, ListItem, ListItemIcon, ListItemText, ListSubheader, List, Divider, Button } from '@material-ui/core'
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {biology, cultural, feelings} from '../../Components/colors'
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import clsx from 'clsx'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom'
import { saveDesiredState } from '../../Store/Actions/Project';

const RLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const BiologySlider = withStyles({
    root: {
      color: '#54af98',
      width: '80%',
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      borderRadius: 4,
      width: 8
    },
    rail: {
      borderRadius: 4,
      width: 8,
    },
  })(Slider);

const CulturalSlider = withStyles({
    root: {
      color: '#ef8e1e',
      width: '80%',
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      borderRadius: 4,
    },
    rail: {
      borderRadius: 4,
    },
  })(Slider);
  
  const FeelingsSlider = withStyles({
    root: {
      color: '#d8b72f',
      width: '80%',
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      borderRadius: 4,
      height: 8
    },
    rail: {
      borderRadius: 4,
      height: 8
    },
  })(Slider);

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    },
    sliders: {
        height: '50vh',
        padding: theme.spacing(2),
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    slidersLabel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontWeight: 'bolder'
    },
    biology: {
        color: biology,
    },
    cultural: {
        color: cultural,
    },
    feelings: {
        color: feelings
    },
    sliderWrapper: {
      height: '90%'
    },
    label: {
      fontWeight: 800
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
}))


const Overview = (props) => {

    const projectId = props.match.params.id
    const {internalState, desiredState} = props
    const [bcf, setBcf] = React.useState(desiredState)

    useEffect(()=>{
      props.getProjectData(projectId)
    },[])

    console.log(props.sight.length, props.hearing.length)

    const valuetext = (value) => {
        return `${value/100}`;
      }

    const handleSliderChange = (index) => (e, value) => {
      let newBCF = {...bcf}
        if (index === 0)
          newBCF.biology = value/100;
        if (index === 1)
          newBCF.culture = value/100;
        if (index === 2)
          newBCF.feelings = value/100;
      setBcf(newBCF)
    }

    const handleChangeDesiredState = (e) =>{
      props.setNewDesiredState(bcf);
    }

    const classes = useStyles();
    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={6}>
                <Paper className={classes.sliders}>
                    <div className={classes.labelContainer}>
                      <div></div>
                      <Typography className={classes.slidersLabel}>Estado Interno Deseado</Typography>
                      <Button 
                        variant='contained'
                        color='primary'
                        disabled={bcf.biology === desiredState.biology && bcf.culture === desiredState.culture && bcf.feelings === desiredState.feelings}
                        onClick={handleChangeDesiredState}
                      >
                        Guardar Estado
                      </Button>
                    </div>
                    <div className={classes.sliderWrapper}>
                        <BiologySlider
                            orientation='vertical'
                            defaultValue={desiredState.biology*100}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange(0)}
                            valueLabelFormat={valuetext}
                        />
                        <AccessibilityIcon className={classes.biology}/>
                        <Typography className={clsx(classes.biology, classes.label)}>Biology</Typography>
                        <Typography className={clsx(classes.biology, classes.label)}>{bcf.biology}</Typography>
                    </div>
                    <div className={classes.sliderWrapper}>
                        <CulturalSlider
                            orientation='vertical'
                            defaultValue={desiredState.culture*100}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange(1)}
                            valueLabelFormat={valuetext}
                        />
                        <MenuBookIcon className={classes.cultural}/>
                        <Typography className={clsx(classes.cultural, classes.label)}>Cultural</Typography>
                        <Typography className={clsx(classes.cultural, classes.label)}>{bcf.culture}</Typography>
                    </div>
                    <div className={classes.sliderWrapper}>
                        <FeelingsSlider
                            orientation='vertical'
                            defaultValue={desiredState.feelings*100}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange(2)}
                            valueLabelFormat={valuetext}
                        />
                        <FavoriteIcon className={classes.feelings}/>
                        <Typography className={clsx(classes.feelings, classes.label)}>Feelings</Typography>
                        <Typography className={clsx(classes.feelings, classes.label)}>{bcf.feelings}</Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.sliders}>
                    <Typography className={classes.slidersLabel}>Estado Interno Actual</Typography>
                        <div className={classes.sliderWrapper}>
                            <BiologySlider
                                orientation='vertical'
                                defaultValue={internalState.biology*100}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                disabled={true}
                                valueLabelFormat={valuetext}
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                            />
                            <AccessibilityIcon className={classes.biology}/>
                            <Typography className={clsx(classes.biology, classes.label)}>Biology</Typography>
                            <Typography className={clsx(classes.biology, classes.label)}>{Math.round(internalState.biology*100)/100}</Typography>
                        </div>
                        <div className={classes.sliderWrapper}>
                            <CulturalSlider
                                orientation='vertical'
                                defaultValue={internalState.culture*100}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                disabled={true}
                                valueLabelFormat={valuetext}
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                            />
                            <MenuBookIcon className={classes.cultural}/>
                            <Typography className={clsx(classes.cultural, classes.label)}>Cultural</Typography>
                            <Typography className={clsx(classes.cultural, classes.label)}>{Math.round(internalState.culture*100)/100}</Typography>
                        </div>
                        <div className={classes.sliderWrapper}>
                            <FeelingsSlider
                                orientation='vertical'
                                defaultValue={internalState.feelings*100}
                                getAriaValueText={valuetext}
                                valueLabelFormat={valuetext}
                                aria-labelledby="discrete-slider-small-steps"
                                disabled={true}
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                            />
                            <FavoriteIcon className={classes.feelings}/>
                            <Typography className={clsx(classes.feelings, classes.label)}>Feelings</Typography>
                            <Typography className={clsx(classes.feelings, classes.label)}>{Math.round(internalState.feelings*100)/100}</Typography>
                        </div>
                    </Paper>
                </Grid>
            <Grid item xs={12}>
                <Paper>
                    <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Resumen Neuronal
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    <Divider/>
                    <ListItem button component={RLink} to={`/dashboard/${projectId}/sight`}>
                        <ListItemIcon>
                            <VisibilityIcon/>   
                        </ListItemIcon>
                        <ListItemText primary={`Vista: ${props.sight.length}`} />
                    </ListItem>
                    <Divider/>
                    <ListItem button component={RLink} to={`/dashboard/${projectId}/hearing`}>
                        <ListItemIcon>
                            <HearingIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Oído: ${props.hearing.length}`} />
                    </ListItem>
                    <Divider/>
                    <ListItem button component={RLink} to={`/dashboard/${projectId}/relational-network`}>
                        <ListItemIcon>
                            <AccountTreeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Relacionales: ${props.relNetwork.length}`} />
                    </ListItem>
                    <Divider/>
                    <ListItem button component={RLink} to={`/dashboard/${projectId}/episodes`}>
                        <ListItemIcon>
                            <DynamicFeedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Episódicas: ${props.episodicMemory.length}`} />
                    </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
  return ({
    internalState: state.Project.internalState,
    desiredState: state.Project.desiredState,
    sight: state.Project.snbSight,
    hearing: state.Project.snbHearing,
    relNetwork: state.Project.relNetwork,
    episodicMemory: state.Project.episodicMemory,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getProjectData: (projectId) => {
      console.log(projectId)
    },
    setNewDesiredState: (bcf) => {
      dispatch(saveDesiredState(bcf))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)