import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//Component
import MyButton from '../../utill/MyButton'
//Redux
import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataAction'
//MUI stuff
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import withStyles from '@material-ui/core/styles/withStyles'


    const styles = (theme) => ({
        ...theme.theme,
        deleteButton:{
            position: 'absolute',
            left: '90%',
            top: '10%'
        }
    })

class DeleteScream extends Component {
    state ={
        open : false
    }
    handleOpen = () =>{
        this.setState({open: true})
    }
    handleClose = () =>{
        this.setState({open: false})
    }
    deleteScream = () =>{
        this.props.deleteScream(this.props.screamId)
        this.setState({open: false})
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
            <MyButton 
            tip='Delete Scream' 
            onClick={this.handleOpen}
            btnClassName = {classes.deleteButton}
            >
                <DeleteOutline color = 'secondary' />   
            </MyButton>
            <Dialog 
            open = {this.state.open}
            onClose = {this.handleClose}
            fullWidth
            maxWidth = 'sm'
            >
                <DialogTitle>
                    Are you sure you want to delete that scream
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                    <Button onClick={this.deleteScream} color='secondary'>
                        Delete
                        </Button>
                </DialogActions>
            </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    classes :PropTypes.object.isRequired,
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
}


export default connect(null, { deleteScream } )(withStyles(styles)(DeleteScream))