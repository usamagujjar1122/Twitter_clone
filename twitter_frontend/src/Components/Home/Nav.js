import { IconButton, Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
const Nav = () => {
  const { logout } = useContext(AuthContext)
  return (
    <>
      <Stack sx={{ padding: "10px 10px", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'cenetr', position: 'sticky', top: '0%', backgroundColor: 'white', zIndex: 10, borderRight: '1px solid rgba(0,0,0,0.05)', borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
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