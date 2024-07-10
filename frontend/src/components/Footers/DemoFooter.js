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
/*eslint-disable*/
import React, { useEffect, useState } from "react";
//
import axios from "axios";
//
import Swal from "sweetalert2";
//
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  const [loading, setLoading] = useState(false);
  const [websiteName, setWebsiteName] = useState([]);

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
    });
  }, []);

  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <i className="nc-icon nc-bank " />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="nc-icon nc-bullet-list-67" /> <Link to="/about-us">About us</Link>
              </li>
              <li>
                <i className="nc-icon nc-ambulance" /> <Link to="/services">Services</Link>
              </li>
              <li>
                <i className="nc-icon nc-pin-3" /> <Link to="/contact-us">Contact us</Link>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, {loading && websiteName[0].value}
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}
export default DemoFooter;
