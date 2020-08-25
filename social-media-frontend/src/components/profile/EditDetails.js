import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//component
import MyButton from '../../utill/MyButton'


//Redux stuff
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userAction'
//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'

    const styles = (theme) =>({
            ...theme.theme
    })

 class EditDetails extends Component {

    state = {
         bio : '' ,
         website : '' ,
         location : '' ,
         open : false
    };

    handleOpen = () => {
        this.setState({ open : true })
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open : false })
    }

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials)
    }
    handleChange = ( event ) =>{
        this.setState({
        [event.target.name] : event.target.value
        })
    }
    
    mapUserDetailsToState =(credentials) =>{
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.location ? credentials.location : '',
        })
    }
    handleSubmit= () =>{
        const userDetails ={
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }

    render() {
        const classes = this.props
        return (
            <Fragment>
                <MyButton tip='Edit Details' placement='top' btnClassName= {classes.bottomTool} onClick={this.handleOpen}>
                <EditIcon color='primary' />
                </MyButton>
                <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                     <DialogTitle>Edit your Details</DialogTitle>
                     <DialogContent>
                         <form>
                             <TextField 
                             name = 'bio'
                             type = 'text'
                             label = 'Bio'
                             multiline
                             rows = '2'
                             placeholder = 'A short bio about yourself'
                             className = {classes.textField}
                             value = {this.state.bio}
                             onChange = {this.handleChange}
                             fullWidth
                             />
                            <TextField 
                             name = 'website'
                             type = 'text'
                             label = 'Website'
                             multiline
                             rows = '2'
                             placeholder = 'Your personal/professional website'
                             className = {classes.textField}
                             value = {this.state.website}
                             onChange = {this.handleChange}
                             fullWidth
                             />
                            <TextField 
                             name = 'location'
                             type = 'text'
                             label = 'Location'
                             multiline
                             rows = '2'
                             placeholder = 'Where you live'
                             className = {classes.textField}
                             value = {this.state.location}
                             onChange = {this.handleChange}
                             fullWidth
                             />
                            </form>
                     </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
                
            </Fragment>
        )
    }
}

EditDetails.propTypes ={
    editUserDetails : PropTypes.func.isRequired,
    classes : PropTypes.object.isRequired
}
const mapStateToProps = ( state ) =>({
    credentials: state.user.credentials
})

 const mapActionToProp = { editUserDetails }

export default connect( mapStateToProps, mapActionToProp )( withStyles ( styles )( EditDetails ))
