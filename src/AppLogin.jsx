import { useContext } from "react"
import backImage from './assets/backImage.png';

import Home from "../page/home/Home"
// import Create from "../src/page/Create.jsx"
// import Search from "../src/page/Search"
// import Profile from "../src/page/Profile"
import Login from "../src/page/Login"
import {LoginContext} from "../src/context/LoginContext"


const SuperLoader = () => {
  <div className="loader">
    <img alt="loader" className="loader-image" src={backImage}></img>
  </div>
}

const AppRouter = () => {
	const { loginState, checking } = useContext(LoginContext);
	if (checking) return <SuperLoader />;
	return loginState ? (
		<>
			<Home />
      {/* <Create />
      <Search />
      <Profile /> */}
		</>
	) : (
		<Login />
	);
};


export default AppRouter