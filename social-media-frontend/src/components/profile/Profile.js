import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import ProfileSkeleton from '../../utill/ProfileSkeleton'

import EditDetails from './EditDetails.js'
import MyButton from '../../utill/MyButton'

//Redux  stuff
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../../redux/actions/userAction';

//MUI Stuff
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import LinkIcon from '@material-ui/icons/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CameraAltIcon from '@material-ui/icons/CameraAlt';


const styles = (theme) =>({
      ...theme.theme,

})

 class Profile extends Component {
  handleImageChange = ( event ) =>{
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append( 'image', image, image.name )
    this.props.uploadImage(formData)
  } 
  handleEditPicture = () =>{
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  handleLogout = () =>{
    // event.preventDefault();
    this.props.logoutUser();
  }
    render() {
        const { classes, 
            user: 
            {
              credentials : {
                     handle, createdAt, imageUrl, bio, website, location  //according to getUserData
                    },
                    loading,
                    authenticated
                }
             } = this.props

        let profileMarkUp = !loading ? (authenticated ? (
          <Paper className= {classes.paper} >
              <div className={classes.profile}>
                <div className='image-wrapper'>
                  <img src={imageUrl} alt='profile' className='profile-image' />
                  <input type='file' 
                  id='imageInput' 
                  hidden='hidden'
                  onChange={this.handleImageChange} 
                  />
                  <Tooltip title='Edit profile picture' placement='top' >
                    <Fab color='primary' size='small' onClick={this.handleEditPicture}  className='button'>
                    <CameraAltIcon />
                    </Fab>    
                  </Tooltip>
                </div>
                <hr/>
                <div className='profile-details' >
                  <MuiLink component={Link} to={`/user/${handle}`} color='primary' variant='h5' >
                     @{handle}
                  </MuiLink>
                  <hr/>
                  {bio &&  <Typography variant='body2' > {bio} </Typography> }
                    <hr />
                  {location && (
                    <Fragment>
                    <LocationOn color='primary' /> <span> {location} </span>
                    <hr/>
                    </Fragment> 
                  )}
                  {website && (
                    <Fragment>
                      <LinkIcon color='primary' />
                      <a href={website} target='_black'  rel='noopener noreferer'>
                        {' '}{website}
                      </a>
                      <hr/>
                    </Fragment> 
                  )}
                  <CalendarToday color='primary'/>{' '}
                  <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
              </div>                  
                <EditDetails />     {/**Edit profile Modal Component */} 
                {/* Logout Stuff -- MyButton is component , children is icon */}
                <MyButton tip='Logout' placement='top' btnClassName= {classes.bottomTool} onClick={this.handleLogout}>
                <ExitToAppIcon color = 'primary'  />
                </MyButton>
          </Paper>
        ) : (
         <Paper  className={classes.paper}>
           <Typography variant='body2' align='center'>
             No profile found, please login again
           </Typography>
           <div className={classes.buttons}>
              <Button variant='contained' color='primary' component={Link} to='/login'>
               Login</Button>
              <Button variant='contained' color='secondary' component={Link} to='/signup'>
               Signup</Button>
           </div>
         </Paper>  
        )) 
        : (<ProfileSkeleton />) 
        return profileMarkUp;
    }
}
Profile.propTypes = {
  classes:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => ({
    user: state.user
})
const mapActionToProp = { logoutUser, uploadImage }

export default connect( mapStateToProps, mapActionToProp )(withStyles(styles)(Profile))

