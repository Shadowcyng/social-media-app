const functions = require('firebase-functions');
const cors = require('cors')
const app = require('express')()
const { db } = require('./utill/admin')
const FBAuth = require('./utill/fbAuth')


app.use(cors())

const { 
    getAllScreams,
    postOneScream, 
    getScream,
    commentOnScream,
    likeScream,
    unLikeScream,
    deleteScream
    } = require('./handlers/Screams')
const  { 
      signup,
      login,
      uploadImage,
      addUserDetails ,
      getAuthenticatedUser,
      markNotificationsRead,
      getUserDetails
    
    }= require('./handlers/Users');
const fbAuth = require('./utill/fbAuth');
const { Change } = require('firebase-functions');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//Scream Route
app.get('/screams', getAllScreams)
app.post('/scream',FBAuth, postOneScream)
app.get('/scream/:screamId',getScream)
app.delete('/scream/:screamId', FBAuth, deleteScream)
app.get('/scream/:screamId/like',FBAuth, likeScream)
app.get('/scream/:screamId/unlike',FBAuth, unLikeScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

//users route
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image' ,FBAuth, uploadImage)
app.post('/user',FBAuth, addUserDetails)
app.get('/user',FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails)
app.post('/notifications', markNotificationsRead)


exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions
.firestore
.document('likes/{id}')
.onCreate((snapshot)=>{
    db.doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then(doc=>{
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'like',
                read: false,
                screamId: doc.id
            })
        }
    }).catch(err=>{
        console.log(err)
    })
})

exports.deleteNotificationOnUnLike = functions.firestore.document('likes/{id}')
.onDelete((snapshot=>{
    db.doc(`/notifications/${snapshot.id}`).delete()
    .catch(err=>{
        console.log(err)
    })
}))

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
.onCreate((snapshot)=>{
   db.doc(`/screams/${snapshot.data().screamId}`).get()
    .then(doc=>{
        if(doc.exists  && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'comment',
                read: false,
                screamId: doc.id
            })
        }
    }).catch(err=>{
        console.log(err)
    })
})

exports.onUserImageChange = functions.firestore.document('/users/{userId}')
.onUpdate(change =>{
   if(change.before.data().imageUrl !== change.after.data().imageUrl){
               let batch = db.batch()
    return db.collection('screams').where('userHandle', '==' , change.before.data().handle).get()
    .then((data)=>{
        data.forEach(doc=>{
            const scream = db.doc(`screams/${doc.id}`)
            batch.update(scream,{userImage: change.after.data().imageUrl})
        })
        return batch.commit()
    }).catch(err=>{
        console.log(err=>{
            console.log(err)
        })
    })
   }else{
       return true;
   }
})

exports.onScreamDelete = functions.firestore.document('/screams/{screamId}')
.onDelete((snapshot,context)=>{
    const screamId = context.params.screamId
    const batch = db.batch()
    return db.collection('comments').where('screamId', '==', screamId).get()
    .then(data=>{
        data.forEach(doc=>{
            batch.delete(db.doc(`/comments/${doc.id}`));
        })
        return db.collection('likes').where('screamId', '==', screamId).get()
    })
        .then(data=>{
            data.forEach(doc=>{
                batch.delete(db.doc(`/likes/${doc.id}`));
            })
            return db.collection('notifications').where('screamId', '==', screamId).get()
        })
            .then((data)=>{
                data.forEach(doc=>{
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                })
                return batch.commit()
            }) 
            .catch(err=>{
            console.log(err)
            res.status(500).json({error: err}) 
              })
        })