const Footers = () => {
  return (
    <footer className="bg-dark text-light mt-4 py-4">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Terms and Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <h5>About</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Policies
                </a>
              </li>
            </ul>
          </div>
          {/* Add more columns as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footers;
