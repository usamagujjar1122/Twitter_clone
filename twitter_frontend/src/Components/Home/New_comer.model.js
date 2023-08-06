import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, Stack, Typography, Button, FormControl, InputLabel, InputAdornment, OutlinedInput } from '@mui/material';
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
import { URL } from '../../utils/url';
import Alert from './Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};



export default function New_comer_model() {
  const { from, setFrom } = React.useContext(AuthContext)
  const [open, setopen] = React.useState(false)
  const [in_process, set_in_process] = React.useState(false)
  const [username, setusername] = React.useState('')
  const [step, setstep] = React.useState(1)
  const handleclick = async () => {
    set_in_process(true)
    try {
      const res = await axios.post(`${URL}/user/set_username`, { username }, {
        headers: {
          'token': localStorage.getItem('twitter')
        }
      })
      if (res.data.success) {
        setopen(false)
        set_in_process(false)
      } else {
        showAlert("Something went wrong")
        set_in_process(false)
      }
    } catch (error) {
      showAlert(error.response.data.message)
      set_in_process(false)
    }
  }
  const [alert, setAlert] = React.useState('')
  const [timeoutId, setTimeoutId] = React.useState()
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
  const handleClose = () => {
    setopen(false);
  };

  React.useEffect(() => {
    if (from === 'register') {
      setopen(true)
      setFrom('')
    }
  }, [])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "600px" },
          minHeight: { xs: "100%", md: "80%" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',
          display: 'flex'
        }}>
          <Stack sx={{
            flexDirection: "column",
            position: 'relative',
            alignItems: 'center',
            minHeight: { xs: "100vh", md: "80vh" },
            padding: { xs: '10px 30px', md: "10px 70px 10px 70px" },
            justifyContent: 'space-between',
            gap: "30px"
          }}>
            <Box sx={{
              width: '300px',
              alignSelf: { xs: 'center', md: "start" },
              '& svg': {
                width: '30px',
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: "translateX(-50%)"
              }
            }}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-e65kyq r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </Box>
            {step === 1 && <>
              <Stack sx={{ gap: "24px" }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '26px',
                  }}
                >
                  What would you like us to call you?
                </Typography>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">@</InputAdornment>}
                    label="Username"
                    value={username}
                    onChange={e => setusername(e.target.value)}
                  />
                </FormControl>
                <Stack>
                  <Typography sx={{ fontWeight: 'bold' }}>Choose a unique username</Typography>
                  <Typography sx={{ fontSize: '14px', dolor: "rgba(0,0,0,0.75)" }}>This will not be shown publicly. Username will be marked against each of your post. It will by your digital signature.</Typography>
                </Stack>
              </Stack>
              <Button
                sx={{
                  alignSelf: { xs: 'center', md: "start" },
                  fontWeight: 'bold',
                  backgroundColor: 'rgb(0,0,0)',
                  borderRadius: '40px',
                  color: 'white',
                  textTransform: 'none',
                  width: '100%',
                  padding: '10px',
                  fontSize: '18px',
                  marginBottom: '20px',
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
                disabled={in_process}
              >
                Next
              </Button>
            </>
            }
          </Stack>
          <Alert alert={alert} />
        </Stack>
      </Modal>
    </div >
  );
}
