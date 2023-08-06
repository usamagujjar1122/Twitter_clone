import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { URL } from "../../utils/url";
import axios from 'axios'
import { DataContext } from "../../Context/DataContext";
import { Stack, Typography } from "@mui/material";
import Spinner from "../Spinner/Spinner";
const Post_List = () => {
  const { post_list, set_post_list, new_posts, set_new_posts } = useContext(DataContext)
  const [is_fetching, set_is_fetching] = useState(false)
  let currentPage = 1
  const loadposts = async () => {
    try {
      set_is_fetching(true)
      const res = await axios.post(`${URL}/user/get_posts`, { currentPage, batchSize: 10 }, {
        headers: {
          'token': localStorage.getItem('twitter')
        }
      })
      if (res.data.success) {
        currentPage += 1
        if (res.data.posts.length < 10) {
          window.removeEventListener('scroll', scrolling)
        }
        set_post_list(prev => prev.concat(res.data.posts))
        set_is_fetching(false)

      }
    } catch (error) {
      console.log(error)
      set_is_fetching(false)
    }
  }

  const scrolling = async () => {
    const scrollContainer = document.documentElement;
    const scrollHeight = scrollContainer.scrollHeight;
    const scrollTop = scrollContainer.scrollTop;
    const clientHeight = scrollContainer.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      await loadposts();
    }
  };

  useEffect(() => {
    set_new_posts([])
    set_post_list([])
    loadposts()
  }, [])

  useEffect(() => {

    window.addEventListener('scroll', scrolling);

    return () => {
      window.removeEventListener('scroll', scrolling);
    };
  }, [])
  return (
    <>
      {post_list.length > 0 || new_posts.length > 0 ?
        <>
          <Stack sx={{ marginBottom: '20px' }}>
            <Stack sx={{ flexDirection: 'column-reverse' }}>
              {new_posts.map((item, index) => {
                console.log(index, item)
                return (
                  <Post key={index} item={item} />
                )
              }
              )}
            </Stack>
            {post_list.map((item, index) => (
              <Post key={index} item={item} />
            ))}
            {is_fetching && <Spinner style={{ width: "30px", height: '30px', margin: '20px auto' }} />}
          </Stack>
        </>
        :
        <Stack>
          <Typography sx={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', margin: '20px auto' }}>Nothing found!</Typography>
        </Stack>
      }
    </>
  );
}

export default Post_List;