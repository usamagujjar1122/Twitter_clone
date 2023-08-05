import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { Stack, Typography, TextField, Button, IconButton, Checkbox, Menu, MeniItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Steps = ({ setopen }) => {
  const [show_password, set_show_password] = React.useState(false)
  const [steps, setsteps] = React.useState(1)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack sx={{
        flexDirection: "row",
        gap: "28px",
        padding: { xs: "8px", md: '10px' },
        alignItems: 'center',
        flex: 1
      }}>
        <IconButton>
          <CloseIcon onClick={() => { setopen(false) }} />
        </IconButton>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>{`Step ${steps} of 5`}
        </Typography>
      </Stack >
      <Stack sx={{ flex: 4, padding: { xs: '10px', md: "30px 70px 30px 70px" }, justifyContent: 'space-between', gap: "40px", minHeight: '70vh' }}>
        {steps === 1 && <>
          <Stack sx={{ gap: "24px" }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '26px',
              }}
            >
              Create Your Account
            </Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <Stack>
              <Typography sx={{ fontWeight: 'bold' }}>Date of birth</Typography>
              <Typography sx={{ fontSize: '14px', dolor: "rgba(0,0,0,0.75)" }}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Typography>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '100%', }}>
              <DemoContainer components={['DatePicker']} >
                <DatePicker label="Date of Birth" sx={{ minWidth: '100% !important' }} />
              </DemoContainer>
            </LocalizationProvider>
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
            onClick={() => setsteps(2)}
          >
            Next
          </Button>
        </>
        }
        {steps === 2 &&
          <>
            <Stack sx={{ gap: { xs: "10px", md: '20px' } }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.25rem', md: '26px' },
                }}
              >
                Customize your experience
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', md: "1rem" } }}>Track where you see X content across the web</Typography>
              <Stack sx={{ flexDirection: 'row' }}>
                <Typography sx={{ color: 'rgba(0,0,0,0.75)', fontSize: { xs: '0.8rem', md: "1rem" } }}>X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</Typography>
                <Checkbox
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Stack>
              <Typography sx={{ color: 'rgba(0,0,0,0.75)', marginBottom: '40px', fontSize: { xs: '0.8rem', md: "1rem" } }}>By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Use</a>. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <a href="#">Learn more</a></Typography>
            </Stack>
            <Button
              sx={{
                alignSelf: { xs: 'center', md: "start" },
                width: '100%',
                padding: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: 'rgb(0,0,0)',
                borderRadius: '40px',
                color: 'white',
                textTransform: 'none',
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
              onClick={() => setsteps(3)}
            >
              Next
            </Button>
          </>}
        {steps === 3 &&
          <>
            <Stack sx={{ '& .css-4jnixx-MuiStack-root': { paddingTop: "0px" }, gap: { xs: '10px', md: "20px" } }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '26px',
                }}
              >
                Create Your Account
              </Typography>
              <TextField id="outlined-basic" label="Name" variant="outlined" />
              <TextField id="outlined-basic" label="Name" variant="outlined" />
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '100%', paddingTop: "0px !important" }}>
                <DemoContainer components={['DatePicker']} >
                  <DatePicker label="Date of Birth" sx={{ minWidth: '100% !important' }} />
                </DemoContainer>
              </LocalizationProvider>
              <Typography sx={{ color: "rgba(0,0,0,0.7)", fontSize: '12px' }}>
                By signing up, you agree to the <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>, including <a href="">Cookie Use</a>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. <a href="">Learn more</a>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <a href="">here</a>.
              </Typography>
            </Stack>
            <Button
              sx={{
                borderRadius: '40px',
                color: 'white',
                textTransform: 'none',
                width: '100%',
                padding: '10px',
                fontSize: '18px',
                alignSelf: { xs: 'center', md: "start" },
                fontWeight: 'bold',
                backgroundColor: 'rgb(29, 155, 240)',
                '&:hover': {
                  backgroundColor: 'rgb(26, 140, 226)',
                }
              }}
              onClick={() => setsteps(4)}
            >
              Sign Up
            </Button>
          </>
        }

        {steps === 4 &&
          <>
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
                <Typography sx={{ color: "rgba(0,0,0,0.7)" }}>Enter it below to verify aliraza230489q30489@gmail.com.</Typography>
              </Stack>
              <Stack>
                <TextField
                  id="outlined-basic"
                  label="Verification code"
                  variant="outlined"
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
                  <MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>Resend email</MenuItem>
                </Menu>
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
              onClick={() => setsteps(5)}
            >
              Next
            </Button>
          </>
        }
        {steps === 5 &&
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
                marginTop: '150px',
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
              onClick={() => setsteps(5)}
            >
              Next
            </Button>
          </>
        }
      </Stack >
    </>
  );
}

export default Steps;