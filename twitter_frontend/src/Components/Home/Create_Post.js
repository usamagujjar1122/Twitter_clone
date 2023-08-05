import { Avatar, Stack, Input, InputTypography, IconButton, Box, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const Create_Post = () => {
  const handleTextareaChange = (event) => {
    const { target } = event;
    target.style.height = 'auto'; // Reset height to auto to correctly calculate new height
    target.style.height = `${target.scrollHeight}px`;
    // setTextareaValue(target.value);
  };
  return (
    <>
      <Stack sx={{ flexDirection: 'row', gap: '10px', border: "1px solid rgba(0,0,0,0.05)", padding: "10px 20px" }}>
        <Stack sx={{ flex: 1 }}>
          <Avatar >A</Avatar>
        </Stack>
        <Stack sx={{ flex: 12 }}>
          <Stack sx={{ flexDirection: 'column', alignItems: 'center', gap: '3px', }}>
            <textarea
              type="text"
              placeholder="What is happening?"
              onChange={handleTextareaChange}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                resize: 'none',
                fontSize: '1.25rem',
                fontFamily: "Chirp-Regular"
              }}
            />
            <Button
              sx={{
                backgroundColor: 'rgb(29, 155, 240)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                fontFamily: 'Chirp-Regular',
                borderRadius: '24px',
                alignSelf: 'end',
                '&:hover': {
                  backgroundColor: 'rgba(29, 155, 240,0.9)',
                }
              }}
              variant="contained"
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Create_Post;