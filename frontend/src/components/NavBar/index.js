import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import { logout } from "../../store/reducers/session_reducer";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  const getLinks = () => {
    if (loggedIn) {
      return (
        <ul className="links-nav">
          <li>
            <Link to={"/posts"}>All Posts</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to={"/posts/new"}>Write a Post</Link>
          </li>
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="links-auth">
          <li>
            <Link className="login-button" to={"/login"}>
              Login/Signup
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      <header className="navbar">
        <p>
          <Link to="/posts" className="logo">
            GrowTeacher
          </Link>
        </p>
        {getLinks()}
      </header>
    </>
  );
}

export default NavBar;
