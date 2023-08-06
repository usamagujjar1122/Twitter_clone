import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
const Steps = ({ setopen, showAlert }) => {
  const [steps, setsteps] = React.useState(1)
  const [name, setname] = React.useState('')
  const [email, setemail] = React.useState('')
  const [dob, setdob] = React.useState('01/01/2000')
  return (
    <>
      <Stack sx={{
        flexDirection: "row",
        gap: "28px",
        padding: { xs: "8px", md: '10px' },
        alignItems: 'center',
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
      <Stack sx={{ padding: { xs: '10px 20px', sm: "10px 40px", md: "30px 70px 30px 70px" }, justifyContent: 'space-between', gap: "40px" }}>
        {steps === 1 && <Step1 setsteps={setsteps} showAlert={showAlert} name={name} dob={dob} email={email} setname={setname} setemail={setemail} setdob={setdob} />}
        {steps === 2 && <Step2 setsteps={setsteps} showAlert={showAlert} />}
        {steps === 3 && <Step3 setsteps={setsteps} showAlert={showAlert} name={name} dob={dob} email={email} />}
        {steps === 4 && <Step4 setsteps={setsteps} showAlert={showAlert} email={email} />}
        {steps === 5 && <Step5 setsteps={setsteps} showAlert={showAlert} name={name} dob={dob} email={email} />}
      </Stack >
    </>
  );
}

export default Steps;