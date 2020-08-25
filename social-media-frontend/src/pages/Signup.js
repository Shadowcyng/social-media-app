
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/Shadow.png'
import { Link } from 'react-router-dom'

//REDUX
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userAction'
//Mui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from  '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


        const styles=(theme)=>({
            ...theme.theme
        })

 class Signup extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors:{}
        }
    }
    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors})
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({loading: true,})
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }
            this.props.signupUser(newUserData,this.props.history) 
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    render() {
        const { classes, UI: { loading }} = this.props
        const { errors } = this.state
        return (
           <Grid container className={classes.form}>
               <Grid item sm />
               <Grid item sm>
                   <img src={AppIcon} alt='shadow' className={classes.imageIcon}  />
                   <Typography variant ='h2' className={classes.pageTitle} >
                       Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                    id='email' 
                    name='email' 
                    type='email' 
                    label='Email'
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                   fullWidth />
                    <TextField 
                    id='password' 
                    name='password' 
                    type='password' 
                    label='Password'
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                   fullWidth />
                    
                    <TextField 
                    id='confirmPassword' 
                    name='confirmPassword' 
                    type='password' 
                    label='Confirm Password'
                    className={classes.textField}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    fullWidth />
                    <TextField 
                    id='handle' 
                    name='handle' 
                    type='text' 
                    label='Username'
                    className={classes.textField}
                    value={this.state.handle}
                    onChange={this.handleChange}
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    fullWidth />
                   
                   {errors.general && ( 
                       <Typography variant='body2' className={classes.customError} >
                        {errors.general}
                       </Typography>
                      ) 
                      
                   }
                   
                   <Button 
                   type='submit'
                   variant='contained'
                   disabled={loading}
                   color='primary'
                   className={classes.button} >
                    Signup   
                    {loading &&(
                    <CircularProgress size={30} className={classes.progress} />
                       )}
                    </Button> 
                    <br/>
                    <br/>
                    <small >Have an account? <Link to='/login' >Login here</Link></small>
                    </form>
                   </Grid>
               <Grid item sm />
           </Grid>
        )
    }
}
Signup.propsTypes = {
    classes : PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionToProps = {
    signupUser
}

export default connect( mapStateToProps, mapActionToProps )(withStyles(styles)(Signup))
