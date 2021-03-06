import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import themeFile from './utill/theme'
import jwtDecode from 'jwt-decode'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userAction';
import axios from 'axios';


//Material-ui
import{ ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Components
import NavigationBar from './components/layout/NavigationBar'
import AuthRoute from './utill/AuthRoute'
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';



  const theme = createMuiTheme(themeFile)
  axios.defaults.baseURL = 'https://us-central1-social-media-7433e.cloudfunctions.net/api'

  const token = localStorage.FBIdToken;
  if(token){
    const decodedToken =jwtDecode(token)
    if((decodedToken.exp *  1000 ) < Date.now())
    {
      store.dispatch(logoutUser())
      window.location.href = '/login'
    }
    else{
      store.dispatch({type : SET_AUTHENTICATED})
      axios.defaults.headers.common['Authorization'] = token
      store.dispatch(getUserData())
    }
  }

function App() {
  return (
    <MuiThemeProvider theme={theme} >
    <Provider store={store}>
      <Router>
        <NavigationBar/>
        <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact 
          path='/login' 
          component={Login} />
          <AuthRoute exact 
          path='/signup'
           component={Signup} />
           <Route exact path='/user/:handle' component={User} /> 
           <Route exact path='/user/:handle/scream/:screamId' component={User} /> 
        </Switch>
        </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
