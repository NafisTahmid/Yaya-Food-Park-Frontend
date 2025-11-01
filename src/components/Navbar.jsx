import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setToken } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import getAllCategories from "../hooks/getAllCategories";
import { FaShoppingCart } from "react-icons/fa";

function NavScrollExample() {
  const { user, token } = useSelector((store) => store.auth);

  const { foods } = useSelector((store) => store.food);
  getAllCategories();
  const { categories } = useSelector((store) => store.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast(response.data.message);
        dispatch(setAuthUser(null));
        dispatch(setToken(""));
        // window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <Navbar expand="lg" className="bg-danger">
      <Container>
        <Navbar.Brand href="/">Yaya Food Park</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>

            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              {/* Ensure you return the item in the map function */}
              {categories?.map((category) => (
                <NavDropdown.Item
                  href={`/category/${category._id}`}
                  key={category._id}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>

          <Navbar.Brand href="/cart" className="">
            <div className="ms-3 mb-1">
              <FaShoppingCart className="fs-3" />
            </div>
          </Navbar.Brand>

          {user ? (
            <div className="d-flex">
              <Button variant="dark" className="ms-2" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="dark" className="ms-2">
                Login
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
