import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { URL } from "../../utils/url";
import axios from 'axios'
import { DataContext } from "../../Context/DataContext";
import { Stack, Typography } from "@mui/material";
const Post_List = () => {
  const { post_list, set_post_list } = useContext(DataContext)
  useEffect(() => {
    const loadposts = async () => {
      try {
        const res = await axios.get(`${URL}/user/get_posts`, {}, {
          headers: {
            'token': localStorage.getItem('twitter')
          }
        })
        if (res.data.success) {
          set_post_list(res.data.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  return (
    <>
      {post_list.length > 0 ?
        <>
          {post_list.map((item, index) => (
            <Post key={index} item={item} />
          ))}
        </>
        :
        <Stack>
          <Typography sx={{ textAlign: 'center', color: 'rgba(0,0,0,0.05)' }}>Nothing found!</Typography>
        </Stack>
      }
    </>
  );
}

export default Post_List;