import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './assets/login.css'

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Logout } from "./components/Logout"
import { Create } from "./pages/Create"
import { Search } from "./pages/Search"
import { NotFound } from "./components/NotFound"
import { UserProfile } from "./pages/UserProfile";
import { Users } from "./components/Users";
import { ActivityPage } from "./pages/ActivityPage";
import { UserProfileUsername } from "./pages/UserProfileUsername";

const App = () => {


  const [token, setToken] = useState('')

  const updateToken = (token) => {
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    setToken(token)
  }, [])

  // function ProfilePage() {
  //   // Get the userId param from the URL.
  //   let { userId } = useParams();
  //   // ...

  //   useEffect(() => {
  //     // fetch getUserId
  //   })
  // }

  return (
      <>
        <BrowserRouter>

              {/* {token && <Link to="/home">Home</Link>}
              {token && <Link to="/create">Create</Link>}
              {token && <Link to="/search">Search</Link>}
              {token && <Link to="/profile">Profile</Link>}
              {token && <Link to ="/logout">Logout</Link>} */}
              {/* {!token && <Link to="/">Login</Link>}
              {!token && <Link to="/register">Register</Link>} */}
              {/* {token && < Linker />}
              {!token && < Header />} */}
            <Routes>
              
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/create" element={<Create token={token} />} />
              <Route path="/search" element={<Search token={token} />} />
              <Route path="/" element={<Login setToken={updateToken} />} />
              
              <Route path="/users" element={<Users token={token}/>} />

                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="/u/:username" element={<UserProfileUsername />} />


              <Route path="/activity/:activityId" element={<ActivityPage />} />

              <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </>
  );
};

export default App