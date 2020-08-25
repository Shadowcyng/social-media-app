import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//component
import MyButton from '../../utill/MyButton'


//Redux stuff
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/dataAction'
//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'

    const styles = (theme) =>({
        ...theme.theme,
        submitButton : {
            position : 'relative',  
            marginTop : 10        
        },
        progressSpinner : {
            position : 'absolute'
        },
        closeButton : {
            position: 'absolute',
            left : '90%',
            top : '4%'
        }

    })
class PostScream extends Component {
    state = {
        open : false,
        body : '',
        errors: {},
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handlePost = (event) =>{
        event.preventDefault();
        this.props.postScream({
           body : this.state.body
        })
    }
    handleOpen = () => {
        this.setState({ open : true })
        // this.setState( { open: true })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState( { open: false, errors: {} })
    }   
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.UI.errors){
          this.setState({
            errors: nextProps.UI.errors
          })
        }
        if(! nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({
            body: '',
            open: false,
            errors : {}
          })
         
        }

    }
    render() {
        const { errors } =  this.state
        const { classes, UI: { loading } } = this.props
        return (
            <Fragment>
                <MyButton tip='Post a Scream!' onClick={this.handleOpen}  >
                    <AddIcon color='primary' />
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
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handlePost}>
                            <TextField
                            name='body'
                            type='text'
                            label='SCREAM'
                            multiline
                            rows='2'
                            value= {this.state.body}
                            onChange = {this.handleChange}
                            placeholder='Type your Scream'
                            error={ errors.body ? true : false }
                            helperText ={ errors.body }
                            className = { classes.TextField }
                            fullWidth
                            />
                            <DialogActions>
                                <Button type='submit' variant = 'contained' 
                                color='primary' 
                                className={classes.submitButton} 
                                disabled =  {loading}
                                >
                                    Post
                                    {loading  &&
                                    <CircularProgress size ={30} className={classes.progressSpinner} />
                                    }
                                    </Button> 
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
                
            </Fragment>
        )
    }
}
PostScream.propTypes = {
    classes : PropTypes.object.isRequired,
    postScream : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired,
    clearErrors : PropTypes.func.isRequired
}

const mapStateToProps =  ( state ) =>  ({
    UI : state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))
