import React, { Component } from 'react'
import MyButton from '../../utill/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../../redux/actions/dataAction'
//icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

class LikeButtom extends Component {
    likedScream = () =>{ 
        if(this.props.user.likes && this.props.user.likes.find(like=> like.screamId === this.props.screamId)){
            return true
        }else{
            return false
        }
    }
    likeScream = () =>{
        this.props.likeScream( this.props.screamId)
    }
    unLikeScream = () =>{
        this.props.unLikeScream( this.props.screamId)
    }
    render() {
        const { authenticated } = this.props.user
        const likeButton = !authenticated 
             ? (
                <Link to='/login' >
                <MyButton tip='Login to like' placement='top' >
                        <FavoriteBorder color= 'primary' />
                </MyButton>
                </Link>
             ) 
             : (
               ! this.likedScream() 
                ? ( 
                <MyButton tip='Like' onClick={this.likeScream} placement='top'>
                    <FavoriteBorder color= 'primary' />
                </MyButton> 
                ) 
                : (
                <MyButton tip='Unike' onClick={this.unLikeScream} placement='top'>
                    <FavoriteIcon color= 'primary' />
                </MyButton> 
                ) 
             )
        return likeButton;
    }
}

LikeButtom.propTypes= {
    likeScream : PropTypes.func.isRequired,
    unLikeScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
    user : PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>({
    user : state.user
})
const mapActionToProps = {
    likeScream, unLikeScream
}

export default connect(mapStateToProps,mapActionToProps)(LikeButtom)
