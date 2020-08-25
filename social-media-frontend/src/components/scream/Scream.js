import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from  'prop-types'
import MyButton from '../../utill/MyButton';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButtom from './LikeButtom';

//Redux
import { connect } from 'react-redux'
//Mui Stuff
import withStyle from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
 //icons
import ChatIcon from '@material-ui/icons/Chat'




    const styles ={
        card:{
            position: 'relative',
            display: 'flex',
            marginBottom: 20
        },
        
        image:{
            minWidth: 180,
            objectFit: 'cover'
        },

        content: {
            padding: 25,
            objectFit: 'cover'
        }

    }
 class Scream extends Component {
   
    render() {
        dayjs.extend(relativeTime)
        const {classes, 
            scream: {
                body,
                createdAt, 
                userImage, 
                userHandle, 
                screamId, 
                likeCount, 
                commentCount
            },
            user :{
                 authenticated,
                 credentials:{
                     handle
                 } 
                }
             } = this.props

             const DeleteButton = (authenticated && userHandle === handle ) 
             ? <DeleteScream screamId = {screamId} />
             : null
        return (

                <Card className={classes.card}  >
                    <CardMedia 
                    image={userImage}
                    title='Profile image'
                    className={classes.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography variant='h5' 
                        component={Link} 
                        to={`/user/${userHandle}`}
                        color='primary'
                        >
                        {userHandle} 
                        </Typography>
                        {DeleteButton}
                        <Typography variant='body2' color='textSecondary' > {dayjs(createdAt).fromNow()} </Typography>
                        <Typography variant='body1'> {body} </Typography>
                        <LikeButtom screamId={screamId} />
                        <span>{likeCount} likes</span>
                        <MyButton tip='Comments' >
                            <ChatIcon color='primary' />
                        </MyButton>
                        <span> {commentCount} comments </span>
                        <ScreamDialog screamId = {screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    </CardContent>
                </Card>
        )
    }
}

Scream.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    scream : PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}
const mapStateToProps = ( state ) => ({
    user: state.user
})
const mapActionToProp = {  }

export default connect(mapStateToProps, mapActionToProp)(withStyle(styles)(Scream))
