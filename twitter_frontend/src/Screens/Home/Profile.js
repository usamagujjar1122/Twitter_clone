import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Post from '../../Components/Home/Post';
const Profile = () => {
  return (
    <Stack sx={{ maxWidth: '600px', margin: 'auto' }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '10px', }}>
        <IconButton>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Stack>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Osama_foji</Typography>
          <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>24 tweets</Typography>
        </Stack>
      </Stack>
      <Stack sx={{ position: 'relative', width: '100%', height: { xs: "30vw", sm: "25vw", md: '15vw' }, backgroundColor: 'rgba(29, 155, 240,0.9)', borderRadius: "2px" }}>
        <Avatar
          sx={{
            position: 'absolute',
            bottom: { xs: "-8.5vw", sm: "-7.5vw", md: '-5vw' },
            left: '10px',
            height: { xs: "17vw", sm: "15vw", md: '10vw' },
            width: { xs: "17vw", sm: "15vw", md: '10vw' }
          }}
        >
          A
        </Avatar>
      </Stack>
      <Stack sx={{ position: 'relative', padding: '10px', gap: '10px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Button
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontWeight: 'bold',
            backgroundColor: 'rgb(0,0,0)',
            borderRadius: '25px',
            color: 'white',
            padding: '4px 24px',
            textTransform: 'none',

            '&:hover': {
              backgroundColor: 'rgb(0,0,0)',
            },
          }}>
          <Typography sx={{ fontSize: { xs: "14px", md: '16px' } }}>Follow</Typography>
        </Button>
        <Stack sx={{ marginTop: { xs: "8.5vw", sm: "7.5vw", md: '5vw' } }}>
          <Typography sx={{ textAlign: 'start', fontWeight: 'bold', fontSize: '1.1rem' }}>Osama_foji</Typography>
          <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.7)", lineHeight: 0.8 }}>@osama_foji</Typography>
        </Stack>
        <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>Crypto trader bacholar in IT.</Typography>
        <Stack direction={"row"} sx={{ gap: '4px', alignItems: "center" }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: "14px", color: "rgba(0,0,0,0.6)", }} />
          <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
            Joined August 2022
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ gap: "6px" }}>
          <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)", }}><span style={{ fontWeight: 'bold', color: 'black' }}>2</span> Following</Typography>
          <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)", }}><span style={{ fontWeight: 'bold', color: 'black' }}>2</span> Followers</Typography>
        </Stack>
      </Stack >
      <Stack>
        <Post />
        <Post />
        <Post />
      </Stack>
    </Stack >
  );
}

export default Profile;