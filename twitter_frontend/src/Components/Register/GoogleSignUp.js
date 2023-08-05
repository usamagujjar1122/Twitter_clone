import React, { useEffect, useState } from 'react';
import gapi from '../../Scripts/google.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { Stack } from '@mui/material';
import Spinner from '../Spinner/Spinner';
const GoogleButton = () => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <GoogleOAuthProvider clientId="458412751595-7a4q3s5e84br5fcs4rmtm0lml6utg54r.apps.googleusercontent.com">
      <Stack sx={{
        width: "300px",
        alignSelf: { xs: 'center', md: 'start' },
        '& div': {
          borderRadius: '25px'
        },
        position: 'relative'
      }}>
        {loading && <Spinner style={{ position: 'absolute', top: '30%', left: '50%', transform: "translate(-50%,-50%)", width: '20px', height: '20px' }} />}
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          width={300}
        />
      </Stack>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
