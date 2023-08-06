import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, Stack, Typography, IconButton, TextField, Button } from '@mui/material';
import { AuthContext } from "../../Context/AuthContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};



export default function New_comer_model() {
  const { from } = React.useContext(AuthContext)
  const [open, setopen] = React.useState(false)
  const [username, setusername] = React.useState('')
  const [step, setstep] = React.useState(1)
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  React.useEffect(() => {
    if (from === 'register') {
      setopen(true)
    }
  }, [])
  // Lets code.
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
            justifyContent: 'space-between',
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
                top: '10px',
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
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={e => setusername(e.target.value)} />
                <Stack>
                  <Typography sx={{ fontWeight: 'bold' }}>Date of birth</Typography>
                  <Typography sx={{ fontSize: '14px', dolor: "rgba(0,0,0,0.75)" }}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Typography>
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
                onClick={() => setstep(2)}
              >
                Next
              </Button>
            </>
            }
          </Stack>
        </Stack>
      </Modal>
    </div >
  );
}
