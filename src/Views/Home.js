import React from 'react'
import { Button, makeStyles, Typography, Container, Link } from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'

const RLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


function Copyright(props) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={props.className}>
        {'Copyright © BrainCEMISID '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    header: {
        background: theme.palette.primary.main,
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.42)',
    },
    content: {
        minHeight: '85vh',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyright: {
        background: theme.palette.primary.dark,
        color: 'white',
        height: '5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px -5px 5px 0px rgba(0,0,0,0.3)',
    },
    title: {
        fontSize: '2em'
    },
    subtitle: {
        marginTop: theme.spacing(1),
        fontSize: '1em'
    },
    button: {
        margin: theme.spacing(1)
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(4,0)
    },
    sectionTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        fontSize: '2em'
    },
    text: {
        // maxWidth: '800px',
        marginBottom: theme.spacing(2),
        textAlign: 'left'
    },
    buttonsWrapper: {
        margin: theme.spacing(2,0)
    }
}))

const Home = (props) => {

    const {user} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant='h1' className={classes.title}>BrainCEMISID</Typography>
                <Typography variant='h2' className={classes.subtitle}>Panel de Proyectos</Typography>
            </div>
            <div className={classes.content}>
                <Container className={classes.container}>
                    <Typography variant='h3' className={classes.sectionTitle}>Panel de Proyectos BrainCEMISID</Typography>
                    <Typography className={classes.text}>El proyecto <b>BrainCEMISID</b> es la primera arquitectura cognitiva de la Universidad de los Andes (Mérida-Venezuela) que aborda problemas como la representación de información visual y auditiva, la resolución de ambigüedades sensoriales, la composición básica del estímulo visual en información cultural más compleja, la toma de decisiones autónoma basada en intenciones, entre otros.</Typography>
                    <Typography className={classes.text}>En esta aplicación web, podrá gestionar sus proyectos BrainCEMISID por medio de la interfaz gráfica, si necesita hacer la integración con una apicación externa, leer la documentación del API en su repositorio</Typography>
                    {!user && <div className={classes.buttonsWrapper}>
                        <Button color='primary' variant='contained' className={classes.button} component={RLink} to='/auth/login' >Iniciar Sesión</Button>
                        <Button color='secondary' variant='contained' className={classes.button} component={RLink} to='/auth/signup' >Registro</Button>
                    </div>}
                    {user && <div className={classes.buttonsWrapper}>
                        <Button  color='primary' variant='contained' component={RLink} to='/projects' >Ir a los Proyectos</Button>
                    </div>}
                    <Typography variant='h3' className={classes.sectionTitle}>Información Técnica</Typography>
                    <Typography className={classes.text}>El núcleo BrainCEMISID está escrito en Python 3.7.4, esto significa que todos los dispositivos con un intérprete de Python 3.7.4 o superior pueden ejecutar el código.</Typography>
                    <Typography className={classes.text}>La persistencia de los datos, esta basado en el sistema de base de datos SQL de Postgres, este puede ser cambiado por algun otro sistema gestor de bases de datos y haciendo sus respectivas modificaciones en la configuración del API Rest trabajado en Django.</Typography>
                    <Typography variant='h3' className={classes.sectionTitle}>Codigo Fuente</Typography>
                    <Typography className={classes.text}>El <Link href='https://github.com/soulblckdstroyer/BrainCEMISID-on-Web'>Backend</Link> y el <Link href='https://github.com/PedrouV/BrainCEMISID-frontend/'>Frontend</Link> completo de este proyecto puede ser encontrado y descargado desde el sus respectivos repositorios en GitHub, e instalados siguiendo sus respectivas instrucciones de instalación, en caso de dudas favor contactar a los propietarios del repositorio según sea el caso.</Typography>
                    <Typography className={classes.text}>Para descargar únicamente el Kernel del proyecto junto a una GUI sencilla desarrollada en Kivy, puede hacerlo accediendo a éste <Link href='https://github.com/braincemisid/kernel'>repositorio</Link></Typography>
                    <Typography variant='h3' className={classes.sectionTitle}>Contribuyentes</Typography>
                    <ul>
                        <li>Jonathan Monsalve</li>
                        <li>Julio Muchacho</li>
                        <li>Ricardo Graterol</li>
                        <li>Ricardo Bruzual</li>
                        <li>Johan Sosa</li>
                        <li>Breytner Fernández</li>
                        <li>Pedro Vilchez</li>
                        <li>Kristo Lopez</li>
                    </ul>
                </Container>
            </div>
            <Copyright className={classes.copyright}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return({
        user: state.Auth.user
    })
}

export default connect(mapStateToProps)(Home)
