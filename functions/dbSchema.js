const { user } = require("firebase-functions/lib/providers/auth");
const { getMaxListeners } = require("process");

let db = {
        users:[
            {
                userId: 'dh1233425svdgkbj2',
                email: 'user@gmail.com',
                handle: 'user',
                createdAt: '2019-03-15T:59:52.798z',
                imageUrl: 'image/55489461854.jpg',
                bio: 'Hello! my name is user ',
                website: 'https://user.com',
                location: 'Location, UK'
            }
        ] ,
        screams:[
            {
                userHandle: 'user',
                body: 'This is a scream body',
                createdAt:'2020-08-07T18:12:05.238Z',
                likeCount: 5,
                commentCount: 2
            }
        ],
    comments : {
        userHanle : 'user',
        screamId: 'vudhoijhoguyfigfdashoz',
        body: 'nice comment',
        createdAt: '2019-06-03T01:05:52'
    },
    notification:{
        recipient: 'user',
        sender: 'john',
        read: 'true | false',
        screamId: 'bjsdbkivhiauvdsioh',
        type: 'like | comment',
        createdAt: '2020-08-07T18:12:05.238Z',
    }
    }
    const userDetails = {
        credentials: {
            userId: 'N4bhsbdlnihidfnkA',
            email: 'user@yahooo.com',
            handle: "user",
            createdAt: 'something',
            imagUrl: 'SomeURL',
            bio: 'likh lo',
            website: 'bisdho.com',
            location: 'London UK'
        },
        likes : [{
            userHandle = 'user',
            screamId = 'hh7sbsdbom'
        },
        {
            userHandle = 'user',
            screamId = 'sjojhoashibm'
        }]
    }