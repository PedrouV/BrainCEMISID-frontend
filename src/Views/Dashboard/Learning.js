import React, { useEffect, Fragment } from 'react'
import {connect} from 'react-redux'
import { makeStyles, Button, Grid, Card, Typography, InputLabel, MenuItem, Select, Paper, Tabs, Tab, TextField, Divider } from '@material-ui/core';
import EpisodeCard from '../../Components/EpisodeCard';
import {n1, n2, n3, n4, n5, n6, n7, n8, n9, n0} from '../../Components/PreloadedCardImages'
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import {biology, cultural, feelings} from '../../Components/colors'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { getUserCards, Learn, getCards, getBooleanArrayFromImageData, createImageFromBooleanArray, resizeImage, transformIntToHexArray } from '../../Store/Actions/Project';
import SelectInput from '@material-ui/core/Select/SelectInput';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardList from '../../Components/CardList';

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
    maxHeight: `${200}px`,
    height: `${200}px`,
    display: 'flex',
    width: `${200}px`,
    position: 'relative',
    background: '#333',
    borderRadius: theme.spacing(1),
    border: `2px #AAA solid`,
    alignSelf: 'flex-end'
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
  const [advice, setAdvice] = React.useState(false)
  const [className, setClassName] = React.useState('all')
  const [biology, setBiology] = React.useState(0)
  const [culture, setCulture] = React.useState(0)
  const [feelings, setFeelings] = React.useState(0)
  const [cardArray, setCardArray] = React.useState([]) 
  const [classNames, setClassNames] = React.useState([])
  const [cardTab, setCardTab] = React.useState(0)
  const [preview, setPreview] = React.useState(null)
  const [tolerance, setTolerance] = React.useState(0.1)
  const [colorLimit, setColorLimit] = React.useState(229.5)
  const [visualHearing, setVisualHearing] = React.useState(null)
  const [category, setCategory] = React.useState('')
  const [hearingPattern, setHearingPattern] = React.useState([])
  const [neuronSet, setNeuronSet] = React.useState([])
  const [previousCategories, setPreviousCategories] = React.useState([{title: 'hola', pattern: []}, {title: 'gato', pattern: []}, {title: 'perro', pattern: []}, {title: 'gallo', pattern: []}, {title: 'gamificacion', pattern: []}])
  
  //Tolerance Changed
  useEffect(()=>{
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
  
  //tab changed
  useEffect(()=>{
    if(cardTab === 0){
      if(props.token)
        props.getCards()
    }
    else
      props.getAllCards();
  }, [cardTab])

  //on mount
  useEffect(()=>{
    if(props.token)
    props.getCards();
    props.getNeuronNumber();
  }, [props.token])

  //cards changes
  useEffect(()=>{
    getClassNames();
  }, [props.cards])

  //cards changes or filter applied
  useEffect(()=>{
    getCardSet();
  }, [props.cards, className])

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

  const getClassNames = () =>{
    let names = []
    props.cards.forEach(c=>{
      if(names.findIndex((v)=>(c.class === v)) === -1){
        names.push(c.class)
      }
    })
    setClassNames(names);
  }
  
  const getCardSet = () => {
    const cardSet = props.cards.filter((c)=> {return (c.class === className || className === 'all')})
    setCardArray(cardSet)
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
      colorLimit : colorLimit,
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

  const changeTolerance = (e, newValue) => {
    setTolerance(newValue/100);
    setColorLimit(255 - 254*newValue/100)
  }

  const valuetext = (value) => {
    return `${value/100}`;
  }

  const handleSelectChange = (e) => {
    setClassName(e.target.value)
  }

  const handleTabChange = (e, value) => {
    setCardTab(value)
  }

  const changeCategory = (e, val) => {
    setCategory(val)
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
                  <Typography className={classes.patternText}><HearingIcon/><br/>Categoría<br/>{category}</Typography>
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
                    <img src={visualHearing} className={classes.visualHearing}/>
                    </div>}
                </div>
              </div>
              {card && 
                <Grid container spacing={2} className={classes.p80}>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12} className={classes.innerGrid}>
                    <Typography className={classes.sectionTitle}>Ajustes del Patrón Visual:</Typography>
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
                </Grid>}
              {!card && <Divider/>}
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
              <CardList create={create}/>
            </Grid>
          </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return ({
    cards: state.Project.cards,
    snbSight: state.Project.snbSight,
    snbHearing: state.Project.snbHearing,
    token: state.Auth.user ? state.Auth.user.token : null
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
