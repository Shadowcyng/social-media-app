const{ db } = require('../utill/admin')

// Get all screams
exports.getAllScreams = (req,res) =>{
    db.collection('screams')
    .orderBy('createdAt','desc')
    .get()
    .then(data=>{
        let screams =[];
        data.forEach((doc)=>{
            screams.push({
                screamId : doc.id,
                body: doc.data().body,
                userHandle:doc.data().userHandle,
                createdAt:doc.data().createdAt,
                userImage: doc.data().userImage,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount
            }) 
        })
        return res.json(screams)
    }).catch(err=>console.log(err))
}

//Post one Screame
exports.postOneScream = (req,res)=>{
    if(req.body.body.trim() === ''){
       return res.status(400).json({body : 'Body must not be empty'})
    }
    const newScream={
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
        // userImage: doc.data().userImage
    }
    db.collection('screams').add(newScream)
    .then(doc=>{
        const resScream = newScream
        resScream.screamId = doc.id
       return res.json(resScream)
    }).catch(err=>{
       return res.status(500).send('Something went wrong')
        console.log(err)
    })
}
//Fetch One Scream
exports.getScream=(req,res) =>{
    let screamData = {};
    db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc=>{
        if(!doc.exists){
            return res.status(404).json({error: 'Scream not found'})
        }
        screamData = doc.data()
        screamData.screamId = doc.id;
        return db.collection('comments')
        .orderBy('createdAt','desc')
        .where('screamId', '==' , req.params.screamId).get()
        .then(data=>{
            screamData.comments =[]
            data.forEach(doc=>{
                screamData.comments.push(doc.data())
            });
            return res.json(screamData)

        }).catch(err=>{
            console.log(err)
            return res.status(500).json({error: err.code})
        })
        
    })
}
//Comment on scream
exports.commentOnScream=(req,res)=>{
    if(req.body.body.trim() === '' ){
       return res.status(500).json({comment: 'Must not be empty'})
    }
    const newComment = {
        body: req.body.body,
        userHandle: req.user.handle,  
        screamId : req.params.screamId,
        createdAt: new Date().toISOString(),
        userImage: req.user.imageUrl
    };
    db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc=>{    
        if(!doc.exists){
           return res.status(400).json({error: 'Scream not found'})
        }
        return doc.ref.update({ commentCount: doc.data().commentCount + 1 })

    }).then(()=>{
        db.collection('comments').add(newComment)
    })
    .then(()=>{
        return res.json(newComment)
    }).catch(err=>{
        console.log(err)
       return res.status(500).json({error : 'Something went wrong'})
    })
}
//Like a scream
exports.likeScream = (req,res) =>{
    const likeDocument = db.collection('likes').where('userHandle' ,'==' , req.user.handle)
    .where('screamId','==', req.params.screamId).limit(1)

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);
    let screamData = {};

    screamDocument.get()
    .then(doc=>{
        if(doc.exists){
            screamData = doc.data()
            screamData.screamId = doc.id;
            return likeDocument.get()
        }else{
            return res.status(404).json({error: 'scream not found'})
        }
    })
    .then(data=>{
        if (data.empty){
            return db.collection('likes').add({
                screamId: req.params.screamId,
                userHandle: req.user.handle
            }).then(()=>{
                screamData.likeCount++
                return screamDocument.update({likeCount: screamData.likeCount});
            })
            .then(()=>{
                return res.json(screamData)
            })
        }else{
            return res.status(400).json({error: 'scream already liked'})
        }

    }).catch(err=>{
        console.log(err)
        return res.status(500).json({ error:err.code })
    })
}
// Unlike a scream
exports.unLikeScream = (req,res) =>{
    const likeDocument = db.collection('likes').where('userHandle' ,'==' , req.user.handle)
    .where('screamId','==',req.params.screamId).limit(1)

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);
    let screamData = {};

    screamDocument.get()
    .then(doc=>{
        if(doc.exists){
            screamData = doc.data()
            screamData.screamId = doc.id;
            return likeDocument.get()
        }else{
            return res.status(404).json({error: 'scream not found'})
        }
    })
    .then(data=>{
        if(data.empty){
            return res.status(400).json({error: 'scream not liked'})
            
        }else{
            return db.doc(`/likes/${data.docs[0].id}`).delete()
            .then(() =>{
                screamData.likeCount--;
                return screamDocument.update({ likeCount:screamData.likeCount })
            })
            .then(()=>{
                return res.json(screamData);
            })
        }
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({ error: err.code })
    })
}
//Delete a Scream
exports.deleteScream = (req,res) => {
    const screamId = req.params.screamId;
    const document = db.doc(`/screams/${screamId}`)
    document.get()
    .then(doc=>{
        if(!doc.exists){
            return res.status(404).json({error: 'scream not found'})
        }
            if(doc.data().userHandle !== req.user.handle){
               return res.status(403).json({error: 'unauthorized'})
            }else{
                document.delete()
                .then(()=>{
                   return res.json({message: 'Scream deleted successfully'})
                })
            }       
    })
    .catch(err=>{
        console.log(err)
       return res.status(500).json({error: err.code})
    })
}