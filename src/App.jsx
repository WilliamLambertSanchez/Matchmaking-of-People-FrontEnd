import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Logout } from "./components/Logout"
import { Create } from "./pages/Create"
import { Search } from "./pages/Search"
import { Profiles } from "./pages/Profile";
import { NotFound } from "./components/NotFound"
import { ProfilePage } from "./components/ProfilePages"

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
          <nav>
              {token && <Link to="/home">Home</Link>}
              {token && <Link to="/create">Create</Link>}
              {token && <Link to="/search">Search</Link>}
              {token && <Link to="/profile">Profile</Link>}
              {token && <Link to ="/logout">Logout</Link>}
              {!token && <Link to="/">Login</Link>}
              {!token && <Link to="/register">Register</Link>}
          </nav>

            <h1>Linker</h1>
            <h2>Discover. Connect. Grow.</h2>
          
            <Routes>
              
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/create" element={<Create token={token} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/" element={<Login setToken={updateToken} />} />
              
              <Route path="/users/:userId" element={<ProfilePage />} />
              <Route path="/profile" element={<Profiles token={token} />} />

              <Route path='*' element={<NotFound />} />
              
            </Routes>
        </BrowserRouter>
      </>
  );
};

export default App