import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { Stack } from '@mui/material';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { URL } from '../../utils/url';
import { AuthContext } from '../../Context/AuthContext';
import { DataContext } from '../../Context/DataContext';
const GoogleButton = ({ showAlert }) => {
  const { login, setFrom } = React.useContext(AuthContext)
  const { set_user } = React.useContext(DataContext)

  const [loading, setLoading] = useState(true)
  const handlesubmit = async (response) => {
    try {
      const res = await axios.post(`${URL}/user/signup_via_google`, { token: response.credential })
      if (res.data.success) {
        setFrom('register')
        set_user(res.data.user)
        localStorage.setItem('twitter', res.data.token)
        login()
      } else {
        showAlert('Something went wrong')
      }
    } catch (error) {
      showAlert(error.response.data.message)
    }
  }
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <>
      <GoogleOAuthProvider clientId="458412751595-7a4q3s5e84br5fcs4rmtm0lml6utg54r.apps.googleusercontent.com">
        <Stack sx={{
          width: "300px",
          alignSelf: { xs: 'center', md: 'start' },
          '& div': {
            borderRadius: '25px'
          },
          position: 'relative'
        }}>
          {loading && <Spinner style={{ position: 'absolute', top: '30%', left: '140px', transform: "translate(-50%,-50%)", width: '20px', height: '20px' }} />}
          <GoogleLogin
            text="signup_with"
            onSuccess={response => {
              handlesubmit(response)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            width={300}
          />
        </Stack>
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleButton;
