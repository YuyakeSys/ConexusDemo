<nav className="navbar navbar-expand-lg nav-green-background">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img
        src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e3933726-5fd7-43bf-9cfe-7b508d128121/Senpage+Consulting.png?format=1500w"
        alt="Senpage Consulting"
        style={{ height: "50px" }}
      />{" "}
      {/* Adjust the height as needed */}
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <div className="navbar-nav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Find us
            </a>
          </li>
        </ul>
      </div>
    </div>
    <ul className="navbar-nav justify-content-end ms-auto">
      {user ? (
        <>
          <li className="nav-item">
            <a className="nav-link" href={`/user/${user.id}`}>
              {user.email}
            </a>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link nav-link"
              onClick={handleUserLogout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <a className="btn btn-success" href="/user/login">
            Login
          </a>
        </li>
      )}
    </ul>
  </div>
</nav>
