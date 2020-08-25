 import React, { Fragment} from 'react'
 import noImg from '../images/noOne.png'
 import PropTypes from 'prop-types'

 //MUI
 import Card from '@material-ui/core/Card'
 import CardContent from '@material-ui/core/CardContent'
 import CardMedia from '@material-ui/core/CardMedia'  
import withStyles from '@material-ui/core/styles/withStyles'

 const styles = (theme) =>({
    ...theme.theme,
    card:{
        display: 'flex',
        marginBottom : 20
    },
    content:{
        width:'100%',
        flexDireciton: 'column',
        padding: 25
    },
    cover: {
        minWidth:  180,
        objectFit: 'cover'
    },
    handle:{
        width:60,
        height:18,
        backgroundColor: theme.palette.primary.main,
        marginBottom : 7
    },
    date:{
        width:100,
        height:14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom : 10
    },
    fullLine:{
        width: '90%',
        height:15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        marginBottom : 10
    },
    halfLine:{
        width: '50%',
        height:15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        marginBottom : 10
    }

 })

 const ScreamSkeleton = (props) => {
     const { classes } = props

     const content = Array.from({ length : 4 }).map((item, index) =>(
         <Card className={classes.card} key={index} >
             <CardMedia className={classes.cover} image={noImg} />
             <CardContent className={classes.content} >
                 <div className={classes.handle} ></div>
                 <div className={classes.date} > </div>
                 <div className={classes.fullLine} ></div>
                 <div className={classes.fullLine} ></div> 
                 <div className={classes.halfLine} ></div> 
             </CardContent>
         </Card>
     ))
     return (<Fragment>{content}</Fragment>)
 }

 ScreamSkeleton.propTypes = {
     classes : PropTypes.object.isRequired
 }

 export default withStyles(styles)(ScreamSkeleton)