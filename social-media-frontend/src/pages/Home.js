import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScreamSkeleton from '../utill/ScreamSkeleton'

//Mui stuff
import  Grid  from '@material-ui/core/Grid'

//components
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

//Redux
import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataAction'

class Home extends Component {

    componentDidMount(){
       this.props.getScreams()
    }   

    render() {
        const { screams, loading } = this.props.data
        let recentScreamsMarkup = !loading  ? ( 
           screams.map((scream) => <Scream key={scream.screamId} scream = {scream} />)
          ) : (
            <ScreamSkeleton />
            );
        return (
          <Grid container spacing={4}>
              <Grid item  sm={8} xs={12}>
                {recentScreamsMarkup}
              </Grid>
              <Grid item  sm={4} xs={12}>
                <Profile />
              </Grid>
          </Grid>
        )
        
        }
}
Home.propTypes = {
    data : PropTypes.object.isRequired,
    getScreams : PropTypes.func.isRequired
}

const mapStateToProps = ( state ) =>({
    data : state.data,
})
const mapActionToProp = { getScreams }

export default connect(mapStateToProps, mapActionToProp)(Home)
