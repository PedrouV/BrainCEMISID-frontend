import React from 'react'
import { Typography, Card, Grid, LinearProgress } from '@material-ui/core';
import AddIcon  from '@material-ui/icons/Add'
import {Link as RouterLink} from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/styles';
import {biology, cultural, feelings} from '../Components/colors'
import { connect } from 'react-redux';
import { GetProjectDetails } from '../Store/Actions/Project';

const Link = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const BiologyLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#EEEEEE',
    },
    barColorPrimary: {
      backgroundColor: biology,
    },
  })(LinearProgress);

const CulturalLinearProgress = withStyles({
colorPrimary: {
    backgroundColor: '#EEEEEE',
},
barColorPrimary: {
    backgroundColor: cultural,
},
})(LinearProgress);

const FeelingsLinearProgress = withStyles({
colorPrimary: {
    backgroundColor: '#EEEEEE',
},
barColorPrimary: {
    backgroundColor: feelings,
},
})(LinearProgress);

const useStyles = makeStyles(theme=>({
    root: {

    },
    card: {
        height: '250px',
        background: 'none',
        color: theme.palette.primary.dark,
        
    },
    title:{
        padding: theme.spacing(2),
        background: theme.palette.secondary.main,
        color: 'white',
        textDecoration: 'none !important',
        textTransform: 'none'
    },
    text: {
        padding: theme.spacing(1,2),
        textDecoration: 'none !important',
        textTransform: 'uppercase',
    },
    centered: {
        alignSelf: 'center',
        width: '50%',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
        borderRadius: '5px'
    },
    wrapper: {
        display: 'flex',
        width: '100%',
        padding: theme.spacing(1),
        boxSizing: 'border-box'
    },
    cardContent: {
        height: `calc(100% - ${theme.spacing(1)*2}px - 1em)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2em'
    }
}))

const ProjectPreview = (props) => {

    const {project, add} = props;
    const classes = useStyles();

    const goProject = (e) => {
        props.getProjectDetails(project)
    }

    if(add)
    return(
        <Grid component={Link} to={`/new-project`} item xs={4}>
            <Card  className={classes.card}>
                <Typography className={classes.title}>Nuevo BrainCEMISID</Typography>
                <div className={classes.cardContent}>
                    <AddIcon fontSize='large'/>
                </div>
            </Card>
        </Grid>    
    )
    return (
        <Grid component={Link} to={`/dashboard/${project.id}`} item xs={4} onClick={goProject}>
            <Card  className={classes.card}>
                <Typography className={classes.title}>{project.name}</Typography>
                <div className={classes.wrapper}>
                        <Typography className={classes.centered}>Biology</Typography>
                        <BiologyLinearProgress className={classes.centered} variant='determinate' value={project.internal_state.biology*100}/>
                </div>
                <div className={classes.wrapper}>
                        <Typography className={classes.centered}>Feelings</Typography>
                        <FeelingsLinearProgress className={classes.centered} variant='determinate' value={project.internal_state.feelings*100}/>
                </div>
                <div className={classes.wrapper}>
                        <Typography className={classes.centered}>Cultural</Typography>
                        <CulturalLinearProgress className={classes.centered} variant='determinate' value={project.internal_state.culture*100}/>
                </div>
            </Card>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getProjectDetails: (project) => {
            dispatch(GetProjectDetails(project))
        }
    })
}

export default connect(null, mapDispatchToProps)(ProjectPreview)
