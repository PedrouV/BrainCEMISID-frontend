import React from 'react'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import CardList from '../../Components/CardList'
import ImageSettings from '../../Components/ImageSettings'
import AdjustedCardList from '../../Components/AdjustedCardList'

const useStyles = makeStyles(theme=>({
    root: {
        padding: theme.spacing(2)
    },
    gridStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    }
}))

const ImageRoom = (props) => {
    const classes = useStyles()
    const [image, setImage] = React.useState(null)

    const setImageToAdjust = (image) => {
        setImage(image)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <CardList create={setImageToAdjust}/>
                </Grid>
                <Grid item xs={6} className={classes.gridStyle}>
                    <ImageSettings image={image}/>
                </Grid>
                <Grid item xs={3} >
                    <AdjustedCardList create={setImageToAdjust}/>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({

    })
}

const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageRoom)
