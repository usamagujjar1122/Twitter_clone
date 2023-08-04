import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { Stack, Typography } from '@mui/material';

const Steps = () => {
  const { steps, setsteps } = React.useState(1)
  return (
    <>
      <Stack sx={{
        flexDirectipon: "row",
        gap: "40px"
      }}>
        <CloseIcon />
        <Typography>Step {steps} od 5</Typography>
      </Stack >
      <Stack sx={{ xs: { padding: '40px 20px 10px 20px', md: "40px 50px 30px 50px" } }}>

      </Stack>
    </>
  );
}

export default Steps;