import { IconButton, Stack, Typography } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.tsx";
const Nav = () => {
  const { logout } = useContext(AuthContext)
  return (
    <>
      <Stack sx={{ padding: "10px 10px", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'cenetr', position: 'sticky', top: '0%' }}>
        <Stack sx={{ justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }}>Timeline</Typography>
        </Stack>
        <IconButton>
          <LogoutIcon onClick={logout} />
        </IconButton>
      </Stack>
    </>
  );
}

export default Nav;