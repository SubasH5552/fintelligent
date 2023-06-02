import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
const Header = ({ setActive, active }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <div className="logo">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <li
                  onClick={() => setActive("home")}
                  className={`nav-item nav-link ${
                    active === "home" ? "active" : ""
                  }`}
                  style={{
                    fontWeight: "bolder",
                    letterSpacing: 2,
                    fontSize: 22,
                  }}
                >
                  FINTELLIGENT
                </li>
                <Avatar alt="Fintelligent" src={logo} />
              </Link>
            </div>
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    onClick={() => setActive("create")}
                    className={`nav-item nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    Create
                  </li>
                </Link>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    onClick={() => setActive("about")}
                    className={`nav-item nav-link ${
                      active === "about" ? "active" : ""
                    }`}
                  >
                    About
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link to="/auth" style={{ textDecoration: "none" }}>
                    <li
                      onClick={() => setActive("auth")}
                      className={`nav-item nav-link ${
                        active === "auth" ? "active" : ""
                      }`}
                    >
                      Login
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;