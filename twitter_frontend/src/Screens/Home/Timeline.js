import { Stack } from "@mui/material";
import Nav from "../../Components/Home/Nav";
import Post from "../../Components/Home/Post";
import Create_Post from "../../Components/Home/Create_Post";

const Timeline = () => {
  return (
    <Stack sx={{ maxWidth: '600px', margin: 'auto' }}>
      <Nav />
      <Create_Post />
      <Post />
    </Stack>
  );
}

export default Timeline;