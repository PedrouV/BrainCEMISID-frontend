import React, { useEffect, Fragment } from 'react'
import {connect} from 'react-redux'
import { makeStyles, Button, Grid, Card, Typography, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import EpisodeCard from '../../Components/EpisodeCard';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import {biology, cultural, feelings} from '../../Components/colors'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { getUserCards, getCards, getBooleanArrayFromImageData, createImageFromBooleanArray, resizeImage, transformIntToHexArray } from '../../Store/Actions/Project';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AdjustedCardList from '../../Components/AdjustedCardList';
import {Link as RouterLink} from 'react-router-dom'
import { Learn } from '../../Store/Actions/Stimulus';

const Link = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const customColors = {true: {r: 31, g: 147, b: 195}, false: {r: 255, g: 255, b: 255}}

const CCard = (props) => {
  const {card, elementId, clickFunction, className} = props;
  const classes = makeStyles(theme=>({
    root: {
      background: `url(${card.image})`, 
      backgroundSize: 'cover' 
    }
  }))();
  return (<Card onClick={clickFunction} id={elementId} className={clsx(className, classes.root)}>
    </Card>)
}


const BiologySlider = withStyles({
  root: {
    color: biology,
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
    color: cultural,
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
    color: feelings,
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
    maxHeight: `${192}px`,
    height: `${192}px`,
    display: 'flex',
    width: `${192}px`,
    position: 'relative',
    borderRadius: theme.spacing(1),
    border: `2px #AAA solid`,
    alignSelf: 'flex-end',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#DDD'
  },
  canvasWrapper: {
    whiteSpace: 'nowrap',
    maxWidth: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  patternWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  patternText: {
    maxWidth: '50%',
    margin: theme.spacing(0,2),
    textAlign: 'center'
  },
  p80:{
    width: '80%',
    marginTop: theme.spacing(2)
  },
  visualHearing: {
    width: `${16*12}px`,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  autocompleteField: {
    width: `${16*12}px`,
  },
  grid: {
    maxHeight: '85vh'
  },
  panelWrapper: {
    overflowX: 'auto',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    maxHeight: '70vh',
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
  biology: {
    color: biology,
  },
  cultural: {
    color: cultural,
  },
  feelings: {
    color: feelings
  },
  label: {
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  text: {
    marginTop: '3em',
    width: '80%'
  },
  blackText: {
    color: 'black',
    marginBottom: theme.spacing(1)
  },
  selectInput: {
    marginBottom: theme.spacing(2),
    textTransform: 'capitalize'
  },
  menuItem: {
    textTransform: 'capitalize'
  },
  tabsWrapper: {
    marginBottom: theme.spacing(2),
    background: 'transparent',
    boxShadow: 'none'
  },
  previewImage: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  innerGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2,0),
    alignItems: 'center',

  },
  sectionTitle: {
    fontWeight: 500, 
    marginBottom: theme.spacing(1)
  },
  categoryTextField: {
    width: '192px',
    margin: '0 0 8px 0',
  }
}))

const amplifyBooleanArrayImage = (arr, factor, width, height) => {
  let newArray = [];
  for(let i = 0; i < height ; i++){
    for(let l = 0 ; l < factor ; l++){
      for(let j = 0 ; j < width ; j++){
        if(arr[i*width+j]){
          for(let k = 0 ; k < factor ; k++){
            newArray.push(1)
          }
        }else{
          for(let k = 0 ; k < factor ; k++){
            newArray.push(0)
          }
        }
      }
    }
  }
  return newArray
}


const transformHexArrayToBooleanArray = (hexArr) => {
  let booleanArray = [];
  hexArr.forEach(hex=>{
    let binArr = []
    let aux = hex;
    while(aux > 0){
        let rest = aux%2;
        binArr.unshift(rest);
        aux = (aux - rest)/2; 
    }
    let finalBin = []
    for(let i = 0; i < 4 - binArr.length; i++){
      finalBin.push(0);
    }
    finalBin = finalBin.concat(binArr)
    booleanArray = booleanArray.concat(finalBin)
  })
  return booleanArray;
}


const Learning = (props) => {
  const pid = props.match.params.id
  const [card, setCard] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [advice, setAdvice] = React.useState(false)
  const [biology, setBiology] = React.useState(0)
  const [culture, setCulture] = React.useState(0)
  const [feelings, setFeelings] = React.useState(0)
  const [preview, setPreview] = React.useState(null)
  const [visualHearing, setVisualHearing] = React.useState(null)
  const [category, setCategory] = React.useState('')
  const [hearingPattern, setHearingPattern] = React.useState([])
  const [neuronSet, setNeuronSet] = React.useState([])
  const [previousCategories, setPreviousCategories] = React.useState([{title: 'hola', pattern: []}, {title: 'gato', pattern: []}, {title: 'perro', pattern: []}, {title: 'gallo', pattern: []}, {title: 'gamificacion', pattern: []}])
  
  //Tolerance Changed
  useEffect(()=>{
    if(card){
      resizeImage(card.image, 16, 16).then(response=>{
        let arr = getBooleanArrayFromImageData(response.imageData, card.tolerances)
        createImageFromBooleanArray(amplifyBooleanArrayImage(arr, 12, response.imageData.width, response.imageData.height),response.imageData.width*12, response.imageData.height*12).then(image=>{
          setPreview(image)
        })
      })
      setNeuronSet(card.class)
    }
  }, [card])

  //Learn Status changed 
  useEffect(()=>{
    if((props.learnStatus === 'success' || props.learnStatus === 'failure') && card){
      setOpen(true);
    }
  },[props.learnStatus])

  //on mount
  useEffect(()=>{
    if(props.token)
    props.getCards();
    props.getNeuronNumber();
  }, [props.token])

  useEffect(()=>{
    createVisualHearing((props.snbHearing.length)+1)
    setCategory(`SNB_H${props.snbHearing.length+1}`)
    let arr = []
    props.snbHearing.forEach(neuron=>{
      arr.push({title: JSON.parse(neuron.knowledge)._class , pattern: JSON.parse(neuron.knowledge)._pattern})
    })
    setPreviousCategories(arr);
  }, [props.snbHearing])

  useEffect(()=>{
    let flag = true;
    previousCategories.forEach(c=>{
      if(c.title === category){
        setHearingPattern(c.pattern)
        createImageFromBooleanArray(amplifyBooleanArrayImage(transformHexArrayToBooleanArray(c.pattern), 10, 16 , 16), 16*10, 16*10, customColors).then(img=>{
          setVisualHearing(img);
        })
        flag = false;
      }
    })
    if(flag){
      createVisualHearing((props.snbHearing.length)+1)
    }
  }, [category])

  const createVisualHearing = (value) => {
    let hexArray = transformIntToHexArray(value, 64);
    setHearingPattern(hexArray);
    let booleanArray = transformHexArrayToBooleanArray(hexArray);
    let amplifiedBooleanArray = amplifyBooleanArrayImage(booleanArray, 10, 16, 16)
    createImageFromBooleanArray(amplifiedBooleanArray, 16*10, 16*10, customColors).then(image=>{
      setVisualHearing(image)
    })
  } 

  const create = (element) =>{
    setCard(element)
  }

  const clean = (index) => (e) => {
    setCard(null)
  }

  const handleConfirm = (e) =>{
    e.preventDefault();
    const data = {
      bfc: {
        biology: biology/100, feelings: feelings/100, culture: culture/100
      },
      hearingPattern,
      category,
      set: card.class,
      tolerances : card.tolerances,
      cardId : card.id,
    }
    if(card != null){
      if((biology !== 0 && culture !== 0 && feelings !== 0) || advice){
        props.learn(card.image, data)
      }else{
        setAdvice(true)
      }
    }else{
    }
  }

  const setBFC = (index) => (e, newValue) => {
    switch(index){
      case 0: setBiology(newValue); break;
      case 1: setFeelings(newValue); break;
      case 2: setCulture(newValue); break;
    }
  }

  const valuetext = (value) => {
    return `${value/100}`;
  }

  const neuronSetChanged = (e) => {
    setNeuronSet(e.target.value)
  }

  const autocompleteInputChange = (e, value, reason) => {
    if(reason === 'input'){
      setCategory(value)
    }else if(reason === 'reset' && e){
      setCategory(e.target.value)
    }

  }

  const newCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleClose = (e) => {
    setOpen(false)
  }

    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={8}>
              <div className={classes.canvasWrapper}>
                <div className={classes.patternWrapper}>
                  <Typography className={classes.patternText}><VisibilityIcon/></Typography>
                  <div className={classes.canvas} id='canvas'>
                    {card && <EpisodeCard onStop={null} src={card.image} id={'selected-card'} onRemove={clean} zIndex={1}/>}
                  </div>
                </div>
                <div className={classes.patternWrapper}>
                  <Typography className={classes.patternText}><HearingIcon/><br/>Categoría<br/><b>{category}</b></Typography>
                  {visualHearing && <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',}}>
                    {/* <Autocomplete
                      freeSolo
                      onChange={changeCategory}
                      className={classes.autocompleteField} 
                      id='category'
                      blurOnSelect
                      options={previousCategories.map(cate=> cate.title )}
                      onInputChange={autocompleteInputChange}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Categoría del Oído'
                          margin="normal"
                          variant='outlined'
                          fullWidth
                          InputProps={{ ...params.InputProps}}

                        />
                      )}
                    /> */}
                    <TextField
                      onChange={newCategory}
                      variant='outlined'
                      label={'Categoría'}
                      className={classes.categoryTextField}
                    />
                    <img src={visualHearing} className={classes.visualHearing}/>
                    </div>}
                </div>
              </div>
                <Grid container spacing={2} className={classes.p80}>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  {card && <Fragment>
                  <Grid item xs={12} className={classes.innerGrid}>
                    <Typography className={classes.sectionTitle}>Previsualización del Patrón Neuronal</Typography>
                    <img src={preview} className={classes.previewImage}/>
                    <Button component={Link} to={`/dashboard/${props.match.params.id}/image-room`} style={{margin: '1em 0'}} color='secondary' variant='outlined'>Ajustar Imágenes</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid></Fragment>}
                </Grid>
              <TextField
                className={classes.p80}
                onChange={neuronSetChanged}
                value={neuronSet}
                label='Conjunto Neuronal'
                variant='outlined'
              />
              {advice && <Typography className={classes.text}><b>Nota:</b> Ajuste las variables de BFC antes de aprender para asociar dicho estado al aprendizaje del nuevo conocimiento, de esta forma se afecta el estado interno del cerebro.</Typography>}
              <BiologySlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay='on'
                valueLabelFormat={valuetext}
                onChange={setBFC(0)}
                value={biology}
              />
              <Typography className={clsx(classes.label, classes.biology)}><AccessibilityIcon className={classes.icon}/>Biology</Typography>
              <CulturalSlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay='on'
                valueLabelFormat={valuetext}
                onChange={setBFC(2)}
                value={culture}
              />
              <Typography className={clsx(classes.label, classes.cultural)}><MenuBookIcon className={classes.icon}/>Cultural</Typography>
              <FeelingsSlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay='on'
                valueLabelFormat={valuetext}
                onChange={setBFC(1)}
                value={feelings}
              />
              <Typography className={clsx(classes.label, classes.feelings)}><FavoriteIcon className={classes.icon}/>Feelings</Typography>
              <Button onClick={handleConfirm} className={classes.button} variant='contained' color='primary' disabled={!card || !category || !neuronSet}>Aprender</Button>
            </Grid>
            <Grid item xs={4}>
              <AdjustedCardList addRedirection={true} create={create}/>
            </Grid>
          </Grid>
          {card && <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {props.learnStatus === 'success' ? 'Exito!' : 'Algo ha salido mal'}
                </DialogTitle>
                <DialogContent dividers>
                {props.learnStatus === 'success' ? 'El aprendizaje se ha realizado sin inconvenientes' : 'Algo ha salido mal en el aprendizaje'}
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>}
        </div>
    )
}

const mapStateToProps = (state) =>{
  return ({
    cards: state.Project.cards,
    snbSight: state.Project.snbSight,
    snbHearing: state.Project.snbHearing,
    token: state.Auth.user ? state.Auth.user.token : null,
    learnStatus: state.Stimulus.learnStatus
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    learn: (card, data) => {
      dispatch(Learn(card, data));
    },
    getCards: () => {
      dispatch(getUserCards());
    },
    getAllCards: () => {
      dispatch(getCards())
    },
    getNeuronNumber: () => {
      // dispatch(null);
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Learning)
