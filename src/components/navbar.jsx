import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./navbar.css";

const Navigation = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => setIsNavbarOpen((prev) => !prev);
  const closeNavbar = () => setIsNavbarOpen(false);

  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/list", label: "Country List" },
    { to: "/population", label: "Population Chart" },
    { to: "/economy", label: "Economy" },
  ];

  return (
    <Navbar
      bg="transparent"
      expand="lg"
      expanded={isNavbarOpen}
      fixed="top"
      className={`navbar-custom ${isMobile ? "mobile-navbar" : ""}`}
    >
      <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
        Countries Information
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={handleToggle}
        className="navbar-toggler-custom"
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          {navItems.map((item) => (
            <Nav.Link
              key={item.to}
              as={Link}
              to={item.to}
              onClick={closeNavbar}
              className="nav-link-custom"
            >
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
