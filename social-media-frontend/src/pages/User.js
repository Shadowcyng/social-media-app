import React, { Component} from 'react'
import propTypes from 'prop-types'
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile'
import ScreamSkeleton from '../utill/ScreamSkeleton'
import ProfileSkeleton from '../utill/ProfileSkeleton'

import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { getUser } from '../redux/actions/dataAction'
import axios from 'axios'


class User extends Component {
    state={
        profile : null,
        screamIdParam: ''  
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId
        if(screamId){
            this.setState({ screamIdParam : screamId })
        }
        this.props.getUser(handle);
        axios.get(`/user/${handle}`)
        .then(res=>{
            this.setState({ profile : res.data.user })
        })
        .catch(err => console.log('error', err))
    }
    render() {
        const { screams, loading } = this.props.data
        const { screamIdParam, profile } = this.state
        const screamsMarkup = 
        loading 
        ?   <ScreamSkeleton  />
        :   screams === null  
        ?   <p>No scream from this user</p> 
        :   ! screamIdParam 
        ?   screams.map((scream) => <Scream key={scream.screamId} scream={scream} /> )
        :   (screams.map((scream) => {
            if(scream.screamId !== screamIdParam){
                return <Scream key={scream.screamId} scream={scream} /> 
            }else{
                return <Scream key={scream.screamId} scream={scream} openDialog /> 
            }
        }))

        return (
            <Grid container spacing={4}>
            <Grid item  sm={8} xs={12}>
              {screamsMarkup}
            </Grid>
            <Grid item  sm={4} xs={12}>
                {profile === null  
             ?  ( <ProfileSkeleton />)
             : ( <StaticProfile profile={profile} />
)                }
              </Grid>
        </Grid>
        )
    }
}
User.propTypes = {
    data : propTypes.object.isRequired,
    getUser : propTypes.func.isRequired
}
const mapStateToProps = (state)=>({
    data: state.data
})
export default connect(mapStateToProps, { getUser })(User)
