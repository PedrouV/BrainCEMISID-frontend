import React from 'react'
import {connect} from 'react-redux'
import { makeStyles, Button, IconButton, Grid, Card, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import CardList from '../../Components/CardList'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {biology, cultural, feelings} from '../../Components/colors'
import { useEffect } from 'react';
import { getBooleanArrayFromImageData, resizeImage, createImageFromBooleanArray, amplifyBooleanArrayImage, transformHexArrayToBooleanArray } from '../../Store/Actions/Project';
import { LiveEpisode, GetIntentions } from '../../Store/Actions/Stimulus';
import AdjustedCardList from '../../Components/AdjustedCardList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';

const grid = 8;

const BiologySlider = withStyles({
  root: {
    color: '#54af98',
    height: 8,
    width: '80%',
    display: 'block',
    marginTop: '0em',
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
    marginTop: '0em',
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
    marginTop: '0em',
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles(theme=>({
  root: {
    padding: theme.spacing(4)
  },
  p80:{
    width: "80%"
  },
  settingsWrapper: {
    margin: theme.spacing(2,0)
  },
  settingWrapper: {
    margin: theme.spacing(1,0)
  },  
  canvasWrapper: {
    overflowX: 'auto',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    border: `2px #AAA solid`,
    borderRadius: theme.spacing(1)
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
    border: `8px ${theme.palette.primary.main} solid`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2)
  },
  card: {
    paddingTop: '100%'
  },
  button: {
    margin: theme.spacing(4,0)
  },
  innerImage: {
    minWidth: '100%',
    height: '100%',
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  label: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
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
  preview: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  instructions: {
    width: '80%',
    margin: theme.spacing(1,0)
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
  section: {
    margin:  theme.spacing(2,0)
  },
}))

const Intentions = (props) => {

  const getItemStyle = (isDragging, draggableStyle, image, id) => ({
    // some basic styles to make the items look a bit nicer
    position: 'relative',
    userSelect: 'none',
    padding: 0,
    minWidth: '200px',
    maxWidth: '200px',
    maxHeight: '200px',
    margin: `0 ${grid}px 0 0`,
    overflow: 'hidden',
    background: isDragging ? `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${image})` : `url(${image})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: grid,
    border: selectedItem && id === selectedItem.id ? `#5ba8ee solid 2px` : '1px solid #999',  
    // change background colour if dragging
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#CCC' : '#DDD',
    display: 'flex',
    padding: grid,
    display: 'flex',
    overflowX: 'auto',
    width: '80%',
    minHeight: `${grid*2+200}px`,
    borderRadius: grid,
    border: '2px solid #AAA'
  });

  const {bcf, desiredBcf, status, result} = props
  const [items, setItems] = React.useState([])
  const [lastId, setLastId] = React.useState(items.length)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [visualPattern, setVisualPattern] = React.useState(false)
  const [hearingPattern, setHearingPattern] = React.useState(false)
  
  useEffect(()=>{
    if(selectedItem){
      resizeImage(selectedItem.image, 16, 16).then(response=>{
        let arr = getBooleanArrayFromImageData(response.imageData, selectedItem.tolerances)
        createImageFromBooleanArray(amplifyBooleanArrayImage(arr, 12, response.imageData.width, response.imageData.height),response.imageData.width*12, response.imageData.height*12).then(image=>{
          setPreview(image)
        })
      }) 
    }else {
      setPreview(null)
    }
  },[selectedItem])

  useEffect(()=>{
    if(status === 'success'){
      if(result){
        console.log(null)
        const vp = JSON.parse(result[0].s_knowledge)._pattern
        const hp = JSON.parse(result[0].h_knowledge)._pattern
        console.log(vp, hp)
        const vBoolArr = transformHexArrayToBooleanArray(vp)
        const hBoolArr = transformHexArrayToBooleanArray(hp)
        let promises = []
        promises.push(createImageFromBooleanArray(amplifyBooleanArrayImage(vBoolArr, 12, 16, 16), 16*12, 16*12 , {true: {r: 238, g: 154, b: 18}, false: {r: 239, g: 239, b: 239}}))
        promises.push(createImageFromBooleanArray(amplifyBooleanArrayImage(hBoolArr, 12, 16, 16), 16*12, 16*12 , {true: {r: 119, g: 221, b: 119}, false: {r: 239, g: 239, b: 239}}))
        Promise.all(promises).then(images=>{
          setVisualPattern(images[0])
          setHearingPattern(images[1])
          setOpen(true)
        })
      }
    }else if(status === 'failure'){
      setOpen(true)
    }
  }, [status])

  useEffect(()=>{
    setOpen(false)
  },[items])

  const handleClose = (e) => {
    setOpen(false)
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items, 
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  const create = (e) =>{
    console.log(e)
    setItems([...items, {...e, id: ""+lastId, tolerance: 0.1, colorLimit: 255 - 254*0.1}])
    setLastId(lastId+1);
  }

  const handleConfirm = (e) =>{
    e.preventDefault();
    props.getIntentions(items, bcf);
  }

  const valuetext = (value) => {
    return `${value/100}`;
  }

  const edit = (id) => (e) => {
    console.log(id)
    const newSelectedItem = items.filter((item)=> (item.id === id))[0]
    if(selectedItem && selectedItem.id === newSelectedItem.id)
    setSelectedItem(null)
    else
    setSelectedItem(newSelectedItem)
  }

  const remove = (id) => (e) => {
    let newList = [...items]
    newList = newList.filter((item)=>(item.id !== id));
    if(selectedItem && id === selectedItem.id){
      setSelectedItem(null)
    }
    setItems(newList)
  }

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={8}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item.image,
                                item.id
                              )}
                            >
                                <div onClick={edit(item.id)} style={{position: 'absolute', width: '100%', height: '100%'}}></div>
                              <div></div>
                              <Button onClick={remove(item.id)} variant='contained' color='default' className={classes.close}><Typography><CloseIcon fontSize='small'/></Typography></Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Typography className={classes.instructions}>Puedes arrastrar los eventos para cambiar su orden, así mismo, puedes previsualizar el patrón visual y modificar la tolerancia al color de cada una de las imágenes seleccionadas haciendo click en aquellas que desees</Typography>
              {/* Visual Pattern Settings */ 
                selectedItem && preview && <Grid spacing={2} container className={clsx(classes.p80, classes.settingsWrapper)}>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Typography className={classes.label}>Previsualización del patrón neuronal</Typography>
                  <img className={classes.preview} src={preview}/>
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
              </Grid>}
              {/*Sliders*/}
              <Typography className={classes.label} style={{margin: '2em 0 0 0'}}>Estado Interno Deseado</Typography>
              <BiologySlider
                defaultValue={desiredBcf.biology*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.biology)}><AccessibilityIcon className={classes.labelIcon}/>Biology: {Math.round(bcf.biology*100)/100}</Typography>
              <CulturalSlider
                defaultValue={desiredBcf.culture*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.cultural)}><MenuBookIcon className={classes.labelIcon}/>Culture: {Math.round(bcf.culture*100)/100}</Typography>
              <FeelingsSlider
                defaultValue={desiredBcf.feelings*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.feelings)}><FavoriteIcon className={classes.labelIcon}/>Feelings: {Math.round(bcf.feelings*100)/100}</Typography>
              <Typography className={classes.label} style={{margin: '2em 0 0 0'}}>Estado Interno Actual</Typography>
              <BiologySlider
                defaultValue={bcf.biology*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.biology)}><AccessibilityIcon className={classes.labelIcon}/>Biology: {Math.round(bcf.biology*100)/100}</Typography>
              <CulturalSlider
                defaultValue={bcf.culture*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.cultural)}><MenuBookIcon className={classes.labelIcon}/>Culture: {Math.round(bcf.culture*100)/100}</Typography>
              <FeelingsSlider
                defaultValue={bcf.feelings*100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelFormat={valuetext}
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                disabled={true}
              />
              <Typography className={clsx(classes.label, classes.feelings)}><FavoriteIcon className={classes.labelIcon}/>Feelings: {Math.round(bcf.feelings*100)/100}</Typography>
              <Button disabled={items.length <= 0} onClick={handleConfirm} className={classes.button} variant='contained' color='primary'>Obtener Intenciones</Button>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h2' style={{fontSize: '2em', textAlign: 'center', fontWeight: 400, margin: '0 0 1em 0'}}>Imágenes Configuradas</Typography>
                <AdjustedCardList create={create}/>
            </Grid>
          </Grid>
          {visualPattern && hearingPattern && items.length && <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pensamiento:
                </DialogTitle>
                <DialogContent dividers>
                <div className={classes.section}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <div className={classes.wrapper}>
                      <VisibilityIcon className={classes.icon}/>
                      <img src={visualPattern}/>
                    </div>
                  </Grid>
                  <Grid item xs={4} className={classes.wrapper}>
                    <Typography className={classes.bolder}>Categoría</Typography>
                    <Typography>{result[0] && result[0].h_knowledge ? JSON.parse(result[0].h_knowledge)._class : ''}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.wrapper}>
                      <HearingIcon className={classes.icon}/>
                      <img src={hearingPattern}/> 
                    </div>
                  </Grid>
                </Grid>
                </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>}
                {items.length && status === 'failure' && <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pensamiento:
                </DialogTitle>
                <DialogContent dividers>
                <div className={classes.section}>
                <Typography>MISS: Patrón Visual no reconocido.</Typography>
                </div>
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
    bcf: state.Project.internalState,
    desiredBcf: state.Project.desiredState,
    status: state.Stimulus.intentionStatus,
    result: state.Stimulus.intentionResult,
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    getIntentions: (items, bcf) => {
      dispatch(GetIntentions(items, bcf));
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Intentions)
