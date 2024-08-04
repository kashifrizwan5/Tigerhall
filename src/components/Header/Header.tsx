import React from "react";
import "./header.scss";
import searchIcon from "../../assets/searchIcon.svg";
import tigerhall from "../../assets/tigerhall.png";
import { SearchProps } from "../../utils/types";

export const Header: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <>
      <header>
        <div className="logo">
          <img src={tigerhall} alt="tigerhall" className="image" />
          <p>TigerHall</p>
        </div>
        <div className="search-wrapper">
          <div className="search-bar">
            <img src={searchIcon} alt="search" className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="signin"></div>
      </header>
    </>
  );
};
