import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/reducers/session_reducer";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/posts"}>All Posts</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/posts/new"}>Write a Post</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  };

  return (
    <>
      <div className="NavBar">
        <Link to={'/'}>Home</Link>
        {getLinks()}
      </div>
    </>
  );
}

export default NavBar;