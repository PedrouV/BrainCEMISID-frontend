import React from 'react'
import { makeStyles, Grid, Card, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { useEffect } from 'react'
import { getAdjustedCards } from '../Store/Actions/Project'
import { RootRoute } from '../Config/api'

const useStyles = makeStyles(theme=>({
    root: {

    },
    panelWrapper: {
        overflowX: 'auto',
        overflowY: 'auto',
        maxWidth: '100%',
        maxHeight: '75vh',
        border: `2px ${theme.palette.primary.main} solid`,
        borderRadius: '8px',
        margin: '10vh 0 0 0',
        padding: theme.spacing(2)
    },
    card: {
        paddingTop: '100%'
    },
}))

const CCard = (props) => {
    const {card, elementId, clickFunction, className} = props;
    const classes = makeStyles(theme=>({
      root: {
        background: `url(${RootRoute}${card.img})`, 
        backgroundSize: 'cover' 
      },
    }))();
    return (<Card onClick={clickFunction} id={elementId} className={clsx(className, classes.root)}>
      </Card>)
  }

const AdjustedCardList = (props) => {
    const classes = useStyles();
    const {cards, projectId, token, adjustmentStatus} = props

    useEffect(()=>{
        console.log('Project changed', projectId, token)
        if((token && projectId !== -1) || adjustmentStatus === 'success')
        props.getAdjustedCards();
    },[projectId, token, adjustmentStatus])


    const create = (e) => {
        if(props.create){
            const card = cards[e.target.id];
            const data = {image: RootRoute+card.img, id: card.image, class: card.class, tolerances: {r: card.r_tolerance, g: card.g_tolerance, b: card.b_tolerance}}
            props.create(data)
            console.log(data)
        }else{
            console.log(cards[e.target.id]);
        }
    }
    return (
        <div>
            <Grid container spacing={1} className={classes.panelWrapper}>
                {cards.map((card, index)=>{
                    return (
                        <Grid item xs={4} >
                          <CCard className={classes.card} elementId={index} clickFunction={create} card={card}/>
                        </Grid>
                    )
                })
                }
                {cards.length === 0 &&
                <Typography>No has hecho ajustes aún de ninguna imagen.</Typography>}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        cards: state.Project.adjustedCards,
        projectId: state.Project.projectId,
        token: state.Auth.user ? state.Auth.user.token : null,
        adjustmentStatus: state.Project.adjustCardStatus
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getAdjustedCards: () => {
            dispatch(getAdjustedCards())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdjustedCardList)
