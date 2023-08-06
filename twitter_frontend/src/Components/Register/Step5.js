import { Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as React from 'react'
import axios from 'axios';
import { URL } from '../../utils/url';
import { AuthContext } from '../../Context/AuthContext.tsx';
import { DataContext } from '../../Context/DataContext';
const Step5 = ({ showAlert, name, email, dob }) => {
  const { login, setFrom } = React.useContext(AuthContext)
  const [show_password, set_show_password] = React.useState(false)
  const [password, set_password] = React.useState('')
  const { set_user } = React.useContext(DataContext)
  const handleclick = async () => {
    try {
      const formdata = { email, password, name, dob }
      const res = await axios.post(`${URL}/user/signup_step_4`, formdata)
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
  return (
    <>
      <Stack sx={{ gap: '20px' }}>
        <Stack>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '26px',
            }}
          >
            You'll need a password
          </Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.7)" }}>Make sure its 8 charaters or more.</Typography>
        </Stack>
        <Stack sx={{ position: 'relative' }}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={show_password ? 'text' : 'password'}
            value={password}
            onChange={e => set_password(e.target.value)}
          />
          {show_password ?
            <IconButton onClick={() => set_show_password(false)} sx={{ position: 'absolute', right: '0%', top: '10px' }}>
              <VisibilityOffIcon />
            </IconButton>
            : <IconButton onClick={() => set_show_password(true)} sx={{ position: 'absolute', right: '0%', top: '10px' }}>
              <VisibilityIcon />
            </IconButton>
          }
        </Stack>
      </Stack>
      <Button
        disable={!password}
        sx={{
          alignSelf: { xs: 'center', md: "start" },
          fontWeight: 'bold',
          backgroundColor: 'rgb(0,0,0)',
          borderRadius: '40px',
          color: 'white',
          textTransform: 'none',
          width: '100%',
          padding: { xs: "4px", md: '10px' },
          fontSize: '18px',
          // marginTop: '150px',
          marginbottom: '20px',
          '&:hover': {
            backgroundColor: 'rgb(0,0,0)',
          },
          '&[disabled]': {
            backgroundColor: 'rgb(135,137,140)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgb(135,137,140)',
            },
          },
        }}
        onClick={handleclick}
      >
        Finish
      </Button>
    </>
  );
}

export default Step5;