import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import SchoolIcon from '@material-ui/icons/School';
import ListIcon from '@material-ui/icons/List';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import React, { Fragment } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom'
import UpdateIcon from '@material-ui/icons/Update';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const Link = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export const PrimaryItems = (props) =>{
    const {pathId} = props
    return (
        <Fragment>
            <ListItem button component={Link} to={`/dashboard/${pathId}`}>
            <ListItemIcon>
                <EqualizerIcon/>
            </ListItemIcon>
            <ListItemText>
                Resumen
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/learning`}>
            <ListItemIcon>
                <SchoolIcon/>
            </ListItemIcon>
            <ListItemText>
                Aprendizaje
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/queries`}>
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <ListItemText>
                Reconocimiento
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/new-episode`}>
            <ListItemIcon>
                <DynamicFeedIcon/>
            </ListItemIcon>
            <ListItemText>
                Episodios de Vida
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/intentions`}>
            <ListItemIcon>
                <UpdateIcon/>
            </ListItemIcon>
            <ListItemText>
                Intenciones
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/new-card`}>
            <ListItemIcon>
                <AddPhotoAlternateIcon/>
            </ListItemIcon>
            <ListItemText>
                Nueva Tarjeta
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/image-room`}>
            <ListItemIcon>
                <WallpaperIcon/>
            </ListItemIcon>
            <ListItemText>
                Ajuste de Imágenes
            </ListItemText>
            </ListItem>
        </Fragment>
    )
}



export const SecondaryItems = (props) =>{

    const {pathId} = props

    return (
        <Fragment>
            <ListItem button component={Link} to={`/dashboard/${pathId}/sight`}>
            <ListItemIcon>
                <VisibilityIcon/>
            </ListItemIcon>
            <ListItemText>
                Vista
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/hearing`}>
            <ListItemIcon>
                <HearingIcon/>
            </ListItemIcon>
            <ListItemText>
                Oido
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/relational-network`}>
            <ListItemIcon>
                <AccountTreeIcon/>
            </ListItemIcon>
            <ListItemText>
                Relaciones
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/dashboard/${pathId}/episodes`}>
            <ListItemIcon>
                <DynamicFeedIcon/>
            </ListItemIcon>
            <ListItemText>
                Episodios de Vida
            </ListItemText>
            </ListItem>
        </Fragment>)

}

export const ExtraItems = (props) =>{

    const {pathId} = props

    return (
        <Fragment>
            <ListItem button component={Link} to={`/`}>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText>
                Pagina Principal
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/projects`}>
            <ListItemIcon>
                <FolderIcon/>
            </ListItemIcon>
            <ListItemText>
                Todos los Proyectos
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/`} onClick={props.logOutFunction}>
            <ListItemIcon>
                <ExitToAppIcon/>
            </ListItemIcon>
            <ListItemText>
                Cerrar Sesión
            </ListItemText>
            </ListItem>
        </Fragment>)

}