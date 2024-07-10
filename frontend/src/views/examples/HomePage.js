import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Form,
  Table,
} from "reactstrap";

import SEO from "seo/seo.js";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
//
import axios from "axios";
import Swal from "sweetalert2";
//
import Loader from "loader/loader";
//

function ProfilePage() {
  const SILVER_PACKAGE = process.env.REACT_APP_SILVER_PACKAGE;
  const GOLD_PACKAGE = process.env.REACT_APP_GOLD_PACKAGE;
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

  //Lazily loading all user events

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const fetchEvents = async (page) => {
    try {
      // First, obtain the CSRF token by making a separate request
      await axios.get("/api/v1/sanctum/csrf-cookie");

      // Once you have the CSRF token, you can make the main API request
      const response = await axios.get(`/api/get-events?page=${page}`);

      if (response.data.status === 200) {
        const newEvents = response.data.user.data;
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        setCurrentPage(page);
        setHasMore(response.data.user.next_page_url !== null);
        setLoadingEvents(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An Error Occured!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    // Fetch initial events when the component mounts
    fetchEvents(currentPage);
  }, []); // Empty dependency array to run only on mount

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !loadingEvents) {
        const nextPage = currentPage + 1;
        fetchEvents(nextPage);
        setLoadingEvents(true);
      }
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingEvents) {
      const nextPage = currentPage + 1;
      fetchEvents(nextPage);
      setLoadingEvents(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loadingEvents, currentPage]);

  //

  //Lazily loading all user orders

  const [orders, setOrders] = useState([]);
  const [currentPageOrder, setCurrentPageOrder] = useState(1);
  const [hasMoreOrder, setHasMoreOrder] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchOrders = async (page) => {
    try {
      // First, obtain the CSRF token by making a separate request
      await axios.get("/api/v1/sanctum/csrf-cookie");

      // Once you have the CSRF token, you can make the main API request
      const response = await axios.get(`/api/get-orders?page=${page}`);

      if (response.data.status === 200) {
        const newOrders = response.data.user.data;
        setOrders((prevOrders) => [...prevOrders, ...newOrders]);
        setCurrentPageOrder(page);
        setHasMoreOrder(response.data.user.next_page_url !== null);
        setLoadingOrders(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An Error Occured!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    // Fetch initial orders when the component mounts
    fetchOrders(currentPage);
  }, []); // Empty dependency array to run only on mount

  const handleScrollOrder = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMoreOrder && !loadingOrders) {
        const nextPage = currentPage + 1;
        fetchOrders(nextPage);
        setLoadingOrders(true);
      }
    }
  };

  const handleLoadMoreOrder = () => {
    if (hasMoreOrder && !loadingOrders) {
      const nextPage = currentPage + 1;
      fetchOrders(nextPage);
      setLoadingOrders(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollOrder);
    return () => {
      window.removeEventListener("scroll", handleScrollOrder);
    };
  }, [hasMoreOrder, loadingOrders, currentPageOrder]);

  //This will get customer info
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/get-customer")
        .then(function (response) {
          if (response.data.status === 200) {
            setUser(response.data.user);
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

  //Ordering silver package

  const [loadingSilver, setLoadingSilver] = useState(false);

  const [inputFieldsSilver, setInputFieldsSilver] = useState({
    limo_ride: 0,
    event_planners: 0,
    caterers: 0,
    cakes: 0,
    drink_suppliers: 0,
    servers_waiters: 0,
    makeup_artists: 0,
    venues: 0,
    hall_decorators: 0,
    photographers_video: 0,
    aso_ebi: 0,
    printers: 0,
    souvenirs_gifts: 0,
    package_price: SILVER_PACKAGE,
  });

  const handleChangeSilver = (e) => {
    const { name, checked } = e.target;
    const valueToStoreSilver = checked ? 1 : 0;
    setInputFieldsSilver({ ...inputFieldsSilver, [name]: valueToStoreSilver });
  };

  const handleSubmitSilver = (e) => {
    e.preventDefault();

    // Check if all properties except 'package_price' are 0
    const areAllZero = Object.keys(inputFieldsSilver)
      .filter((key) => key !== "package_price")
      .every((key) => inputFieldsSilver[key] === 0);

    if (!areAllZero) {
      finishSubmitSilver();
    } else {
      // Handle the case where all other properties are 0
      // You can show an error message or take appropriate action here.
      Swal.fire({
        icon: "error",
        title: "Please select a service",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const finishSubmitSilver = () => {
    setLoadingSilver(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/order", inputFieldsSilver)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingSilver(false);
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              confirmButtonText: "OK", // Change the text of the "OK" button
            });
          } else if (response.data.status === true && response.data.payment_url) {
            setLoadingSilver(false);
            Swal.fire({
              icon: "success",
              title: "Continue?",
              showConfirmButton: true,
              confirmButtonText: "Order now",
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirect the user to the desired URL
                window.open(response.data.payment_url, "_blank");
              }
            });
          } else if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 6000,
            });
          }
        })
        .catch(function (error) {
          setLoadingSilver(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 6000,
          });
        });
    });
  };

  //Ordering Gold
  const [loadingGold, setLoadingGold] = useState(false);

  const [inputFieldsGold, setInputFieldsGold] = useState({
    limo_ride: 0,
    event_planners: 0,
    caterers: 0,
    cakes: 0,
    drink_suppliers: 0,
    servers_waiters: 0,
    makeup_artists: 0,
    venues: 0,
    hall_decorators: 0,
    photographers_video: 0,
    aso_ebi: 0,
    printers: 0,
    souvenirs_gifts: 0,
    package_price: GOLD_PACKAGE,
  });

  const handleChangeGold = (e) => {
    const { name, checked } = e.target;
    const valueToStore = checked ? 1 : 0;
    setInputFieldsGold({ ...inputFieldsGold, [name]: valueToStore });
  };

  const handleSubmitGold = (e) => {
    e.preventDefault();
    // Check if all properties except 'package_price' are 0
    const areAllZero = Object.keys(inputFieldsGold)
      .filter((key) => key !== "package_price")
      .every((key) => inputFieldsGold[key] === 0);

    if (!areAllZero) {
      finishSubmitGold();
    } else {
      // Handle the case where all other properties are 0
      // You can show an error message or take appropriate action here.
      Swal.fire({
        icon: "error",
        title: "Please select a service",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const finishSubmitGold = () => {
    setLoadingGold(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/order", inputFieldsGold)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingGold(false);
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              confirmButtonText: "OK", // Change the text of the "OK" button
            });
          } else if (response.data.status === true && response.data.payment_url) {
            setLoadingGold(false);
            Swal.fire({
              icon: "success",
              title: "Continue?",
              showConfirmButton: true,
              confirmButtonText: "Order now",
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirect the user to the desired URL
                window.open(response.data.payment_url, "_blank");
              }
            });
          } else if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 6000,
            });
          }
        })
        .catch(function (error) {
          setLoadingGold(false);
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 6000,
          });
        });
    });
  };

  const seoProps = {
    title: "Home",
    name: "Home",
    type: "website",
  };

  return (
    <>
      <SEO {...seoProps} />

      {loadingGold && <Loader />}
      {loadingSilver && <Loader />}
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/event.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                {loading && user.fullname} <br />
              </h4>
              <h6 className="description"> {loading && user.email}</h6>
              <h6 className="description">{loading && user.phone} </h6>
            </div>
          </div>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : null}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Order Gold package
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : null}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Order Silver package
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : null}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    My Ordered services
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "4" ? "active" : null}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Completed Limo services
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane className="text-center" tabId="1" id="following">
              <h3 className="text-muted">
                Select gold package and <br />
                other services you will need
              </h3>
              {/* <Button className="btn-round" color="warning">
                Find artists
              </Button> */}
              <Form onSubmit={handleSubmitGold}>
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                      <li>
                        <Row>
                          <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/examples/gold.jpg")}
                            />
                          </Col>
                          <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                            <h3>
                              Gold Package (₦350,000) <br />
                              <small>
                                + a refundable deposit of ₦100,000 (Please note that payment for any
                                damages will be deducted from your deposit if any).
                              </small>
                              <br />
                              <hr />
                              <small>
                                <b>Duration:</b> 8:00 am to 3:00 pm
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> 1 bottle of Champagne or 1 bottle of wine
                                (Non-alcoholic wine available). <br />4 soft drinks and 4 bottles of
                                water.
                              </small>
                              <br />
                              <hr />
                              <small>
                                <b>FOR ADDITIONAL HOURS</b>
                              </small>
                              <br />
                              <small>
                                <b>Additional hours:</b> ₦50,000.00 per hour
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> Prosecco Gold Bottle 750ml - ₦28,000{" "}
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> Prosecco Rose Bottle 750ml - ₦25,000
                              </small>
                            </h3>
                          </Col>

                          <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.limo_ride}
                                  onChange={handleChangeGold}
                                  name="limo_ride"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <Input type="hidden" value={GOLD_PACKAGE} name="package_price" />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Event planners <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.event_planners}
                                  onChange={handleChangeGold}
                                  name="event_planners"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Caterers <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.caterers}
                                  onChange={handleChangeGold}
                                  name="caterers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>Cakes</h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.cakes}
                                  onChange={handleChangeGold}
                                  name="cakes"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>Drink Suppliers</h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.drink_suppliers}
                                  onChange={handleChangeGold}
                                  name="drink_suppliers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Servers/Waiters <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.servers_waiters}
                                  onChange={handleChangeGold}
                                  name="servers_waiters"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Make-up Artists
                              <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.makeup_artists}
                                  onChange={handleChangeGold}
                                  name="makeup_artists"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Venues <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.venues}
                                  onChange={handleChangeGold}
                                  name="venues"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Hall Decorators <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.hall_decorators}
                                  onChange={handleChangeGold}
                                  name="hall_decorators"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Photographers and Video
                              <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.photographers_video}
                                  onChange={handleChangeGold}
                                  name="photographers_video"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Aso-Ebi <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.aso_ebi}
                                  onChange={handleChangeGold}
                                  name="aso_ebi"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Printers <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.printers}
                                  onChange={handleChangeGold}
                                  name="printers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Souvenirs and Gifts <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsGold.souvenirs_gifts}
                                  onChange={handleChangeGold}
                                  name="souvenirs_gifts"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                    </ul>
                    <Button className="btn-round" color="warning" disabled={loadingGold}>
                      Order now
                    </Button>
                  </Col>
                </Row>
              </Form>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h3 className="text-muted">
                Select silver package and <br />
                other services you will need
              </h3>
              {/* <Button className="btn-round" color="warning">
                Find artists
              </Button> */}
              <Form onSubmit={handleSubmitSilver}>
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                      <li>
                        <Row>
                          <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/examples/silver.jpg")}
                            />
                          </Col>
                          <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                            <h3>
                              Silver Package (₦300,000) <br />
                              <small>
                                + a refundable deposit of ₦100,000 (Please note that payment for any
                                damages will be deducted from your deposit if any).
                              </small>
                              <br />
                              <hr />
                              <small>
                                <b>Duration:</b> 8:00 am to 2:00 pm
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> 1 bottle of Champagne or 1 bottle of wine
                                (Non-alcoholic wine available). <br />2 soft drinks and 4 bottles of
                                water.
                              </small>
                              <br />
                              <hr />
                              <small>
                                <b>FOR ADDITIONAL HOURS</b>
                              </small>
                              <br />
                              <small>
                                <b>Additional hours:</b> ₦50,000.00 per hour
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> Prosecco Gold Bottle 750ml - ₦28,000
                              </small>
                              <br />
                              <small>
                                <b>Extra:</b> Prosecco Rose Bottle 750ml - ₦25,000
                              </small>
                            </h3>
                          </Col>

                          <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.limo_ride}
                                  onChange={handleChangeSilver}
                                  name="limo_ride"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <Input type="hidden" value={SILVER_PACKAGE} name="package_price" />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Event planners <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.event_planners}
                                  onChange={handleChangeSilver}
                                  name="event_planners"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Caterers <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.caterers}
                                  onChange={handleChangeSilver}
                                  name="caterers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>Cakes</h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.cakes}
                                  onChange={handleChangeSilver}
                                  name="cakes"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>Drink Suppliers</h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.drink_suppliers}
                                  onChange={handleChangeSilver}
                                  name="drink_suppliers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Servers/Waiters <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.servers_waiters}
                                  onChange={handleChangeSilver}
                                  name="servers_waiters"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Make-up Artists
                              <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.makeup_artists}
                                  onChange={handleChangeSilver}
                                  name="makeup_artists"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Venues <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.venues}
                                  onChange={handleChangeSilver}
                                  name="venues"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Hall Decorators <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.hall_decorators}
                                  onChange={handleChangeSilver}
                                  name="hall_decorators"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Photographers and Video
                              <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.photographers_video}
                                  onChange={handleChangeSilver}
                                  name="photographers_video"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Aso-Ebi <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.aso_ebi}
                                  onChange={handleChangeSilver}
                                  name="aso_ebi"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Printers <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.printers}
                                  onChange={handleChangeSilver}
                                  name="printers"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      <li>
                        <Row>
                          <Col className="mx-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/event.jpg")}
                            />
                          </Col>
                          <Col lg="7" md="4" xs="4">
                            <h6>
                              Souvenirs and Gifts <br />
                            </h6>
                          </Col>
                          <Col lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  type="checkbox"
                                  value={inputFieldsSilver.souvenirs_gifts}
                                  onChange={handleChangeSilver}
                                  name="souvenirs_gifts"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                    </ul>
                    <Button className="btn-round" color="warning" disabled={loadingSilver}>
                      Order now
                    </Button>
                  </Col>
                </Row>
              </Form>
            </TabPane>

            <TabPane className="text-center" tabId="3" id="following">
              <h3 className="text-muted">
                My Ordered Services <br />
              </h3>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Services ordered</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => {
                    // Filter the properties with a value of 1 and remove underscores
                    const selectedProperties = Object.keys(event)
                      .filter((property) => event[property] === "1" && property !== "created_at")
                      .map((property) => property.replace("_", " "));

                    return (
                      <tr key={event.created_at}>
                        <th scope="row">{index + 1}</th>
                        <td>{selectedProperties.join(", ")}</td>
                        <td>{event.created_at}</td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Render Load More button */}
                {loadingEvents ? "Loading..." : ""}
                {hasMore && !loadingEvents && (
                  <Button className="btn-round" color="success" onClick={handleLoadMore}>
                    Load More
                  </Button>
                )}
              </Table>
            </TabPane>

            <TabPane className="text-center" tabId="4" id="following">
              <h3 className="text-muted">
                Completed Limo Services <br />
              </h3>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reference</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    // Filter the properties with a value of 1 and remove underscores

                    return (
                      <tr key={order.created_at}>
                        <th scope="row">{index + 1}</th>
                        <th>{order.reference}</th>
                        <td>₦{order.price.toLocaleString()}</td>
                        <td>{order.created_at}</td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Render Load More button */}
                {loadingEvents ? "Loading..." : ""}
                {hasMoreOrder && !loadingOrders && (
                  <Button className="btn-round" color="success" onClick={handleLoadMoreOrder}>
                    Load More
                  </Button>
                )}
              </Table>
            </TabPane>
          </TabContent>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
