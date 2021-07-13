import React from "react";
import { useDispatch } from "react-redux";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { logout } from "../../redux/actions/auth.action";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={handleToggleSidebar}
    >
      <ul>
        <Link to="/">
          <li>
            <MdHome size={23} />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/feed/subscriptions">
          <li>
            <MdSubscriptions size={23} />
            <span>Subscriptions</span>
          </li>
        </Link>

        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I Don't Know</span>
        </li>
        <hr />
        <li onClick={handleLogout}>
          <MdExitToApp size={23} />
          <span>Logout</span>
        </li>
        <hr />
      </ul>
    </nav>
  );
};
export default Sidebar;
