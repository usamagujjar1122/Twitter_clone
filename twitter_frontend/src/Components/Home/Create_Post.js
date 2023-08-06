import { Avatar, Stack, Button, } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import axios from "axios";
import { URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";
const Create_Post = ({ showAlert }) => {
  const navigate = useNavigate()
  const { user, set_new_posts } = useContext(DataContext)
  const [post, setpost] = useState('')
  const [in_process, set_in_process] = useState(false)
  const handleTextareaChange = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setpost(event.target.value);
  };
  const handleclick = async () => {
    set_in_process(true)
    try {
      const res = await axios.post(`${URL}/user/create_post`, { post }, {
        headers: {
          "token": `${localStorage.getItem('twitter')}`
        }
      })
      if (res.data.success) {
        let new_post = []
        new_post.push(res.data.post)
        new_post[0].user = [user]
        set_new_posts(prev => prev.concat(new_post))
        setpost('')
        showAlert("Tweet posted!")
        set_in_process(false)

      } else {
        showAlert(res.data.message)
        set_in_process(false)
      }
    } catch (error) {
      showAlert(error.response.data.message)
      set_in_process(false)
    }
  }
  return (
    <>
      {user &&

        <Stack sx={{ flexDirection: 'row', gap: '10px', border: "1px solid rgba(0,0,0,0.05)", backgroundColor: in_process && 'rgba(0,0,0,0.05)', padding: "10px 20px" }}>
          <Stack sx={{ flex: 1 }}>
            <Avatar sx={{ cursor: 'pointer' }} onClick={() => { navigate(`/${user._id}`) }}>{user.name.charAt(0)}</Avatar>
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
                  fontFamily: "Chirp-Regular",
                }}
                readOnly={in_process}
                value={post}
              />
              <Button
                disabled={!post || in_process}
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
                  },
                  '&[disabled]': {
                    backgroundColor: 'rgba(29, 155, 240,0.5)',
                    color: 'white'
                  }
                }}
                variant="contained"
                onClick={handleclick}
              >
                Post
              </Button>
            </Stack>
          </Stack>
        </Stack >
      }
    </>
  );
}

export default Create_Post;