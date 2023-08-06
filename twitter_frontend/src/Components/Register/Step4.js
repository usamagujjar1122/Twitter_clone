import { Stack, Typography, TextField, Button, Menu, MenuItem } from '@mui/material';
import * as React from 'react'
import { URL } from '../../utils/url';
import axios from 'axios';
const Step4 = ({ setsteps, email, showAlert }) => {
  const [otp, setotp] = React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const resend = async () => {
    try {
      const res = await axios.post(`${URL}/user/signup_step_2`, { email })
      if (res.data.success) {
        showAlert("OTP sent again!")
      }
    } catch (error) {
      showAlert(error.response.data.message)
    }
  }

  const handleclick = async () => {
    try {
      const res = await axios.post(`${URL}/user/signup_step_3`, { otp, email })
      if (res.data.success) {
        setsteps(5)
      } else {
        showAlert("Somethimg went wrong!")
      }
    } catch (error) {
      showAlert(error.response.data.message)
    }
  }
  return (<>
    <Stack sx={{ gap: '20px' }}>
      <Stack>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '26px',
          }}
        >
          We sent you a code
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.7)" }}>Enter it below to verify {email}.</Typography>
      </Stack>
      <Stack>
        <TextField
          id="outlined-basic"
          label="Verification code"
          variant="outlined"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
        // helperText="Did'nt recieve email?"
        // sx={{
        //   '&>p': {
        //     color: "rgb(29, 155, 240)",
        //     cursor: 'pointer'
        //   }
        // }}

        />
        <Typography
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ fontSize: '12px', color: "rgb(29, 155, 240)", cursor: 'pointer' }}>
          Did'nt recieve code?
        </Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => { handleClose(); resend() }} sx={{ fontWeight: 'bold' }}>Resend email</MenuItem>
        </Menu>
      </Stack>
    </Stack >
    <Button
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
      Submit
    </Button>
  </>);
}

export default Step4;