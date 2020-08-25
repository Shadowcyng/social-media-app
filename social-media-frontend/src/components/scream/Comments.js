import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'


//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

    const styles = (theme) =>({
        ...theme.theme,
        commentImage:{
            maxWidth : '100%',
            height : 100,
            objectFit: 'cover',
            borderRadius: '50%'
        },
        commentData : {
            marginLeft: 20
        }

    })

class Comments extends Component {
    render() {
        const { classes, comments } = this.props
        return (
            
                <Grid container>
                    {comments.map((comment, index)=>{
                        const { body, createdAt, userHandle, userImage } = comment
                        return (
                            <Fragment key={createdAt} >
                                <hr className={classes.visibleSeparator} />
                                <Grid item sm={12} >
                                    <Grid container>
                                        <Grid item sm={2}>
                                            <img src={userImage} alt='profile' className={classes.commentImage} />
                                        </Grid>
                                        <Grid item sm={9}>
                                            <div className={classes.commentData} >
                                                <Typography
                                                    variant='h5'
                                                    component = {Link}
                                                    to={`/user/${userHandle}`}
                                                    color='primary'
                                                    >
                                                        {userHandle}
                                                    </Typography>
                                                    <Typography varian='body2' color='textSecondary' >
                                                        {dayjs(createdAt).format('h:mm a,MMMM DD YYYY')}
                                                    </Typography>
                                                    <hr className={classes.invisibleSeparator} />
                                                    <Typography variant='body1'> {body} </Typography> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        )
                    })}
                </Grid>
        )
    }
}

Comments.propTypes = {
    comments : propTypes.array.isRequired
}

export default withStyles(styles)(Comments)
