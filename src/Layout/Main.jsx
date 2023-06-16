import { Outlet } from "react-router-dom";
import NavBar from "../Pages/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
