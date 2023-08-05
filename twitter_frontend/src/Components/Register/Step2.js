import { Stack, Typography, Button, Checkbox, } from '@mui/material';

const Step2 = ({ setsteps }) => {
  return (
    <>
      <Stack sx={{ gap: { xs: "10px", md: '20px' } }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', md: '26px' },
          }}
        >
          Customize your experience
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', md: "1rem" } }}>Track where you see X content across the web</Typography>
        <Stack sx={{ flexDirection: 'row' }}>
          <Typography sx={{ color: 'rgba(0,0,0,0.75)', fontSize: { xs: '0.8rem', md: "1rem" } }}>X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</Typography>
          <Checkbox
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
        </Stack>
        <Typography sx={{ color: 'rgba(0,0,0,0.75)', marginBottom: '40px', fontSize: { xs: '0.8rem', md: "1rem" } }}>By signing up, you agree to our <blue>Terms</blue>, <blue>Privacy Policy</blue>, and <blue>Cookie Use</blue>. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <blue>Learn more</blue></Typography>
      </Stack>
      <Button
        sx={{
          alignSelf: { xs: 'center', md: "start" },
          width: '100%',
          padding: { xs: "4px", md: '10px' },
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: 'rgb(0,0,0)',
          borderRadius: '40px',
          color: 'white',
          textTransform: 'none',
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
        onClick={() => setsteps(3)}
      >
        Next
      </Button>
    </>
  );
}

export default Step2;