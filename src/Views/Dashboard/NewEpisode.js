import React from 'react'
import {connect} from 'react-redux'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { makeStyles, Button, IconButton, Grid, Card, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EpisodeCard from '../../Components/EpisodeCard';
import {n1, n2, n3, n4, n5, n6, n7, n8, n9, n0} from '../../Components/PreloadedCardImages'
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';


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


const NewEpisode = (props) => {

  const [episodesList, setEpisodesList] = React.useState([])
  const [episodesListPositions, setEpisodesListPositions] = React.useState([])
  const [sortedList, setSortedList] = React.useState([])

  let list = []
  const boxSize = 200;
  const useStyles = makeStyles(theme=>({
    root: {
      padding: theme.spacing(4)
    },  
    canvas: {
      maxHeight: `${180+theme.spacing(4)}px`,
      height: `${180+theme.spacing(4)}px`,
      display: 'flex',
      flexWrap: 'nowrap',
      minWidth: '100%',
      overflowX: 'hidden',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      width: `${episodesList.length*200+(episodesList.length+1)*theme.spacing(1)}px`,
      padding: theme.spacing(1), 
      position: 'relative',
      background: '#333',
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
      border: `2px ${theme.palette.primary.main} solid`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2)
    },
    card: {
      paddingTop: '100%'
    },
    button: {
      margin: theme.spacing(4,0)
    }
  }))

  const create = (e) =>{
    setEpisodesList([...episodesList, props.cards[e.target.id].image])
    setEpisodesListPositions([...episodesListPositions, {position: null, index: episodesListPositions.length}])
  }

  const onStop = (e, ui) =>{
    let canvas = document.getElementById('canvas')
    let newList = []
    for(let i = 0; i< canvas.children.length ; i++){
      if(ui.node === canvas.children[i]){
        console.log('eureka', i)
        let obj = canvas.children[i];
        var childPos = obj.offset;
        console.log(canvas.children[i].offsetLeft + ui.lastX)
        newList.push({position: canvas.children[i].offsetLeft + ui.lastX, index: i})
      }else{
        newList.push({position: episodesListPositions[i].position, index: i})
      }
      setEpisodesListPositions(newList)
      let sorted = episodesListPositions
      sorted = sorted.sort((a,b)=>{
        return (a.position - b.position)
      })
      setSortedList(sorted)
    }
  }

  const handleConfirm = (e) =>{
    e.preventDefault();
    let orderedList = episodesListPositions.sort((a,b)=>{
      return (a.position - b.position)
    })
    console.log(episodesListPositions, orderedList)
  }

  const valuetext = (value) => {
    return `${value}°C`;
  }

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={8}>
              <div className={classes.canvasWrapper}>
                <div className={classes.canvas} id='canvas'>
                  {episodesList.map((episode, index)=>{
                    return(<EpisodeCard onStop={onStop} src={episode} key={index} id={index} zIndex={sortedList.findIndex((el)=>el.index === index) === -1 ? 1 :  sortedList.findIndex((el)=>el.index === index)*10}/>)
                  })}
                </div>
              </div>
              <BiologySlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <CulturalSlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <FeelingsSlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                
                marks={true}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
              <Button onClick={handleConfirm} className={classes.button} variant='contained' color='primary'>Vivir Episodio</Button>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.panelWrapper}>
                  <Grid container spacing={1}>
                    {props.cards.map((card, index) =>{
                      return(
                        <Grid item xs={4} >
                          <Card onClick={create} id={index} className={classes.card} style={{background: `url(${card.image})`, backgroundSize: 'cover'}}>
                          </Card>
                        </Grid>
                      )
                    })}
                  </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return ({
    cards: [
      {image: n1,},
      {image: n2,},
      {image: n3,},
      {image: n4,},
      {image: n5,},
      {image: n6,},
      {image: n7,},
      {image: n8,},
      {image: n9,},
      {image: n0,},
    ]
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({

  })
}

export default connect(mapStateToProps)(NewEpisode)
