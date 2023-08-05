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
  bgcolor: 'background.paper',
  boxShadow: 24,
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Stack sx={{
          ...style,
          width: { xs: "100%", md: "600px" },
          height: { xs: "100%", md: "auto" },
          borderRadius: { xs: "none", md: '10px' },
          outline: 'none',

        }}>
          <Steps setopen={setopen} />
        </Stack>
      </Modal>
    </div>
  );
}
