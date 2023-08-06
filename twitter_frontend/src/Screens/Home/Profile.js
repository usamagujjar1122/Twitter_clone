import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Post from '../../Components/Home/Post';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { URL } from '../../utils/url';
import axios from 'axios'
import Spinner from '../../Components/Spinner/Spinner';
import { DataContext } from '../../Context/DataContext';
const Profile = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user, set_user } = useContext(DataContext)
  const [profile, setprofile] = useState()
  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(true)
  const [joined, setjoined] = useState('')
  const [follow_in_process, set_follow_in_process] = useState(false)
  const [in_process, set_in_process] = useState(true)

  const follow = async () => {
    set_follow_in_process(true)
    try {
      const res = await axios.post(`${URL}/user/follow`, { follow_him: profile._id }, {
        headers: {
          'token': localStorage.getItem('twitter')
        }
      })
      if (res.data.success) {
        set_user(res.data.user)
        setprofile(res.data.profile)
        set_follow_in_process(false)
      } else {
        set_follow_in_process(false)

      }
    } catch (error) {
      set_follow_in_process(false)
    }
  }
  useEffect(() => {
    const getprofile = async () => {
      try {
        const res = await axios.get(`${URL}/user/${id}`, {}, {
          headers: {
            'token': localStorage.getItem('twitter')
          }
        })
        if (res.data.success) {
          console.log(res.data)
          const date = new Date(res.data.user.createdAt).toString()
          const createdAt = date.slice(4, 7) + ' ' + date.slice(11, 15)
          setjoined(createdAt)
          setposts(res.data.posts)
          setprofile(res.data.user)
          set_in_process(false)
          setloading(false)
        } else {
          set_in_process(false)
          setloading(false)
        }
      } catch (error) {
        set_in_process(false)
        setloading(false)
      }
    }
    getprofile()
  }, [])
  return (
    <>
      {loading && <Stack sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', '& div': { width: '30px', height: "30px" } }}>
        <Spinner />
      </Stack>
      }
      {!loading && profile && !in_process &&
        <Stack sx={{ maxWidth: '600px', margin: 'auto' }}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '10px', }}>
            <IconButton onClick={() => navigate('/')}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Stack>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{profile.name}</Typography>
              <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>{posts.length} tweets</Typography>
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
              <Typography sx={{ fontSize: '30px' }}>{profile.name.charAt(0)}</Typography>
            </Avatar>
          </Stack>
          <Stack sx={{ position: 'relative', padding: '10px', gap: '10px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            {profile._id !== user._id &&
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
                  border: "1px solid rgba(0,0,0,0.5)",

                  '&:hover': {
                    backgroundColor: 'rgb(0,0,0,0.8)',
                  },
                  '&[disabled]': {
                    backgroundColor: 'rgb(0,0,0,)',
                    color: 'white'

                  },
                }}
                disabled={follow_in_process}
                onClick={follow}
              >
                {/* {!follow_in_process ? */}
                <Typography sx={{ fontSize: { xs: "14px", md: '16px' } }}>
                  {user.following.includes(profile._id) ?
                    "Following"
                    :
                    "Follow"
                  }
                </Typography>
                {/* :
                  <Spinner style={{ width: '14px', height: '14px', margin: '2px 10px' }} />
                } */}
              </Button>
            }
            <Stack sx={{ marginTop: { xs: "8.5vw", sm: "7.5vw", md: '5vw' } }}>
              <Typography sx={{ textAlign: 'start', fontWeight: 'bold', fontSize: '1.1rem' }}>{profile.name}</Typography>
              <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.7)", lineHeight: 0.8 }}>@{profile.username}</Typography>
            </Stack>
            <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>Blades of Glory (dummy)</Typography>
            <Stack direction={"row"} sx={{ gap: '4px', alignItems: "center" }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: "14px", color: "rgba(0,0,0,0.6)", }} />
              <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
                Joined {joined}
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ gap: "6px" }}>
              <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)", }}><span style={{ fontWeight: 'bold', color: 'black' }}>{profile.following.length}</span> Following</Typography>
              <Typography sx={{ textAlign: 'start', fontSize: "14px", color: "rgba(0,0,0,0.6)", }}><span style={{ fontWeight: 'bold', color: 'black' }}>{profile.followers.length}</span> Followers</Typography>
            </Stack>
          </Stack >
          <Stack sx={{ marginBottom: '20px' }}>
            {posts.length > 0 ?
              <>
                {
                  posts.map((item, index) => (
                    <Post item={item} key={index} />
                  ))
                }
              </>
              :

              <Typography sx={{ textAlign: 'center', marginTop: '10px', color: 'rgba(0,0,0,0.5)' }}>No posts yet!</Typography>}
          </Stack>
        </Stack >
      }
      {!loading && !in_process && !profile &&
        <Stack sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          color: 'rgba(0,0,0,0.95)',
          fontWeight: 'bold',
          fontSize: { xs: "1.15rem", md: '1.25rem' }
        }}>
          <Typography>
            404 Not Found!
          </Typography>
        </Stack>
      }
    </>
  );
}

export default Profile;