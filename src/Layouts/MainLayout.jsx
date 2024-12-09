import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import "../style/Navbar.css"; 

const MainLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <header
        className={`navbar-container ${showNavbar ? "navbar-show" : "navbar-hide"}`}
      >
        <nav className="navbar navbar-expand-lg fixed-navbar">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div></div>
            <a className="navbar-brand " href="/">
              <img
                src="/Free.png"
                alt="Logo"
                className="navbar-logo"
              />
            </a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/landing">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">About Us</Link>
                </li>
               
              </ul>
            </div>
          </div>

          {/* إضافة رابط "محاكاة مقابلات العمل" في المنتصف */}
          <div className="navbar-center">
            <Link className="nav-link" to="/">محاكاة مقابلات العمل</Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      {/* Footer */}
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/Free.png" alt="Logo" className="footer-logo-img" />
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          {/* <div className="footer-social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}

          {/* حقوق النشر */}
          {/* <div className="footer-rights">
            <p>© 2024 جميع الحقوق محفوظة</p>
          </div>
        </div> */}
      {/* </footer> */}
      <footer
  className="text-center"
  style={{
    backgroundColor: " rgba(1, 6, 40, 0.851)",
    color: "#fff",
    padding: "20px 0",
    fontSize: "14px",
  }}
>
  <div className="container p-4">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src="/Free.png"
          height={50}
          width={50}
          alt="Logo"
          style={{ borderRadius: "10px", marginBottom: "10px" }}
        />
        <p
          style={{
            fontSize: "16px",
            color: "#ccc",
            marginBottom: "10px",
            lineHeight: "1.5",
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          Prepare for your professional journey with AI-driven interview
          guidance.
        </p>
      </div>

      <section style={{ textAlign: "center", marginTop: "10px" }}>
        <div>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>
    </div>

    <div
      className="text-center p-2"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        fontSize: "14px",
        marginTop: "10px",
      }}
    >
      © 2024 Smart Interview. All rights reserved
    </div>
  </div>
</footer>
    </>
  );
};

export default MainLayout;
