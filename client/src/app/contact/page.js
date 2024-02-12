// pages/contact.js
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="container my-5">
        <h1 className="mb-4">Contact Us</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>Get in Touch</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Contact Information</h2>
            <p>
              <strong>Address:</strong> Your Address Here
            </p>
            <p>
              <strong>Phone:</strong> Your Phone Number Here
            </p>
            <p>
              <strong>Email:</strong> Your Email Here
            </p>

            {/* Google Map */}
            <div
              className="map-container"
              style={{ height: "400px", width: "100%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.7112297771!2d-74.0636444917969!3d40.735657064588354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQ0JzAyLjQiTiA3NMKwMDMnNTUuMyJX!5e0!3m2!1sen!2sus!4v1589946645376!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
