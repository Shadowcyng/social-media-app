import React, { Component } from 'react'
import PropTypes from 'prop-types'

//MuiStuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

//Redux Stuff
import { connect } from 'react-redux'
import {postComment} from '../../redux/actions/dataAction'


    const styles = (theme) =>({
        ...theme.theme,

    }) 
   

class CommentForm extends Component {
    state ={
        body: '',
        errors:{}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body : ''})
        }
    }
    handleChange =(event) =>{
       this.setState({
        [event.target.name] : event.target.value
       })
    }
    handlePost = (event) =>{
        event.preventDefault()
       const newPost = {
            body: this.state.body
        }
        this.props.postComment(this.props.screamId,newPost)
    }
    render() {
        const { classes, authenticated } = this.props
        const { errors } = this.state
        const commentFormMarkup =  authenticated 
        ? (
            <Grid item sm={12} style={{textAlign: 'center' }}>
                 <hr className={classes.visibleSaperator} />
                <form onSubmit={this.handlePost} >
                <TextField
                name ='body'
                label='Comment on scream'
                type='text'
                error = {errors.comment ? true : false}
                helperText = {errors.comment}
                value={this.state.body}
                onChange={this.handleChange}
                className={classes.textField}
                fullWidth
                />
                <Button type='submit' variant='contained' color='primary' className={classes.button} >Post</Button>
                </form>
            </Grid>
        ) 
        
        : null
        return commentFormMarkup
    }
}
CommentForm.propTypes = {
    screamId : PropTypes.string.isRequired,
    postComment : PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = ( state ) =>({
    UI: state.UI,
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps, { postComment } )(withStyles(styles)(CommentForm))
