import { Stack, Typography } from "@mui/material";

const Alert = ({ alert }) => {

  return (
    <>
      {alert &&
        <Stack sx={{ padding: '10px', backgroundColor: 'rgb(29, 155, 240)', color: 'white', position: 'absolute', bottom: '0%', left: '0%', right: '0%' }}>
          <Typography>{alert}</Typography>
        </Stack>
      }
    </>
  );
}

export default Alert;