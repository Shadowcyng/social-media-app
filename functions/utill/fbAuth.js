
const {admin,db} = require('../utill/admin')

module.exports = (req, res, next)=>{
    let idToken;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    idToken = req.headers.authorization.split('Bearer ')[1]
}else{
    console.log('No token found')
    res.status(403).json({error: 'unauthorized'})
}
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken=>{
        req.user = decodedToken;
        return db.collection('users')
        .where('userId', '==', req.user.uid )
        .limit(1)
        .get()
    })
    .then(data=>{
        // console.log('data',data)
        console.log('data',data.docs[0].data())
        req.user.handle = data.docs[0].data().handle;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        return next();
    })
    .catch(err=>{
        console.log('error while varifying token', err)
      return res.status(403).json({error:err})
    })

}
