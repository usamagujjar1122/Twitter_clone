import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Steps from './Steps';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function StepsModel({ open, setopen }) {
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "60%" },
          height: { xs: "100%", md: "auto" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',
        }}>
          <Steps />
        </Stack>
      </Modal>
    </div>
  );
}
