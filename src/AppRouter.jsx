import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './page/Login'
import { Register } from './page/Register'
import { CreateActivity } from './components/CreateActivity'
import { SearchActivity } from './components/SearchActivity'
import { DeleteActivity } from './components/DeleteActivity'
import Home from '../page/home/Home'
// import { SearchUser } from './page/SearchUser'




function App() {


  return (
    <>
      <h1>Login/Register/Home</h1>
      <BrowserRouter>
      <Router>

      <div>
          {token && <div onClick={logout}>Cerrar sesión</div>}
          {!token && <Link to="/">Login</Link>}
          {token ? null : <Link to="/register">Register</Link>}
          {<Link to="/home">Home</Link>}
          {<Link to="/searchActivity">Search Activity</Link>}
          {<Link to="/createActivity">Create Activity</Link>}
          {<Link to="/deleteActivity">Delete Activity</Link>}
          {/* <Link to="/searchUser">Search User</Link> */}
      </div>

        <Routes>
          <Route path='/' element={ <Login/> } setToken={updateToken} />
          <Route path='/register' element={ <Register/> }/>
          <Route path='/home' element={ <Home/> } token={token}/>
          <Route path='/searchActivity' element={ <SearchActivity /> } token={token}/>
          <Route path='/createActivity' element={ <CreateActivity /> } token={token}/>
          <Route path='/deleteActivity' element={ <DeleteActivity /> } token={token}/>
          {/* <Route path='/searchUser' element={ <SearchUser /> } token={token}/> */}
       </Routes> 
       </Router>
      </BrowserRouter>
    </>
  )
}

export default App
