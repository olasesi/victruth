/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
//
import axios from "axios";
import Swal from "sweetalert2";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import SEO from "seo/seo.js";

function ContactUs() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const [websiteName, setWebsiteName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [websiteSocial, setWebsiteSocial] = useState([]);
  const [loadingSocial, setLoadingSocial] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteName(response.data.website_setting);
            setLoading(true);
          }
        })
        .catch(function (error) {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      await axios
        .get("/api/show-social-media")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteSocial(response.data.social_media);
            setLoadingSocial(true);
          }
        })
        .catch(function (error) {
          setLoadingSocial(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  const seoProps = {
    title: "Contact us",
    name: "Contact us",
    type: "website",
  };
  return (
    <>
      <SEO {...seoProps} />

      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section section-dark section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12" id="contact-heading">
              <h2 className="title">Contact us</h2>
              {loading && websiteName[4].value && (
                <>
                  <p>Address</p>
                  <p className="description">{websiteName[4].value}</p>
                </>
              )}
              <br />

              {loading && (websiteName[5].value || websiteName[6].value) && (
                <>
                  <p>Email(s)</p>
                  <p className="description">
                    {websiteName[5].value}
                    <br />
                    {websiteName[6].value}
                  </p>
                </>
              )}

              <br />

              {loading && (websiteName[7].value || websiteName[8].value) && (
                <>
                  <p>Phone number(s)</p>
                  <p className="description">
                    {websiteName[7].value}
                    <br />
                    {websiteName[8].value}
                  </p>
                </>
              )}

              <br />

              {loadingSocial &&
                (websiteSocial[0].social_media_url ||
                  websiteSocial[1].social_media_url ||
                  websiteSocial[2].social_media_url ||
                  websiteSocial[3].social_media_url) && (
                  <>
                    <p>Social media</p>
                    <p className="description">
                      {websiteSocial[0].social_media_url}
                      <br />
                      {websiteSocial[1].social_media_url}
                      <br />
                      {websiteSocial[2].social_media_url}
                      <br />
                      {websiteSocial[3].social_media_url}
                    </p>
                  </>
                )}
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/examples/contact1.jpg")}
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

export default ContactUs;
