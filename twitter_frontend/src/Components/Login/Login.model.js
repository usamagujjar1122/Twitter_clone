import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, Stack, Typography, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { DataContext } from '../../Context/DataContext';
import { URL } from '../../utils/url';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import GoogleButton from './GoogleLogin.js';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function LoginModel({ open, setopen }) {
  const { login, setFrom } = React.useContext(AuthContext)
  const { set_user } = React.useContext(DataContext)
  const [email, setemail] = React.useState('')
  const [show_password, set_show_password] = React.useState(false)
  const [in_process, set_in_process] = React.useState(false)
  const [password, setpassword] = React.useState('')
  const [alert, setAlert] = React.useState('')
  const [timeoutId, setTimeoutId] = React.useState()

  const matches = useMediaQuery('(min-width:600px)');

  const handleClose = () => {
    setopen(false);
  };

  const showAlert = (msg) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setAlert(msg)
    setTimeoutId(setTimeout(() => {
      setAlert('')
    }, 5000)
    )
  }

  const handleclick1 = async () => {
    try {
      set_in_process(true)
      const formdata = { email, password }
      const res = await axios.post(`${URL}/user/login_via_password`, formdata)
      if (res.data.success) {
        set_in_process(false)
        setFrom('login')
        set_user(res.data.user)
        localStorage.setItem('twitter', res.data.token)
        login()
      } else {
        set_in_process(false)
        showAlert('Something went wrong')
      }
    } catch (error) {
      set_in_process(false)
      showAlert(error.response.data.message)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          overflowY: 'scroll'
        }}
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "600px" },
          minHeight: { xs: "100%", md: "80%" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',
        }}>
          <Stack sx={{
            flexDirection: "row",
            gap: "28px",
            padding: { xs: "8px", md: '10px' },
            position: 'relative',
            alignItems: 'center',

          }}>
            <IconButton onClick={() => { setopen(false) }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{
              width: '300px',
              alignSelf: { xs: 'center', md: "start" },
              marginBottom: '50px',
              '& svg': {
                width: '40px',
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: "translateX(-50%)"
              }
            }}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-e65kyq r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </Box>
          </Stack >
          <Stack sx={{ padding: { xs: '20px 30px', md: "30px 70px 30px 70px" }, gap: "24px", width: '300px', alignSelf: 'center' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '28px',
              }}
            >
              Sign In to X
            </Typography>
            <GoogleButton />
            <Stack sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'start' },
              '&>hr': {
                height: '0.5px', width: '40%', color: 'rgba(0,0,0,0.05)', margin: '10px'
              },
              '&>span': {
                marginBottom: '6px'
              },
              width: '300px',
              alignSelf: { xs: "center", md: "start" }
            }}>
              < hr />
              <span>or</span>
              <hr />
            </Stack>
            <TextField variant="outlined" label="Email" value={email} onChange={e => setemail(e.target.value)} size={!matches && 'small'} />
            <Stack sx={{ position: 'relative' }}>
              <TextField
                variant="outlined"
                label="Password"
                value={password}
                onChange={e => setpassword(e.target.value)}
                type={show_password ? 'text' : 'password'}
                size={!matches && 'small'}
              />
              {show_password ?
                <IconButton onClick={() => set_show_password(false)} sx={{ position: 'absolute', right: '0%', top: matches ? '10px' : '0px' }}>
                  <VisibilityOffIcon />
                </IconButton>
                : <IconButton onClick={() => set_show_password(true)} sx={{ position: 'absolute', right: '0%', top: matches ? '10px' : '0px' }}>
                  <VisibilityIcon />
                </IconButton>
              }
            </Stack>
            <Button
              sx={{
                alignSelf: { xs: 'center', md: "start" },
                fontWeight: 'bold',
                backgroundColor: 'rgb(15, 20, 25)',
                borderRadius: '40px',
                color: 'white',
                textTransform: 'none',
                width: '100%',
                fontSize: '14px',
                padding: '6px',
                '&:hover': {
                  backgroundColor: 'rgb(15, 20, 25,0.9)',

                },
                '&[disabled]': {
                  backgroundColor: 'rgb(135,137,140)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgb(135,137,140)',
                  },
                },
              }}
              onClick={handleclick1}
              disabled={!email || !password || in_process}
            >
              Sign In
            </Button>

            <Typography sx={{ color: "rgba(0,0,0,0.7)", fontSize: '14px' }}>
              Don't have an account? <blue onClick={() => setopen(false)}>Sign Up</blue>
            </Typography>
            {alert &&
              <Stack sx={{ padding: '10px', backgroundColor: 'rgb(29, 155, 240)', color: 'white', position: 'absolute', bottom: '0%', left: '0%', right: '0%' }}>
                <Typography>{alert}</Typography>
              </Stack>
            }
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
