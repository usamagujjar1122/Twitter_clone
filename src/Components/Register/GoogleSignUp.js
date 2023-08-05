import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
function GoogleSignIn() {
  const matches = useMediaQuery('(min-width:900px)');
  const responseGoogle_success = (response) => {
    console.log(response);
    // Handle user data and authentication here
  };
  const responseGoogle_failure = (response) => {
    console.log(response);
    // Handle user data and authentication here
  };

  return (
    <Box sx={{
      '& button': {
        width: '300px !important',
        borderRadius: '25px !important',
        boxShadow: 'none !important',
        backgroundColor: "black ",
        border: '1px solid black !important',
        padding: "0px 20px !important",
        display: 'flex !important',
        flexDirection: 'row-reverse !important',
        margin: matches ? 'inherit !important' : "auto !important",
        justifyContent: 'center !important'
      },
      '& button > div': {
        padding: '7px !important',
        marginRight: '0px !important'
      },
      '& button>span': {
        padding: '7px !important'
      }

    }}>
      <GoogleLogin
        id="google_button"
        clientId="106563323624-69mntmu58oj16m1a5jc5hm965ohh9n6s.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseGoogle_success}
        onFailure={responseGoogle_failure}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  );
}

export default GoogleSignIn;
