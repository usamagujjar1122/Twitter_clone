import * as React from 'react';
import { Modal, Stack, Typography } from '@mui/material';
import Steps from './Steps';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: '100vh',
  overflowY: 'auto !important'
};



export default function StepsModel({ open, setopen }) {
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
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "600px" },
          minHeight: { xs: "100%", md: "80%" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',
          gap: '20px',
          position: 'relative',
        }}>
          <Steps setopen={setopen} showAlert={showAlert} />
          {alert &&
            <Stack sx={{ padding: '10px', backgroundColor: 'rgb(29, 155, 240)', color: 'white', position: 'absolute', bottom: '0%', left: '0%', right: '0%' }}>
              <Typography>{alert}</Typography>
            </Stack>
          }
        </Stack>
      </Modal>
    </div >
  );
}
