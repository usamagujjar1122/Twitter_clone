import { Stack, Typography, TextField, Button, } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { URL } from '../../utils/url';
import { useState } from 'react';
const Step3 = ({ setsteps, name, email, dob, showAlert }) => {
  const [in_process, set_in_process] = useState(false)
  const handleclick = async () => {
    set_in_process(true)
    try {
      const res = await axios.post(`${URL}/user/signup_step_2`, { email })
      if (res.data.success) {
        setsteps(4)
        set_in_process(false)

      }
    } catch (error) {
      showAlert(error.response.data.message)
      set_in_process(false)

    }
  }
  return (
    <>
      <Stack sx={{ gap: { xs: '10px', md: "20px" }, '& .Mui-disabled': { display: 'none' } }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '26px',
          }}
        >
          Create Your Account
        </Typography>
        <Stack sx={{ position: 'relative', '& >svg': { zIndex: 2, fill: 'rgb(0, 186, 124)', cursor: 'pointer', width: '16px', position: 'absolute', top: '50%', transform: "translateY(-50%)", right: '10px' } }}>
          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} area-readonly />
          <svg onClick={() => setsteps(1)} viewBox="0 0 24 24" aria-hidden="true" class="r-1kihuf0 r-o6sn0f r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-m2pi6t r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z"></path></g></svg>
        </Stack>
        <Stack sx={{ position: 'relative', '& >svg': { zIndex: 2, fill: 'rgb(0, 186, 124)', cursor: 'pointer', width: '16px', position: 'absolute', top: '50%', transform: "translateY(-50%)", right: '10px' } }}>
          <svg onClick={() => setsteps(1)} viewBox="0 0 24 24" aria-hidden="true" class="r-1kihuf0 r-o6sn0f r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-m2pi6t r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z"></path></g></svg>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} area-readonly />
        </Stack>
        <Stack sx={{ position: 'relative', '& >svg': { zIndex: 2, fill: 'rgb(0, 186, 124)', cursor: 'pointer', width: '16px', position: 'absolute', top: '50%', transform: "translateY(-50%)", right: '10px' } }}>
          <svg onClick={() => setsteps(1)} viewBox="0 0 24 24" aria-hidden="true" class="r-1kihuf0 r-o6sn0f r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-m2pi6t r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z"></path></g></svg>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '100%', '& button': { display: 'none !important' } }}>
            <DemoContainer components={['DatePicker']} >
              <DatePicker label="Date of Birth" sx={{ minWidth: '100% !important' }} area-readonly defaultValue={dayjs(dob)} readOnly disableFuture />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
        <Typography sx={{ color: "rgba(0,0,0,0.7)", fontSize: '12px' }}>
          By signing up, you agree to the <blue>Terms of Service</blue> and <blue>Privacy Policy</blue>, including <blue>Cookie Use</blue>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. <blue>Learn more</blue>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <blue>here</blue>.
        </Typography>
      </Stack>
      <Button
        sx={{
          borderRadius: '40px',
          color: 'white',
          textTransform: 'none',
          width: '100%',
          padding: { xs: "4px", md: '10px' },
          fontSize: '18px',
          alignSelf: { xs: 'center', md: "start" },
          fontWeight: 'bold',
          backgroundColor: 'rgb(29, 155, 240)',
          '&:hover': {
            backgroundColor: 'rgb(26, 140, 226)',
          },
          '&[disabled]': {
            backgroundColor: 'rgb(26, 140, 226,0.8)',
            color: 'white'
          }
        }}
        onClick={handleclick}
        disabled={in_process}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Step3;