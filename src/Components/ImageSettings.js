import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Divider, withStyles, Slider, Typography, Button } from '@material-ui/core'
import { useEffect } from 'react'
import ForwardIcon from '@material-ui/icons/Forward';
import { resizeImage, getBooleanArrayFromImageData, createImageFromBooleanArray, setCardSettings } from '../Store/Actions/Project';

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: '200px',
        height: '200px',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        margin: theme.spacing(2,0)
    },
    imagesWrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing(2,0)
    }
}))

const RSlider = withStyles({
    root: {
      color: '#FF0000',
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

  const GSlider = withStyles({
    root: {
      color: '#00FF00',
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

  const BSlider = withStyles({
    root: {
      color: '#0000FF',
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

  const GlobalSlider = withStyles({
    root: {
      color: '#000000',
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

const ImageSettings = (props) => {
    const classes = useStyles();
    const {image, snbSight} = props
    const [processedImage, setProcessedImage] = React.useState(null)
    const [rgbTolerance, setRgbTolerance] = React.useState({r: 0.1, g: 0.1, b: 0.1})
    const [disabled, setDisabled] = React.useState(false)

    const searchForImageInNeurons = (imageId) => {
        let flag = false;
        snbSight.forEach(neuron=>{
            if(neuron.img === imageId)
            flag = true;
        })
        return flag
    }

    useEffect(()=>{
        if(image){
            resizeImage(image.image, 200, 200).then(resizedImage=> {
                const boolArr = getBooleanArrayFromImageData(resizedImage.imageData, rgbTolerance)
                createImageFromBooleanArray(boolArr, 200, 200).then(img=>{
                    setProcessedImage(img)
                })
            })
        }
    }, [image, rgbTolerance])

    useEffect(()=>{
        if(image){
            if(image.tolerances){
                console.log(image.tolerances)
                setRgbTolerance({r: image.tolerances.r, g: image.tolerances.g, b: image.tolerances.b})
            }
            let dis = searchForImageInNeurons(image.id)
            console.log(dis)
            setDisabled(dis)
        }
    }, [image])

    const handleColorChange = (color) => (e, val) => {
        let newTolerances = {...rgbTolerance};
        newTolerances[color] = val/100
        setRgbTolerance(newTolerances)
    }

    const handleGlobalChange = (e, val) => {
        setRgbTolerance({r: val/100, g: val/100, b: val/100})
    }

    const valuetext = (value) => {
        return `${Math.round(value)}%`;
    }
    
    const handleSaveChanges = () => {
        props.saveSettings(image.id, rgbTolerance)
    }

    return (
        <div className={classes.root}>
            <Typography style={{textAlign: 'center', margin: '1em 0', fontWeight: 500, width: '90%', margin: 'auto'}}>La configuración de la imagen puede cambiarse siempre que ne se haya aprendido ningun patrón visual asociado a dicha imagen, luego de aprenderse, la configuración no podrá variar nuevamente</Typography>
            <div className={classes.imagesWrapper}>
                <img src={image ? image.image : null} className={classes.image}/>
                <ForwardIcon color='primary' fontSize='large'/>
                <img src={processedImage} className={classes.image}/>
            </div>
            {disabled && <Typography style={{color: 'red', fontWeight: 500, fontSize: '0.8em'}}>Esta imagen ya ha sido aprendida, por lo que sus valores no pueden ser editados nuevamente</Typography>}
            <Divider style={{width: '90%', margin: '16px 0 16px 0'}}/>
            <Typography>Filtro General</Typography>
            <GlobalSlider
            disabled={!image || disabled}
            onChange={handleGlobalChange}
            min={0}
            max={100}
            valueLabelFormat={valuetext}
            valueLabelDisplay='auto'

            />
            <Divider style={{width: '90%', margin: '16px 0 16px 0'}}/>
            <Typography>Filtros RGB</Typography>
            <Typography>Rojo</Typography>
            <RSlider
            disabled={!image || disabled}
            onChange={handleColorChange('r')}
            value={rgbTolerance.r*100}
            valueLabelFormat={valuetext}
            valueLabelDisplay='auto'
            min={0}
            max={100}
            
            />
            <Typography>Verde</Typography>
            <GSlider
            disabled={!image || disabled}
            onChange={handleColorChange('g')}
            value={rgbTolerance.g*100}
            valueLabelFormat={valuetext}
            valueLabelDisplay='auto'
            min={0}
            max={100}
            
            />
            <Typography>Azul</Typography>
            <BSlider
            disabled={!image || disabled}
            onChange={handleColorChange('b')}
            value={rgbTolerance.b*100}
            valueLabelFormat={valuetext}
            valueLabelDisplay='auto'
            min={0}
            max={100}
            
            />
            <Divider style={{width: '90%', margin: '16px 0 16px 0'}}/>
            <Button disabled={!image || disabled} onClick={handleSaveChanges} className={classes.button} variant='contained' color='primary'>Guardar Configuración</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        snbSight: state.Project.snbSight
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveSettings: (cardId, tolerances) => {
            dispatch(setCardSettings(cardId, tolerances))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSettings)
