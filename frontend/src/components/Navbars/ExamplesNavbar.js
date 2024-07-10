import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//
import Cookies from "js-cookie";
// nodejs library that concatenates strings
import classnames from "classnames";
//
import axios from "axios";
import Swal from "sweetalert2";
// reactstrap components
import {
  Modal,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
  NavbarText,
} from "reactstrap";

//
import Loader from "loader/loader";
//

function ExamplesNavbar() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 299 || document.body.scrollTop > 299) {
        setNavbarColor("");
      } else if (document.documentElement.scrollTop < 300 || document.body.scrollTop < 300) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const [websiteName, setWebsiteName] = useState([]);
  const [websiteSocial, setWebsiteSocial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSocial, setLoadingSocial] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteName(response.data);
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

  const [isLoading, setIsLoading] = useState(false);

  const logoutSubmit = () => {
    setIsLoading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/customer-logout")
        .then(function (response) {
          if (response.data.status === 200) {
            Cookies.remove("auth_token_customer");

            setIsLoading(false);

            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.href = "/";
          }
        })
        .catch(function (error) {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };
  return (
    <>
      {isLoading && <Loader />}

      <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
        <Container>
          <div className="navbar-translate">
            {loading && (
              <NavbarBrand
                data-placement="bottom"
                to="/"
                title={websiteName.website_setting[0].value}
                tag={Link}
              >
                <img
                  src={BASE_URL + websiteName.website_setting[1].value}
                  alt={websiteName.website_setting[0].value}
                  title={websiteName.website_setting[0].value}
                  style={{
                    height: "80px",
                  }}
                />
              </NavbarBrand>
            )}

            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse,
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
            <Nav navbar>
              <NavItem className="inline-div">
                <NavLink to="/" tag={Link}>
                  <i className="nc-icon nc-bank " /> Home
                </NavLink>
              </NavItem>
              <NavItem className="inline-div">
                <NavLink to="/about-us" tag={Link}>
                  <i className="nc-icon nc-bullet-list-67" /> About us
                </NavLink>
              </NavItem>
              <NavItem className="inline-div">
                <NavLink to="/services" tag={Link}>
                  <i className="nc-icon nc-ambulance" /> Services
                </NavLink>
              </NavItem>
              <NavItem className="inline-div">
                <NavLink to="/contact-us" tag={Link}>
                  <i className="nc-icon nc-pin-3" /> Contact us
                </NavLink>
              </NavItem>

              {loadingSocial && websiteSocial[1].social_media_url && (
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href={websiteSocial[1].social_media_url}
                    target="_blank"
                    title="Follow us on Twitter"
                  >
                    <i className="fa fa-twitter" />
                    <p className="d-lg-none">Twitter</p>
                  </NavLink>
                </NavItem>
              )}

              {loadingSocial && websiteSocial[0].social_media_url && (
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href={websiteSocial[0].social_media_url}
                    target="_blank"
                    title="Like us on Facebook"
                  >
                    <i className="fa fa-facebook-square" />
                    <p className="d-lg-none">Facebook</p>
                  </NavLink>
                </NavItem>
              )}
              {loadingSocial && websiteSocial[2].social_media_url && (
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href={websiteSocial[2].social_media_url}
                    target="_blank"
                    title="Follow us on Instagram"
                  >
                    <i className="fa fa-instagram" />
                    <p className="d-lg-none">Instagram</p>
                  </NavLink>
                </NavItem>
              )}
              <NavbarText>
                {Cookies.get("auth_token_admin") ? (
                  <>
                    <Button to="/dashboard" tag={Link} className="btn-round" color="warning">
                      <i className="nc-icon nc-dashboard"></i> Dashboard
                    </Button>
                  </>
                ) : Cookies.get("auth_token_vendor") ? (
                  <>
                    <Button
                      to="/dashboard/profile"
                      tag={Link}
                      className="btn-round"
                      color="warning"
                    >
                      <i className="nc-icon nc-dashboard"></i>Vendor Profile
                    </Button>
                  </>
                ) : Cookies.get("auth_token_customer") ? (
                  <>
                    <Button to="/user-dashboard" tag={Link} className="btn-round" color="warning">
                      <i className="nc-icon nc-dashboard"></i> My Event page
                    </Button>
                    <Button
                      className="btn-round"
                      color="danger"
                      type="button"
                      onClick={toggleModal}
                    >
                      Logout
                    </Button>
                    <Modal isOpen={modal} toggle={toggleModal}>
                      <div className="modal-header">
                        <button
                          aria-label="Close"
                          className="close"
                          type="button"
                          onClick={toggleModal}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                        <h5 className="modal-title text-center" id="exampleModalLabel">
                          Logout
                        </h5>
                      </div>
                      <h3 className="modal-body text-center">Are you sure you want to logout?</h3>
                      <div className="modal-footer">
                        <div className="right-side">
                          <Button
                            className="btn-link"
                            color="default"
                            type="button"
                            onClick={logoutSubmit}
                            disabled={isLoading}
                          >
                            Yes
                          </Button>
                        </div>

                        <div className="right-side">
                          <Button
                            className="btn-link"
                            color="danger"
                            type="button"
                            onClick={toggleModal}
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </>
                ) : (
                  <>
                    <Button className="btn-round" to="/login" tag={Link} color="warning">
                      <i className="nc-icon nc-lock-circle-open"></i> Login
                    </Button>
                    <Button to="/register" tag={Link} className="btn-round" color="danger">
                      <i className="nc-icon nc-paper"></i> Register
                    </Button>
                  </>
                )}
              </NavbarText>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
