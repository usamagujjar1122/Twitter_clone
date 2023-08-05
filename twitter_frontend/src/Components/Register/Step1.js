import { Stack, Typography, TextField, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { URL } from '../../utils/url';
import axios from 'axios';
import dayjs from 'dayjs';
const Step1 = ({ setsteps, showAlert, name, email, dob, setname, setemail, setdob }) => {

  const handleClick = async () => {
    let formdata = { email, dob, name }
    try {
      const res = await axios.post(`${URL}/user/signup_step_1`, formdata)
      if (res.data.success) {
        setsteps(2)
      } else {
        showAlert(res.data.message)
      }
    } catch (error) {
      showAlert(error.response.data.message)
    }
  }
  return (
    <>
      <Stack sx={{ gap: "24px" }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '26px',
          }}
        >
          Create Your Account
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setname(e.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setemail(e.target.value)} />
        <Stack>
          <Typography sx={{ fontWeight: 'bold' }}>Date of birth</Typography>
          <Typography sx={{ fontSize: '14px', dolor: "rgba(0,0,0,0.75)" }}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Typography>
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '100%', }}>
          <DemoContainer components={['DatePicker']} >
            <DatePicker label="Date of Birth" sx={{ minWidth: '100% !important' }} value={dayjs(dob)} onChange={(e) => { setdob(`${e.$D}-${e.$M + 1}-${e.$y}`) }} disableFuture />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <Button
        disabled={!name || !email}
        sx={{
          marginBottom: '20px !important',
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
        onClick={handleClick}
      >
        Next
      </Button>
    </>
  );
}

export default Step1;