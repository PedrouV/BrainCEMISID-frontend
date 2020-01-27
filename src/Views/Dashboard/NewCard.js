import React from 'react'
import Cropper from 'react-cropper'
import Container from '@material-ui/core/Container'
import 'cropperjs/dist/cropper.css';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx'
import p from '../../Assets/1.png'
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { SaveCard } from '../../Store/Actions/Project';

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    },
    fileInput: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
    },
    fileLabel: {
        width: '100%',
        height: '50vh',
        fontSize: '1.25em',
        fontWeight: 'bolder',
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: theme.spacing(1)
    },
    fileLabelOnlyText: {
        fontSize: '1.25em',
        fontWeight: 'bolder',
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        borderWidth: '2px 2px 0px 2px',
        borderRadius: theme.spacing(1,1,0,0),
        padding: theme.spacing(1, 2)
    },
    uploadIcon: {
        margin: theme.spacing(0,1)
    },
    uploadIcon2: {
        width: 200,
        height: 200,
        fill: 'white',
        background: theme.palette.primary.main,
        padding: theme.spacing(4),
        margin: theme.spacing(2),
        borderRadius: '50%'
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        border: `dashed 3px ${theme.palette.secondary.main}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(6,4),
        justifyContent: 'center',
        alignItems:'center',
        textTransform: 'uppercase'
    },
    formField: {
        margin: theme.spacing(2,0),
        width: '50%',
    },
    title: {
        marginBottom: theme.spacing(4),
        fontFamily: 'roboto',
        fontSize: '1.5em'
    },
    button: {
        margin: theme.spacing(2,0)
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    label: {
        fontSize: '1',
        color: '#707070'
    }
}))

const NewCard = (props) => {
    const classes = useStyles();
    const cropper = React.createRef(null);
    const [textImage, setTextImage] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [name, setName] = React.useState('')
    const [className, setClassName] = React.useState('')
    let cropperjsx = null;

    const upload_Icon = <svg className={clsx(!file ? classes.uploadIcon2 : classes.uploadIcon)} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>

    let labeljsx = (<label className={classes.fileLabel} htmlFor='upload'>
        <div className={classes.innerWrapper}>
            Sube una Imagen
            {upload_Icon}
        </div>
    </label>);

    const handleSubmit = (e) =>{
        e.preventDefault();
        let image = new Image();
        image.src = cropper.current.cropper.getCroppedCanvas().toDataURL()
        let flag = false;
        image.onload = ()=>{
        if(!flag){
            flag = true;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 200;
            ctx.fillStyle = "#FFF";
            ctx.fillRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(image,
            0,
            0,
            canvas.width,
            canvas.height,
            )
            let optimizedImageURL = canvas.toDataURL();
            setTextImage(optimizedImageURL)
            props.save(name, className, optimizedImageURL)
        }
        }
    }

    const handleChange = (event) =>{
        let temp = URL.createObjectURL(event.target.files[event.target.files.length-1]);
        setFile(temp)
      }
    
    const handleTextChanges = (event) => {
        if(event.target.id === 'name')
        setName(event.target.value)
        else
        setClassName(event.target.value)
    }

    if(file){
        cropperjsx = (<Cropper
            ref={cropper}
            src={file}
            style={{height: '50vh', width: '100%', border: '2px solid #0055a0'}}
            // Cropper.js options
            aspectRatio={1}
            guides={true}
            /* crop={this._crop.bind(this)}*/ />)
        labeljsx = <label className={classes.fileLabelOnlyText} htmlFor='upload'>
            {upload_Icon}
            Sube otra Imagen
        </label>
    }

    return (
        <Container className={classes.root}>
        <Typography variant='h2' style={{fontSize: '2em', fontWeight: 400, margin: '0 0 1em 0'}}>Creación de Tarjetas</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Nombre de la Nueva Tarjeta</Typography>
                    <TextField
                        className={classes.textField}
                        id='name'
                        value={name}
                        fullWidth
                        onChange={handleTextChanges}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Conjunto de la Nueva Tarjeta</Typography>
                    <TextField
                        className={classes.textField}
                        id='className'
                        value={className}
                        fullWidth
                        onChange={handleTextChanges}
                    />
                </Grid>
            </Grid>
            <form>
                <input className={classes.fileInput} name='upload' id='upload' type="file" onChange={handleChange}/>
                {labeljsx}
                {cropperjsx}
            </form>
            <Button disabled={!file || !name || !className} variant='contained' color='primary' onClick={handleSubmit} className={classes.button}>Guardar</Button>
            <img src={textImage}/>   
        </Container>
    )
}

const mapStateToProps = (state) => {
    return ({

    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        save: (name, className, data) => {
            dispatch(SaveCard({name, className, data}))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
