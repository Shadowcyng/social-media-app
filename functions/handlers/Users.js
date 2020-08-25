const { db, admin } = require('../utill/admin')

const config = require('../utill/config')
const firebase  = require('firebase')
firebase.initializeApp(config)

const { validateSignupData, validateLoginData,  reduceUserDetails } = require('../utill/validators')
const { user } = require('firebase-functions/lib/providers/auth')

//user Signup
exports.signup = (req,res) =>{
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }
    let noImg = 'no-one.png'
    const {valid,errors}  = validateSignupData(newUser)
    if(!valid) return res.status(400).json(errors)
    //validate data
    let token, userId
    db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc)=>{
        if(doc.exists){
            res.status(400).json({handle:'This handle is already  taken'})
        }else{
           return firebase.auth()
           .createUserWithEmailAndPassword(newUser.email,newUser.password)
        }
    })
      .then(data=>{
          userId = data.user.uid
          return data.user.getIdToken();
      }).then(Idtoken=>{
          token = Idtoken;
          const userCredentials = {
              handle: newUser.handle,
              email: newUser.email,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
              createdAt: new Date().toISOString(),
              userId: userId
          }
          return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      })
      .then(()=>{
          return res.status(201).json({token: token})
      })
      .catch(err=>{
          console.error(err)
          if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email: 'Email is already in use'})    
          }else{
            return res.status(500).json({general: 'Something went wrong, please try again'})
          }
        })
}

// user Login
exports.login = (req,res) =>{
    const user ={
        email : req.body.email,
        password: req.body.password
    }

    const {valid,errors}  = validateLoginData(user)
    if(!valid) return res.status(400).json(errors)
        let token='';   
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data=>{
            return data.user.getIdToken()
        })
        .then(idToken=>{
            token = idToken;
            return res.json({token:token})
        })
        .catch(err=>{
            console.log(err)
                return res.status(500).json({general: 'Wrong credentials, please try again'})
                })    
        }

//upload an Image for user
exports.uploadImage = ( req, res ) => {
    
    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs  = require('fs')
  

    const busboy = new BusBoy({ headers: req.headers })

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file',(fieldname, file, filename, encoding, mimetype) =>{
        if(mimetype !== 'image/png' && mimetype !== 'image/jpeg'){
          return res.status(400).json({ error: 'Wrong file type submitted' })
        }
        //my.image.png
        const imageExtensions = filename.split('.')[ filename.split('.').length - 1 ];
        //625412542247.jpg
        imageFileName = `${Math.round(Math.random()*10000000000)}.${imageExtensions}`;
        const filepath= path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {
        admin.storage()
        .bucket('social-media-7433e.appspot.com')
        .upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata:{
                metadata:{
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(()=>{
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.handle}`).update({imageUrl:imageUrl}) ;
        })
        .then(()=>{
            return res.json({ message: 'image uplodaded successfully' })
        }).catch(err=>{
            console.log(err)
          return res.status(500).json({error: err.code});
        })
    })
    busboy.end(req.rawBody);
}

//Update profile
exports.addUserDetails = ( req, res ) => {
    let userDetails = reduceUserDetails(req.body)
    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(()=>{
            return res.json({message : 'Details added Successfully '})
        }).catch(err=>{
            console.log(err)
            return res.status(501).json({error: err.code})
        })
    }
    //Get own user Details
    exports.getAuthenticatedUser = (req, res) =>{
        const userData = {}
        db.doc(`/users/${req.user.handle}`).get()
        .then(doc=>{
            if(doc.exists){
                userData.credentials = doc.data()
                return db.collection('likes').where('userHandle', '==', req.user.handle ).get()
            }
        }).then(data=>{
            userData.likes = []
            data.forEach(doc=>{
                userData.likes.push(doc.data())
            });
            return db.collection('notifications').where('recipient','==' , req.user.handle)
            .orderBy('createdAt','desc').limit(20).get();
        })
        .then(data=>{
            if(data)
            userData.notifications =[];
            data.forEach(doc=>{
               
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    screamId: doc.data().screamId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id
                })
            })
            return res.json(userData)
        })
        .catch(err=>{
            console.log(err)
           return res.status(500).json({error: err.code})
        })
    }


//Get User Details
exports.getUserDetails = (req,res)=>{
    let userData ={}
    db.doc(`/users/${req.params.handle}`).get()
    .then(doc=>   {
        if(doc.exists){
            userData.user = doc.data()
            return db.collection('screams').where('userHandle', '==', req.params.handle)
            .orderBy('createdAt','desc').get();
        }else{
            return res.status(404).json({error:'user not found'})
        }
    }).then(data=>{
        userData.screams = []
        data.forEach(doc=>{
            userData.screams.push({
                body: doc.data().body,
                createdAt: doc.data().createdAt,
                userHandle: doc.data().userHandle,
                userImage: doc.data().userImage,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
                screamId: doc.id
            })
        })
        return res.json(userData)
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}


// //Get Notifications
exports.markNotificationsRead = (req, res) =>{
    let batch = db.batch();
    req.body.forEach(notificationId=>{
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification,{ read: true });
    })
    batch.commit().then(()=>{
        return res.json({message : 'Notification Marked read'})
    }).catch(err=>{
        console.log(err)
       return res.status(500).json({error: err})
    })
}