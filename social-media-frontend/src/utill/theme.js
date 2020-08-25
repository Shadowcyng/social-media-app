export default {
  
    palette: {
      primary: {
        light: '#008394',
        main: '#00bcd4',
        dark: '#33c9dc',
        contrastText: '#fff',
      },
      secondary: {
        light: '#8a1c1c',
        main: '#c62828',
        dark: '#d15353',
        contrastText: '#fff',
      },
    },
    typography:{
      useNextVarients: true
    },
    theme :{
      imageIcon:{
        width : 100,
        maxWidth : '100%',
        height: 100,
        ojectFit: 'cover',
        marginTop:10,
        borderRadius: '50%'
      },
      form:{
      textAlign: 'center',
    },
    pageTitle:{
        margin: '10px auto 10px auto',  
    },
    image:{
        margin: '20px auto 20px auto',
    },
    textField:{
        margin: '10px auto 10px auto',
    },
    button:{
        marginTop: 20,
        position: 'relative',
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10'
    },
    progress:{
        position: 'absolute',
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        }
      }
    },
    buttons: {
      textAlign: 'center',
      
      '& a': {
        margin: '20px 10px'
      }
    },
    bottomTool: {
      float : 'right'
    },
  invisibleSeparator : {
    border: 'none',
    margin: 4 
},
visibleSeparator : {
  width: '100%',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  marginBottom: 20 
},
  },
}