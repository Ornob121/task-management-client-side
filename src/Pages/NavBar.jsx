import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logo from "../assets/taskLogo.png";

const NavBar = () => {
  const localDB = localStorage.getItem("database");
  // console.log(localDB);
  const [local, setLocal] = useState(false);
  useEffect(() => {
    if (localDB) {
      setLocal(true);
    }
  }, [localDB]);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <img src={logo} style={{ width: "150px" }} alt="" />
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue fs-5 text-decoration-none me-5"
                    : "me-5 text-black fs-5  text-decoration-none"
                }
              >
                My Tasks
              </NavLink>
              <NavLink
                to="/add-a-task"
                onClick={() => {
                  if (!local) {
                    localStorage.setItem("database", Math.random() * 1000000);
                    setLocal(true);
                  }
                }}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue fs-5 text-decoration-none me-5"
                    : "me-5 text-black fs-5  text-decoration-none"
                }
              >
                Add A Task
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
