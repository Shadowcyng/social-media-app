import React from 'react'
import noImg from '../images/noOne.png'
import PropTypes from 'prop-types'
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper';
//icons
import LinkIcon from '@material-ui/icons/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = (theme) =>({
    ...theme.theme,
    handle:{
        height:20,
        backgroundColor: theme.palette.primary.main,
        margin:'0 auto 7px auto' ,
        width: 60
    },
    fullLine:{
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom:10,
        width: '100%'
    },
    halfLine:{
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom:10,
        width: '50%'
    },
})
const ProfileSkeleton = (props) =>{
    const {classes} = props
return (
    <Paper className={classes.paper}>
        <div className={classes.profile} >
            <div className='image-wrapper'>
                <img src={noImg} alt='profile' className='profile-image'/>
                <hr />
                <div className='profile-details'>
                    <div className={classes.handle} />
                    <hr />
                    <div className = {classes.fullLine} />
                    <div className = {classes.fullLine} />
                    <hr />
                    <LocationOn color='primary' /> <span>Location</span>
                    <hr />
                    <LinkIcon color='primary' /><span>https://www.website.com</span>
                    <hr />
                    <CalendarToday color='primary' /> <span>Joined date</span>
                </div>
            </div>
        </div>
    </Paper>
)
}
ProfileSkeleton.propTypes = {
    classes : PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
