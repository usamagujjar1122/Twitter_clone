import { IconButton, Stack, Typography } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
const Nav = () => {
  return (
    <>
      <Stack sx={{ padding: "10px 10px", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'cenetr', position: 'sticky', top: '0%' }}>
        <Stack sx={{ justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }}>Timeline</Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default Nav;