import { Stack, Typography } from "@mui/material";
import Nav from "../../Components/Home/Nav";
import Post from "../../Components/Home/Post";
import Create_Post from "../../Components/Home/Create_Post";
import { useContext, useEffect, useState } from "react";
import New_comer_model from "../../Components/Home/New_comer.model";
import { AuthContext } from "../../Context/AuthContext.tsx";
import Alert from "../../Components/Home/Alert";

const Timeline = () => {
  const { from } = useContext(AuthContext)
  const [alert, setAlert] = useState('')
  const [timeoutId, setTimeoutId] = useState()
  const showAlert = (msg) => {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlert(msg)

    // Set a new timeout
    setTimeoutId(setTimeout(() => {
      setAlert('')
    }, 5000)
    )
  }
  useEffect(() => {
    if (from === "register") {
      showAlert('Welcome to twitter')
    } else if (from === "login") {
      showAlert('Welcome back')
    }
  }, [])
  return (
    <Stack sx={{ maxWidth: '600px', margin: 'auto', position: 'relative' }}>
      <Nav />
      <Create_Post />
      <Post />
      <New_comer_model />
      <Alert alert={alert} />

    </Stack>
  );
}

export default Timeline;