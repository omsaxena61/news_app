import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Navbar = (props) => {
  const onSearch = async (searchTerm) => {
    localStorage.setItem("searchTerm", searchTerm);
    const url = `https://newsapi.org/v2/top-headlines?&apiKey=${props.apiKey}&q=${searchTerm}`;

    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setData(parsedata.articles, parsedata.totalResults);
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="#"
            style={{ fontSize: "40px", color: "cyan" }}
          >
            NewsBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ paddingLeft: "20%", paddingRight: "20%" }}
          >
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ fontSize: "25px" }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  style={{ color: "gold" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Business"
                  style={{ color: "gold" }}
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Entertainment"
                  style={{ color: "gold" }}
                >
                  {" "}
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/General"
                  style={{ color: "gold" }}
                >
                  {" "}
                  General
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Health"
                  style={{ color: "gold" }}
                >
                  {" "}
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Science"
                  style={{ color: "gold" }}
                >
                  {" "}
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Sports"
                  style={{ color: "gold" }}
                >
                  {" "}
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/Technology"
                  style={{ color: "gold" }}
                >
                  {" "}
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <SearchBar onSearch={onSearch} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
