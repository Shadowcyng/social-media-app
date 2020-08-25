import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropsTypes from 'prop-types'
const AuthRoute = ({ component: Component, authenticated, ...rest}) => (
    <Route 
    {...rest}
    render={(props)=> 
     authenticated === true ? <Redirect to='/' /> : <Component {...props}/>
}/> 
)

AuthRoute.propTypes = {
    authenticated : PropsTypes.bool
}

const mapStateToProps = (state) =>({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)
