import { Stack } from "@mui/material";

const Alert = ({ msgList }) => {

  return (
    <>
      {msgList.lengtjh > 0 &&
        <Stack sx={{ position: 'relative' }}>
          <Stack sx={{ padding: '10px', backgroundColor: 'rgb(29, 155, 240)', color: 'white', position: 'absolute' }}>
            <Typography>{msgList[msgList.length]}</Typography>
          </Stack>
        </Stack>
      }
    </>
  );
}

export default Alert;