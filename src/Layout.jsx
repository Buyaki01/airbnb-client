import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./pages/Nav";

const Layout = () => {
  return(
    <div className="p-4 flex flex-col min-h-screen">
      <Header /> 
      <Nav />
      <Outlet/>
    </div>
  )
}

export default Layout
