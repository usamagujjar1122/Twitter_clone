import * as React from 'react'
import { Stack, Box, Typography, Button } from '@mui/material';
import GoogleButton from '../../Elements/GoogleSignUp';
import StepsModel from '../../Components/Register/Steps.model';
import LoginModel from '../../Components/Login/Login.model';
const Register = () => {
  const [open, setopen] = React.useState(false)
  const [login_open, set_login_open] = React.useState(false)

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        width: '100vw',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          '& svg': {
            width: "60%",
            position: 'absolute',
            top: "50%",
            left: '50%',
            transform: 'translate(-50%,-50%)',
            display: { xs: "none", md: "block" }
          },
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-e65kyq r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
      </Box>
      <Stack sx={{
        flex: { xs: 4, md: 1 },
        position: 'relative'
      }}>
        <Stack sx={{
          position: { xs: 'relative', md: 'absolute' },
          top: '50%',
          left: { md: '50%' },
          transform: { md: 'translate(-50%,-50%)' },
          padding: "20px",
          gap: { xs: "10px" },
          justifyContent: { xs: "center", md: 'start' }
        }}>
          <Box sx={{
            display: { xs: 'block', md: 'none' },
            width: '300px',
            alignSelf: { xs: 'center', md: "start" },
            position: 'relative',
            marginBottom: '50px',
            '& svg': {
              width: '40px',
              position: 'absolute',
              top: '0%',
              left: '0%',
            }
          }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-e65kyq r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
          </Box>
          <Typography
            sx={{
              fontFamily: 'TwitterChirp',
              fontWeight: 700,
              fontSize: { xs: "40px", sm: '60px' },
              textAlign: 'start',
              whiteSpace: 'nowrap',
              width: { xs: '300px', md: "100%" },
              alignSelf: { xs: "center", md: 'start' }
            }}>
            Happening now
          </Typography>
          <Typography
            sx={{
              fontFamily: 'TwitterChirp',
              fontWeight: 700,
              fontSize: { xs: "20px", sm: '30px' },
              textAlign: 'start',
              width: { xs: '300px', md: "100%" },
              alignSelf: { xs: "center", md: 'start' }
            }}>
            Join today.
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
          <Button
            sx={{
              alignSelf: { xs: 'center', md: "start" },
              fontWeight: 'bold',
              backgroundColor: 'rgb(29, 155, 240)',
              borderRadius: '25px',
              color: 'white',
              textTransform: 'none',
              width: '300px',
              '&:hover': {
                backgroundColor: 'rgb(26, 140, 226)',
              }
            }}
            onClick={() => setopen(true)}
          >
            Create Account
          </Button>
          <StepsModel open={open} setopen={setopen} />
          <Typography
            sx={{
              fontSize: '12px',
              textAlign: 'start',
              width: '280px',
              alignSelf: { xs: 'center', md: "start" },

            }}>
            By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie</a> Use.
          </Typography>
          <Stack sx={{
            width: "300px",
            alignSelf: { xs: 'center', md: "start" },
            marginTop: '50px',
            gap: '20px'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              fontSize: "1.15rem",
              textAlign: 'start',
            }}>Already have an account?</Typography>
            <Button sx={{
              alignSelf: { xs: 'center', md: "start" },
              fontWeight: 'bold',
              backgroundColor: 'white',
              borderRadius: '25px',
              color: 'rgb(26,155,240)',
              textTransform: 'none',
              width: '300px',
              border: '1px solid rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(29, 155, 240,0.2)',

              }
            }}
              onClick={() => set_login_open(true)}
            >
              Sign In
            </Button>
            <LoginModel open={login_open} setopen={set_login_open} />
          </Stack>
        </Stack>
      </Stack>
    </Stack >

  );
}

export default Register;