import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import { getCards, getUserCards } from '../Store/Actions/Project'
import { Paper, Tabs, Tab, InputLabel, Select, MenuItem, Grid, makeStyles, Card } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme=>({
    root: {

    },
    label: {
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center'
    },
    blackText: {
        color: 'black',
        marginBottom: theme.spacing(1)
    },
    tabsWrapper: {
        marginBottom: theme.spacing(2),
        background: 'transparent',
        boxShadow: 'none'
    },
    selectInput: {
        marginBottom: theme.spacing(2),
        textTransform: 'capitalize'
    },
    menuItem: {
        textTransform: 'capitalize'
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
}))

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

const CardList = (props) => {
    const [cardArray, setCardArray] = React.useState([]) 
    const [classNames, setClassNames] = React.useState([])
    const [className, setClassName] = React.useState('all')
    const [cardTab, setCardTab] = React.useState(0)
    const classes = useStyles();

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

    useEffect(()=>{
    if(cardTab === 0){
        if(props.token){
          props.getCards()
        }
    }
    else
        if(props.token){
          props.getAllCards();
        }
    }, [cardTab])

    useEffect(()=>{
        getClassNames();
    }, [props.cards])

    useEffect(()=>{
        getCardSet();
    }, [props.cards, className])

    useEffect(()=>{
        if(props.token){
          props.getCards();
        }
    }, [])

    const create = (e) =>{
        props.create({image: cardArray[e.target.id].image, id: cardArray[e.target.id].id, class: cardArray[e.target.id].class})
      }
      const handleSelectChange = (e) => {
        setClassName(e.target.value)
      }
    

    const handleTabChange = (e, value) => {
        setCardTab(value)
      }

    return (
        <Fragment>
            <Paper>
                <Tabs
                    value={cardTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className={classes.tabsWrapper}
                >
                    <Tab label="Propios" />
                    <Tab label="Todos los Usuarios" />
                </Tabs>
            </Paper>
            <InputLabel className={clsx(classes.label, classes.blackText)} htmlFor="className">Filtrar por Clase</InputLabel>
            <Select
                value={className}
                inputProps={{
                    name: 'className',
                    id: 'className',
                }}
                onChange={handleSelectChange}
                fullWidth
                className={classes.selectInput}
            >
                <MenuItem value={'all'}>Todos</MenuItem>
                {classNames.map(n=>{
                  return <MenuItem value={n} className={classes.menuItem}>{n}</MenuItem>
                })}
              </Select>
              <div className={classes.panelWrapper}>
                  <Grid container spacing={1}>
                    {cardArray.map((card, index) =>{
                      return(
                        <Grid item xs={4} >
                          <CCard className={classes.card} elementId={index} clickFunction={create} card={card}/>
                        </Grid>
                      )
                    })}
                  </Grid>
              </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
   return ({
    token: state.Auth.user ? state.Auth.user.token : null,
    cards: state.Project.cards
   }) 
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getCards: () => {
            dispatch(getUserCards());
        },
        getAllCards: () => {
            dispatch(getCards())
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
