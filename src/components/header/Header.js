import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import "./header.css";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { photoUrl } = auth?.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${input}`);
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={handleToggleSidebar}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="icon"
        className="header__logo"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={23} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoUrl} alt="avatar" />
      </div>
    </div>
  );
};
export default Header;
