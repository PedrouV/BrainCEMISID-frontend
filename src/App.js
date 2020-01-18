import React from 'react';
import Home from './Views/Home'
import Authentication from './Views/Authentication'
import AccountSettings from './Views/AccountSettings'
import Projects from './Views/Projects'
import CreateProject from './Views/CreateProject'
import Dashboard from './Views/Dashboard'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import {connect} from 'react-redux'
import './App.css'
import { tryRelog } from './Store/Actions/Auth';
import { useEffect } from 'react';


const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0055a0',
      light: '#53A2BE',
      dark: '#0A2239'
    },
    secondary: {
      main: '#2D898B',
      dark: '#132E32'

    },
    biology: {
      main: '#FF0000'
    }
  },
  typography: {
    fontFamily: [
      'Merriweather',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App(props) {

  useEffect(()=>{
    props.tryRelog();
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <ThemeProvider theme={Theme}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/auth/:type' component={Authentication}/>
            <Route path='/projects' component={Projects}/>
            <Route path='/new-project' component={CreateProject}/>
            <Route path='/dashboard/:id' component={Dashboard}/>
            <Route path='/settings' component={AccountSettings}/>
          </Switch>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return({
    tryRelog: () => {
      dispatch(tryRelog())
    }
  })
}

export default connect(null, mapDispatchToProps)(App);
