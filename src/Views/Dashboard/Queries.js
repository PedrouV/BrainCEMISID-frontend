import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { makeStyles, Button, IconButton, Grid, Card, Typography, Divider, TextField } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import CardList from '../../Components/CardList'
import EpisodeCard from '../../Components/EpisodeCard'
import { resizeImage, getBooleanArrayFromImageData, createImageFromBooleanArray, amplifyBooleanArrayImage, transformHexArrayToBooleanArray } from '../../Store/Actions/Project';
import { Recognize } from '../../Store/Actions/Stimulus';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';

const BiologySlider = withStyles({
  root: {
    color: '#54af98',
    height: 8,
    width: '80%',
    display: 'block',
    marginTop: '3em',
  },
  thumb: {
    height: 24,
    width: 24,
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
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CulturalSlider = withStyles({
  root: {
    color: '#ef8e1e',
    height: 8,
    width: '80%',
    display: 'block',
    marginTop: '3em',
  },
  thumb: {
    height: 24,
    width: 24,
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
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const FeelingsSlider = withStyles({
  root: {
    color: '#d8b72f',
    height: 8,
    width: '80%',
    display: 'block',
    marginTop: '3em',
  },
  thumb: {
    height: 24,
    width: 24,
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
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(theme=>({
  root: {
    padding: theme.spacing(4)
  },  
  canvas: {
    maxHeight: `${200}px`,
    height: `${200}px`,
    display: 'flex',
    width: `${200}px`,
    position: 'relative',
    background: '#333',
    borderRadius: theme.spacing(1),
    border: `2px #AAA solid`,
  },
  canvasWrapper: {
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    borderRadius: theme.spacing(1),
    
  },
  grid: {
    maxHeight: '85vh'
  },
  panelWrapper: {
    overflowX: 'auto',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    maxHeight: '82vh',
    height: '100%',
    border: `2px ${theme.palette.primary.main} solid`,
    padding: theme.spacing(2)
  },
  card: {
    paddingTop: '100%'
  },
  button: {
    margin: theme.spacing(4,0)
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: theme.spacing(1)
  },
  bolder: {
    fontWeight: 500,
    margin: theme.spacing(1,0)
  }
}))


const Queries = (props) => {

  const [card, setCard] = React.useState(null)
  const [biology, setBiology] = React.useState(0)
  const [culture, setCulture] = React.useState(0)
  const [feelings, setFeelings] = React.useState(0)
  const [preview, setPreview] = React.useState(null)
  const [tolerance, setTolerance] = React.useState(0.1)
  const [colorLimit, setColorLimit] = React.useState(229.5)
  const [visualHearing, setVisualHearing] = React.useState(null)
  const [visualPattern, setVisualPattern] = React.useState(null)
  const [neuronSet, setNeuronSet] = React.useState([])

  useEffect(()=>{
    setVisualHearing(null)
    setVisualPattern(null)
    if(card){
      resizeImage(card.image, 16, 16).then(response=>{
        let arr = getBooleanArrayFromImageData(response.imageData, colorLimit)
        createImageFromBooleanArray(amplifyBooleanArrayImage(arr, 12, response.imageData.width, response.imageData.height),response.imageData.width*12, response.imageData.height*12).then(image=>{
          setPreview(image)
        })
      })
      setNeuronSet(card.class)
    }
  }, [card, tolerance])

  useEffect(()=>{
    if(props.recognizeStatus === 'success'){
      if(props.recognizeResult !== null){
        console.log('HIT')
        const hBooleanArray = (amplifyBooleanArrayImage(transformHexArrayToBooleanArray(props.recognizeResult.h_pattern), 12, 16, 16)) 
        const sBooleanArray = (amplifyBooleanArrayImage(transformHexArrayToBooleanArray(props.recognizeResult.s_pattern), 12, 16, 16))
        let promises = []
        promises.push(createImageFromBooleanArray(hBooleanArray, 16*12, 16*12, {true: {r: 119, g: 221, b: 119}, false: {r: 239, g: 239, b: 239}})) 
        promises.push(createImageFromBooleanArray(sBooleanArray, 16*12, 16*12, {true: {r: 238, g: 154, b: 18}, false: {r: 239, g: 239, b: 239}}))
        Promise.all(promises).then(results=>{
          setVisualHearing(results[0])
          setVisualPattern(results[1])
        })
      }else {
        console.log('MISS')
      }
    }
  }, [props.recognizeStatus])

  const create = (element) =>{
    setCard(element)
  }

  const handleConfirm = (e) =>{
    e.preventDefault();
    let data = {
      colorLimit
    }
    props.recognize(card, data)
  }

  const clean = (index) => (e) => {
    setCard(null)
  }

  const valuetext = (value) => {
    return `${value/100}`;
  }

  const changeTolerance = (e, newValue) => {
    setTolerance(newValue/100);
    setColorLimit(255 - 254*newValue/100)
  }

  const neuronSetChanged = (e) => {
    setNeuronSet(e.target.value)
  }

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={8}>
              <div className={classes.canvasWrapper}>
                <div className={classes.canvas} id='canvas'>
                  {card && <EpisodeCard onRemove={clean} onStop={null} src={card.image} id={'selected-card'} zIndex={1}/>}
                </div>
              </div>
              {visualPattern && visualHearing && <Grid container>
                  <Grid item xs={12}>
                    <Typography className={classes.bolder}>Pensamiento: </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.wrapper}>
                      <VisibilityIcon className={classes.icon}/>
                      <img src={visualPattern}/>
                    </div>
                  </Grid>
                  <Grid item xs={4} className={classes.wrapper}>
                    <Typography className={classes.bolder}>Categoría</Typography>
                    <Typography>{props.recognizeResult.hearing_class}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.wrapper}>
                      <HearingIcon className={classes.icon}/>
                      <img src={visualHearing}/> 
                    </div>
                  </Grid>
                </Grid>}
              {card && <Grid container spacing={2} className={classes.p80}>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12} className={classes.innerGrid}>
                    <Typography className={classes.bolder}>Ajustes del Patrón Visual:</Typography>
                  </Grid>
                  <Grid  item xs={6} className={classes.innerGrid}>
                    <Typography className={classes.sectionTitle}>Previsualización</Typography>
                    <img src={preview} className={classes.previewImage}/>
                  </Grid>
                  <Grid  item xs={6} className={classes.innerGrid}>
                    <Typography className={classes.sectionTitle}>Tolerancia al Color</Typography>
                    <Slider
                      defaultValue={10}
                      getAriaValueText={valuetext}
                      marks={true}
                      min={1}
                      max={100}
                      valueLabelDisplay='on'
                      valueLabelFormat={valuetext}
                      onChange={changeTolerance}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                </Grid>
              }
              {!card && <Divider/>}
              <TextField
                className={classes.p80}
                onChange={neuronSetChanged}
                value={neuronSet}
                label='Conjunto Neuronal'
                variant='outlined'
              />
              <BiologySlider
                defaultValue={67}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                disabled={true}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <CulturalSlider
                defaultValue={80}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                disabled={true}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <FeelingsSlider
                defaultValue={40}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                disabled={true}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <Button onClick={handleConfirm} className={classes.button} variant='contained' color='primary'>Reconocer</Button>
            </Grid>
            <Grid item xs={4}>
              <CardList create={create}/>
            </Grid>
            
          </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return ({
    cards: state.Project.cards,
    recognizeStatus: state.Stimulus.recognizeStatus,
    recognizeResult: state.Stimulus.recognizeResult, 
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    recognize: (card, data) => {
      console.log({card, data});
      dispatch(Recognize(card, data))
    },
    // getCards: () => {
    //   dispatch(getUserCards());
    // },
    // getAllCards: () => {
    //   dispatch(getCards())
    // },

  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Queries)