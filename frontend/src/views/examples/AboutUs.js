import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import SEO from "seo/seo.js";

function AboutUs() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const seoProps = { title: "About us" };

  return (
    <>
      <SEO {...seoProps} />

      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section section-dark section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12" id="about-us-heading">
              <h2 className="title">About us</h2>
              <p>Superior & Luxury Vehicles - With Quality Services</p>

              <p className="description">
                At Victruth Limo Ltd, We Are Committed To Providing Exceptional Services That Cater
                To Your Specific Needs. We Understand That Every Client Has Unique Requirements,
                Which Is Why We Offer A Wide Range Of Services To Meet Those Needs.
              </p>
              <br />
              <p>Skilled Staff</p>
              <p className="description">
                If You are Planning An Event, Our Experienced Team Can Assist You With Everything
                From Selecting The Right Vehicle To Coordinating The Logistics To Ensure That Your
                Event Runs Smoothly. Our Fleet Of Luxury Vehicles Is Equipped With The Latest
                Technology And Amenities To Provide You With A Comfortable And Stylish Ride.
              </p>
              <br />
              <p>Personalized Travel Packages</p>
              <p className="description">
                If You are Looking For A High-Class Travel Experience, Look No Further Than Victruth
                Limo Ltd. We Offer Personalized Travel Packages Tailored To Your Individual
                Preferences, So You Can Relax And Enjoy Your Journey In Style. Our Team Will Take
                Care Of All The Details To Ensure That Your Trip Is Stress-Free And Unforgettable.
              </p>
              <br />
              <p>Professional Chauffeurs</p>
              <p className="description">
                If You Need A Premium Ride Service For Any Occasion, We have Got You Covered. Our
                Professional Chauffeurs Are Highly Skilled And Trained To Provide You With A Safe,
                Comfortable, And Reliable Ride. With Our Attention To Detail And Commitment To
                Customer Satisfaction, You Can Trust Us To Provide You With The Best Possible
                Service.
              </p>
              <br />
              <p>Premium Experience</p>
              <p className="description">
                Thank You For Considering Victruth Limo Ltd For Your Transportation Needs. We Are
                Dedicated To Providing You With A Premium Experience That Exceeds Your Expectations.
                Contact Us Today To Learn More About Our Services And How We Can Assist You.
              </p>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/driver1.jpg")}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="icons-container">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/driver2.jpg")}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="icons-container">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/driver3.jpg")}
                  style={{ width: "100%" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <DemoFooter />
    </>
  );
}

export default AboutUs;
