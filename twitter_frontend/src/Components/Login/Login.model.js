import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, Stack, Typography, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import GoogleButton from '../../Elements/GoogleSignUp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};



export default function LoginModel({ open, setopen }) {
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

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

        }}>
          <Stack sx={{
            flexDirection: "row",
            gap: "28px",
            padding: { xs: "8px", md: '10px' },
            position: 'relative',
            alignItems: 'center',

          }}>
            <IconButton>
              <CloseIcon onClick={() => { setopen(false) }} />
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
            <TextField variant="outlined" label="Email" />
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
            >
              Next
            </Button>

            <Typography sx={{ color: "rgba(0,0,0,0.7)", fontSize: '14px' }}>
              Don't have an account? <a href="#">Sign Up</a>
            </Typography>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
