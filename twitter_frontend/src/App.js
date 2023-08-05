import './App.css';

import Timeline from './Screens/Home/Timeline';
import Register from './Screens/Register/Register.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as React from 'react'
import { URL } from './utils/url';
import axios from 'axios'
import { AuthContext } from './Context/AuthContext.tsx';
import { Stack } from '@mui/material';
import { DataContext } from './Context/DataContext';
function App() {
  const { isAuthenticated, login, loading, setLoading } = React.useContext(AuthContext)
  const { set_user } = React.useContext(DataContext)

  React.useEffect(() => {
    const loaduser = async () => {
      const token = localStorage.getItem('twitter');
      if (token) {
        try {
          const res = await axios.get(`${URL}/user/loaduser`, {
            headers: {
              "x_auth": `${token}`
            }
          });
          if (res.data.success) {
            set_user(res.data.user)
            login();
          }
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loaduser()
  }, [])
  return (
    <>
      {loading ?
        <Stack sx={{ width: '100vw', height: '100vh', '&>svg': { width: "60px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } }}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-e65kyq r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
        </Stack>
        :
        <>
          {isAuthenticated
            ?
            <Router>
              <Routes>
                <Route path="/" element={<Timeline />}></Route>
              </Routes>
            </Router>
            :
            <Register />
          }
        </>
      }
    </>
  );
}

export default App;
