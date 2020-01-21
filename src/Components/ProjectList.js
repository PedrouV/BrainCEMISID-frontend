import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import ProjectPreview from './ProjectPreview'

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(4)
    }
}))

function ProjectList(props) {

    const {projects} = props
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <ProjectPreview add={true}/>
                {projects && projects.map((project, index)=>{
                    return(
                        <ProjectPreview project={project} key={index}/>
                    )
                })}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return({
        projects: state.Auth.projects,
        projects2: [
            {
                name: 'nombre1',
                id: '1',
                owner: 'propietario',
                bfc: {
                    biology: 0.4,
                    feelings: 0.7,
                    cultural: 0.27
                }
            },
            {
                name: 'nombre2',
                id: '2',
                owner: 'propietario',
                bfc: {
                    biology: 0.8,
                    feelings: 0.1,
                    cultural: 0.42
                }
            },
            {
                name: 'nombre3',
                id: '3',
                owner: 'propietario',
                bfc: {
                    biology: 0.53,
                    feelings: 0.18,
                    cultural: 0.99
                }
            },
            {
                name: 'nombre4',
                id: '4',
                owner: 'propietario',
                bfc: {
                    biology: 0.35,
                    feelings: 0.47,
                    cultural: 0.85
                }
            },
            {
                name: 'nombre5',
                id: '5',
                owner: 'propietario',
                bfc: {
                    biology: 0.4,
                    feelings: 0.7,
                    cultural: 0.27
                }
            }
        ]
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
