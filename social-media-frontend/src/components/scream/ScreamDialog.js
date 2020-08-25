import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
//component
import MyButton from '../../utill/MyButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

//Redux stuff
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataAction'
import LikeButtom from './LikeButtom'

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
//icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import UnFoldMore from '@material-ui/icons/UnfoldMore'

    const styles =(theme) => ({
        ...theme.theme,
        expandButton : {
            position: 'absolute',
            left: '90%'
        },
        profileImage:{
            maxWidth:200,
            height:200,
            borderRadius: '50%',
            objectFit: 'cover'
        },
        dialogContent:{
            padding: 20,
        },
        closeButton:{
            position: 'absolute',
             left: '90%'
        },
        circularProgressDiv:{
            textAlign:'center',
            marginTop: 30,
            marginBottom: 30
        }
    })

class ScreamDialog extends Component {
    state = {
        open : false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen() 
        }
    }
    handleOpen = () =>{
        let oldPath = window.location.pathname
        const { userHandle, screamId } = this.props
        const newPath =`/user/${userHandle}/scream/${screamId}`
        if(oldPath === newPath){
            oldPath = `/user/${userHandle}`
        }
        window.history.pushState(null, null, newPath)
        this.setState({
            open  : true,
            oldPath: oldPath,
            newPath: newPath
        })
        this.props.getScream(this.props.screamId)
    }
    handleClose = () =>{
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({open  : false})
        this.props.clearErrors()
    }
    render() {
        const { 
            classes, 
            scream : { 
                screamId, body, createdAt, userHandle,comments, likeCount, commentCount, userImage} ,
            UI : { loading }
            } = this.props

            const dialogMarkup = loading ?
            
            (<div  className={classes.circularProgressDiv}><CircularProgress size={200} thickness={2}  /> </div> ) 
            : (
                <Grid container spacing = {16}>
                    <Grid item sm={5}>
                        <img src={userImage} alt='Profile' className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography 
                        component = {Link}
                        to={`/user/${userHandle}`}
                        color='primary'
                        variant='h5'
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant='body2' color='textSecondary'>
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant='body1' >
                            {body}
                        </Typography>
                        <LikeButtom screamId={screamId} />
                            <span>{likeCount} likes</span> 
                        <MyButton tip='Comments' >
                            <ChatIcon color='primary' />
                        </MyButton>
                        <span> {commentCount} comments </span>                       
                    </Grid>
                        <hr className = {classes.invisibleSeparator} /> 
                        <CommentForm screamId = {screamId} />
                        <Comments comments = {comments} />
                   
                </Grid> 
            )

        return (
            <Fragment>
                <MyButton tip='Expand Scream' onClick={this.handleOpen} tipClassName={classes.expandButton} >
                    <UnFoldMore color='primary' />
                </MyButton>
                <Dialog
                open = { this.state.open }
                onClose = {this.handleClose}
                fullWidth
                maxWidth  = 'sm'
                >
                    <MyButton tip='close' onClick={this.handleClose}  tipClassName= {classes.closeButton} placement ='top' >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent} >
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream:  PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
    clearErrors : PropTypes.func.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = ( state ) => ({
    scream: state.data.scream,
    UI : state.UI,  
})
const mapActionToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ScreamDialog))
