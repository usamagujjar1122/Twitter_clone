import * as React from 'react';
import { Modal, Stack, Typography } from '@mui/material';
import Steps from './Steps';
import useMediaQuery from '@mui/material/useMediaQuery';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: '100vh',
};



export default function StepsModel({ open, setopen }) {
  const matches = useMediaQuery('(min-width:900px)');
  const [alert, setAlert] = React.useState('')
  const [timeoutId, setTimeoutId] = React.useState()
  const showAlert = (msg) => {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlert(msg)

    // Set a new timeout
    setTimeoutId(setTimeout(() => {
      setAlert('')
    }, 5000)
    )
  }
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
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "600px" },
          minHeight: { xs: "100vh", md: "80%" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',
          gap: '20px',
          overflow: 'auto',
        }}>
          {alert &&
            <Stack sx={{ zIndex: 2, padding: '10px', backgroundColor: 'rgb(29, 155, 240)', color: 'white', position: !matches ? 'sticky' : 'absolute', bottom: "0%", top: !matches && '0', left: '0%', right: '0%' }}>
              <Typography>{alert}</Typography>
            </Stack>
          }
          <Steps setopen={setopen} showAlert={showAlert} />
        </Stack>
      </Modal>
    </div >
  );
}
