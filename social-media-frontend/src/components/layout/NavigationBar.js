import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//component
import MyButton from '../../utill/MyButton';
import PostScream from '../scream/PostScream';

//Redux
import { connect } from 'react-redux';

//Mui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home'
import Notifications from './Notifications'


class NavigationBar extends Component {
    render() {
        const { authenticated } = this.props
        return (
          <AppBar>
              <Toolbar className='nav-container'>
                  {
                     ( authenticated )
                      ? (
                        <Fragment>
                           <PostScream />
                            <Link to='/'>
                            <MyButton tip='Home' 
                            placement='top' btnClassName= ''>
                            <HomeIcon color='primary' />
                            </MyButton>
                            </Link>
                            <Notifications  />
                        </Fragment>
                       ) 
                       : (
                        <Fragment>
                        <Button color='inherit' component={Link} to='/' >Home</Button>
                        <Button color='inherit' component={Link} to='/login' >Login</Button>
                        <Button color='inherit' component={Link} to='/signup' >Signup</Button>
                        </Fragment>
                        )
                  }

              </Toolbar>
          </AppBar>
        )
    }
}

    NavigationBar.propTypes = {
    authenticated : PropTypes.bool
    }

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(NavigationBar)