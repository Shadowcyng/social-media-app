import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from  'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Redux
import { connect } from 'react-redux'
import { markNotificationRead } from '../../redux/actions/userAction'
//Mui Stuff
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Tooltip  from '@material-ui/core/Tooltip';
import  IconButton  from '@material-ui/core/IconButton';
//Icon
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'


class Notifications extends Component {
    state = {
        anchorEl : null,
        notificationsLength : 0
    }
    handleOpen = (event) =>{
        this.setState({ anchorEl : event.target })
    }
    handleClose = () =>{
        this.setState({anchorEl : null })
    }
    onMenuOpened = () =>{
        let unreadNotificationIds = [];
        this.props.notifications.map(not=>{
            if(!not.read){
               unreadNotificationIds.push(not.notificationId)
            }
        })
        this.props.markNotificationRead(unreadNotificationIds)
        this.setState({notificationsLength :  0})
    }
    componentDidMount(){
        this.setState({notificationsLength : this.props.notifications.filter(not=> not.read === false).length})
    }
    render() {
        const { notifications } = this.props;
        const { anchorEl, notificationsLength } = this.state
        dayjs.extend(relativeTime);
        let notificationIcon;
        if(notifications && notifications.length > 0){
            notificationsLength > 0 
            ? notificationIcon =(
                    <Badge badgeContent={notificationsLength}
                    color='secondary' >
                        <NotificationsIcon />
                    </Badge>
             ) : (
                 notificationIcon = <NotificationsIcon />
             )         
        } else  {
            notificationIcon = <NotificationsIcon />
        }

        let notificationsMarkup = (notifications && notifications.length > 0 ) ?
        notifications.map(not => {
            const verb = not.type === 'like' ? 'liked' : 'commented on'
            const time = dayjs(not.createdAt).fromNow()
            const iconColor = not.read ? 'primary' : 'secondary'
            const icon = (not.type === 'like') 
            ?  (
                <FavoriteIcon color={iconColor} style={{ marginRight : 10 }} />
            ) : (
                <ChatIcon color={iconColor} style={{ marginRight : 10 }} />
            )
            return (
                <MenuItem key={ not.createdAt } onClick={this.handleClose} >
                    {icon}
                    <Typography
                    component= {Link}
                    color = 'default'
                    variant = 'body1'
                    to ={ `/user/${not.recipient}/scream/${not.screamId}`}
                    >
                        {not.sender} {verb} your scream {time}
                    </Typography>
                </MenuItem>
            )
        })
        : (
            <MenuItem onClick={this.handleClose}  >
                You have no notifications yet
            </MenuItem>
        )
        return (
            <Fragment>
                <Tooltip  placement='top' title='Notifications' >
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup = 'true'
                        onClick={this.handleOpen} >
                            {notificationIcon}
                        </IconButton>
                </Tooltip>
                <Menu 
                anchorEl = {anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEnter={ this.onMenuOpened }
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
     
            )
        }
    }
Notifications.propTypes = {
    markNotificationRead : PropTypes.func.isRequired,
    notifications :PropTypes.array.isRequired
}
const mapStateToProps = ( state ) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationRead })(Notifications)
