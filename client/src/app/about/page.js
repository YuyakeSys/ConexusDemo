// pages/about-us.js
import Head from "next/head";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className="container my-5">
        <h1 className="mb-4">About Us</h1>

        {/* Meet Our Core Members */}
        <section className="my-5">
          <h2>Meet Our Core Members</h2>
          <div className="row">
            {/* Repeat this structure for each member */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="/path-to-member-image.jpg"
                  className="card-img-top"
                  alt="Member Name"
                />
                <div className="card-body">
                  <h5 className="card-title">Member Name</h5>
                  <p className="card-text">Short bio or role description.</p>
                </div>
              </div>
            </div>
            {/* End of Member Structure */}
          </div>
        </section>

        {/* Meet Our Consultants */}
        <section className="my-5">
          <h2>Meet Our Consultants</h2>
          <div className="row">
            {/* Repeat this structure for each consultant */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="/path-to-consultant-image.jpg"
                  className="card-img-top"
                  alt="Consultant Name"
                />
                <div className="card-body">
                  <h5 className="card-title">Consultant Name</h5>
                  <p className="card-text">Short bio or role description.</p>
                </div>
              </div>
            </div>
            {/* End of Consultant Structure */}
          </div>
        </section>

        {/* Add more sections as needed */}
      </div>
    </>
  );
}
