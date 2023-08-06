import { Avatar, Stack, Typography, IconButton, Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios'
import { URL } from "../../utils/url";
const Post = ({ item }) => {
  const like = async () => {
    // set_follow_in_process(true)
    try {
      const res = await axios.post(`${URL}/user/like`, { like_it: item._id }, {
        headers: {
          'token': localStorage.getItem('twitter')
        }
      })
      if (res.data.success) {
      } else {

      }
    } catch (error) {
    }
  }
  return (
    <>
      <Stack sx={{ flexDirection: 'row', gap: '10px', border: "1px solid rgba(0,0,0,0.05)", padding: "10px 20px" }}>
        <Stack sx={{ flex: 1 }}>
          <Avatar>A</Avatar>
        </Stack>
        <Stack sx={{ flex: 12 }}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '3px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Elon Musk</Typography>
            <svg style={{ width: '16px', fill: 'rgb(29, 155, 240)' }} viewBox="0 0 22 22" aria-label="Verified account" role="img" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" data-testid="icon-verified"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
            <Typography sx={{ color: "rgba(0,0,0,0.5)" }}>@elonmusk</Typography>
            <FiberManualRecordIcon sx={{ width: '2px', color: "rgba(0,0,0,0.65)" }} />
            <Typography sx={{ color: "rgba(0,0,0,0.5)" }}>10h</Typography>
          </Stack>
          <Stack>
            <Typography sx={{ textAlign: 'start', color: 'rgba(0,0,0,0.65)' }}>
              {item.msg}
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            <IconButton
              sx={{
                poaddingLeft: '0px',
                '&:hover': {
                  backgroundColor: 'rgba(256,0,0,0.1)',
                  color: "red"
                }
              }}
              onClick={like}
            >
              <FavoriteBorderIcon
                sx={{
                  fontSize: '16px',
                }}
              />
            </IconButton>
            <Typography sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.65)' }}>{item.likes.length > 0 && item.likes.length}</Typography>
          </Stack>
        </Stack>
      </Stack >
    </>
  );
}

export default Post;