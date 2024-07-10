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
import { Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history"; // Import createBrowserHistory
//
import Cookies from "js-cookie";

//
import { EmailPregMatch } from "general/emailpregmatch.js";
//
import axios from "axios";
import Swal from "sweetalert2";
// reactstrap components
import Loader from "loader/loader";
//
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Progress,
  UncontrolledTooltip,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  NavLink,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import SEO from "seo/seo.js";

const items = [
  {
    src: require("assets/img/aso-ebi.jpg"),
    altText: "eso-ebi",
    caption: "Eso-ebi",
  },
  {
    src: require("assets/img/photography.jpg"),
    altText: "photography",
    caption: "Photography",
  },
  {
    src: require("assets/img/catering.jpg"),
    altText: "catering",
    caption: "Catering",
  },
  {
    src: require("assets/img/baking.jpg"),
    altText: "baker",
    caption: "Baker",
  },
  {
    src: require("assets/img/event-planning.jpg"),
    altText: "event-planning",
    caption: "Event Planning",
  },
];

function LandingPage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

  const history = createBrowserHistory(); // Create a history object

  const [websiteName, setWebsiteName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [websiteSocial, setWebsiteSocial] = useState([]);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [props, setProps] = useState({});

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          if (response.data.status === 200) {
            setWebsiteName(response.data.website_setting);

            setProps({
              description: response.data.website_setting[3].value,
              name: response.data.website_setting[0].value,
              type: "website",
            });
            setLoading(true);
          }
        })
        .catch(function (error) {
          setLoading(false);
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

  const [inputFieldsMessage, setInputFieldsMessage] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [errorsMessage, setErrorsMessage] = useState({});
  const [submittingMessage, setSubmittingMessage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const handleChangeMessage = (e) => {
    const { name, value } = e.target;
    setInputFieldsMessage({ ...inputFieldsMessage, [name]: value });
  };

  const validateMessage = (inputValues) => {
    let errorsMessage = {};
    const regex = EmailPregMatch;

    if (inputValues.fullname.length < 3) {
      errorsMessage.fullname = "Enter a valid fullname";
    }

    if (!regex.test(inputValues.email)) {
      errorsMessage.email = "Enter a valid email address";
    }

    if (inputValues.message.length < 3 || inputValues.message.length > 1000) {
      errorsMessage.message = "Please enter a message. Message should not exceed 1000 characters";
    }

    return errorsMessage;
  };

  useEffect(() => {
    if (Object.keys(errorsMessage).length === 0 && submittingMessage) {
      finishSubmitMessage();
      setLoadingMessage(true);
    }
  }, [errorsMessage]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setErrorsMessage(validateMessage(inputFieldsMessage));
    setSubmittingMessage(true);
  };

  const finishSubmitMessage = () => {
    setLoadingMessage(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/send-message", inputFieldsMessage)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingMessage(false);
            setInputFieldsMessage({
              fullname: "",
              email: "",
              message: "",
            });
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingMessage(false);

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
      {loading && <SEO {...props} />}
      {loadingMessage && <Loader />}
      <ExamplesNavbar />
      <LandingPageHeader />
      {/* <SectionCarousel /> */}

      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">WHY USE OUR SERVICE</h2>
                <h5 className="description">
                  Victruth Limousine prides itself on delivering vast services to satisfy all of
                  your luxury needs with premium customer care. Our aim is to make your travels
                  secure, painless and on time. We provide extraordinary service with no aspect left
                  out. We have the experience and have grown into a prominent provider of luxury
                  transportation in Nigeria.
                </h5>
                <br />
                <NavLink to="/services" tag={Link}>
                  <Button className="btn-round" color="info">
                    See more Details
                  </Button>
                </NavLink>
              </Col>
            </Row>

            <div className="section section-light text-center">
              <Container>
                <Row id="lower-row">
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/weddings.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Weddings</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          We believe that the service you receive on your wedding day is just as
                          important as the wedding car you choose.
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/adult-parties.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Adult Parties</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          Birthdays are special and memorable moments to share with your family.
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/children-parties.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Children’s Parties</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          Parties in and around are very popular. Just imagine a posh limo pulling
                          up at your house or school
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/limo-cruise.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Limo Round-Town Cruise</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          Travel in style around town from the comfort of a chauffeured stretch limo
                          or a luxury car; perfect for a sightseeing tour
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/graduations.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Graduations</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          Hiring a limo for your school prom marks the occasion when your teenage
                          years transform into young adulthood.
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="card-profile card-plain">
                      <div className="card-avatar">
                        <a onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require("assets/img/faces/transfer.jpg")} />
                        </a>
                      </div>
                      <CardBody>
                        <a onClick={(e) => e.preventDefault()}>
                          <div className="author">
                            <CardTitle tag="h4">
                              <h5 className="card-category">Airport Transfer</h5>
                            </CardTitle>
                          </div>
                        </a>
                        <p className="card-description text-center">
                          Our airport transfers and business limo hire service is ideal for all
                          types of business travel.
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
        <div className="section section-dark text-center">
          <div className="section" id="vendor-section">
            <Container className="text-center">
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title">Do you want to become a service vendor?</h2>
                  <p className="description">
                    Are you into catering, cakes, event planning, hall decoration, supplies,
                    photography, Aso-ebi, printing, gifts and souvenirs, etc? <br />
                    Register now as a service vendor. <br />
                    Your services are required.
                  </p>
                  <div className="section pt-o vendor-carousel" id="carousel">
                    <Container>
                      <Row>
                        <Col className="ml-auto mr-auto" md="8">
                          <Card className="page-carousel">
                            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                              <CarouselIndicators
                                items={items}
                                activeIndex={activeIndex}
                                onClickHandler={goToIndex}
                              />
                              {items.map((item) => {
                                return (
                                  <CarouselItem
                                    onExiting={onExiting}
                                    onExited={onExited}
                                    key={item.src}
                                  >
                                    <img src={item.src} alt={item.altText} />
                                    <CarouselCaption captionText={item.caption} captionHeader="" />
                                  </CarouselItem>
                                );
                              })}
                              <a
                                className="left carousel-control carousel-control-prev"
                                data-slide="prev"
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  previous();
                                }}
                                role="button"
                              >
                                <span className="fa fa-angle-left" />
                                <span className="sr-only">Previous</span>
                              </a>
                              <a
                                className="right carousel-control carousel-control-next"
                                data-slide="next"
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  next();
                                }}
                                role="button"
                              >
                                <span className="fa fa-angle-right" />
                                <span className="sr-only">Next</span>
                              </a>
                            </Carousel>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Col>
                <Col className="ml-auto mr-auto download-area" md="5">
                  {!Cookies.get("auth_token_admin") &&
                    !Cookies.get("auth_token_vendor") &&
                    !Cookies.get("auth_token_customer") && (
                      <Link to="/vendor-register">
                        <Button className="btn-round" color="danger">
                          Vendor Register
                        </Button>
                      </Link>
                    )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="section section-light text-center section1">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Our Packages</h2>
                <br />
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col className="mx-auto" lg="6" md="6">
                <Card id="silver">
                  <Link
                    to={
                      !Cookies.get("auth_token_admin") &&
                      !Cookies.get("auth_token_vendor") &&
                      !Cookies.get("auth_token_customer") &&
                      "/register"
                    }
                  >
                    <img
                      alt="..."
                      className="img-rounded img-responsive"
                      src={require("assets/img/examples/silver.jpg")}
                      style={{ height: "200px" }}
                    />
                    <Progress max="100" value="25" barClassName="progress-bar-success" /> <br />
                    <Col>
                      <Button
                        className="btn-round mr-1"
                        color="danger"
                        type="button"
                        to="/register"
                      >
                        &#8358;300,000
                      </Button>
                      <span id="refund">+ a refundable deposit of</span>
                      <label className="label label-warning mr-1">
                        <b> &#8358;100,000</b>
                      </label>
                      <span id="note">
                        (Please note that payment for any damages will <br />
                        be deducted from your deposit if any).
                      </span>
                      <br />
                      <h5>
                        Duration: <b>8:00 am to 2:00 pm</b>
                      </h5>
                      <h5>
                        Extra:
                        <b>
                          1 bottle of Champagne or 1 bottle of wine
                          <br /> (Non-alcoholic wine available).
                          <br /> 2 soft drinks and 4 bottles of water.
                        </b>
                      </h5>
                      <br />
                      <label className="label label-primary mr-1"> For Additional hours</label>
                      <br /> <br />
                      <h5>
                        Additional hours: <b>&#8358;50,000.00 per hour</b>
                      </h5>
                      <h5>
                        Extra: <b>Prosecco Gold Bottle 750ml - &#8358;28,000</b>
                      </h5>
                      <h5>
                        Extra: <b>Prosecco Rose Bottle 750ml - &#8358;25,000</b>
                      </h5>
                      <br />
                    </Col>
                  </Link>
                </Card>
              </Col>
              <Col className="mx-auto" lg="6" md="6">
                <Card>
                  <Link
                    to={
                      !Cookies.get("auth_token_admin") &&
                      !Cookies.get("auth_token_vendor") &&
                      !Cookies.get("auth_token_customer") &&
                      "/register"
                    }
                  >
                    <img
                      alt="..."
                      className="img-rounded img-responsive"
                      src={require("assets/img/examples/gold.jpg")}
                      style={{ width: "200px" }}
                    />

                    <Progress max="100" value="25" barClassName="progress-bar-danger" />
                    <br />
                    <Col>
                      <Button
                        className="btn-round mr-1"
                        color="danger"
                        type="button"
                        to="/register"
                      >
                        &#8358;350,000
                      </Button>
                      <span id="refund">+ a refundable deposit of</span>
                      <label className="label label-warning mr-1"> &#8358;100,000</label>
                      <span id="note">
                        (Please note that payment for any damages will be
                        <br /> deducted from your deposit if any).
                      </span>
                      <br />

                      <h5>
                        Duration: <b>8:00 am to 3:00 pm</b>
                      </h5>
                      <h5>
                        Extra:
                        <b>
                          1 bottle of Champagne. 2 bottles of wine
                          <br /> (Non-alcoholic wine available).
                          <br /> 4 Soft drinks and 4 bottles of water.
                        </b>
                      </h5>
                      <br />
                      <label className="label label-primary mr-1"> For Additional hours</label>
                      <br />
                      <br />
                      <h5>
                        Additional hours: <b>&#8358;50,000.00 per hour</b>
                      </h5>
                      <h5>
                        Extra: <b>Prosecco Gold Bottle 750ml - &#8358;28,000</b>
                      </h5>
                      <h5>
                        Extra: <b>Prosecco Rose Bottle 750ml - &#8358;25,000</b>
                      </h5>
                      <br />
                    </Col>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center section2">
          <Container>
            <h2 className="title">
              We are the service vendors,
              <br />
              we are professionals.
            </h2>
            <Row>
              <Col md="12">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a>
                      <img alt="..." src={require("assets/img/faces/service-vendor.jpg")} />
                    </a>
                  </div>
                  <CardBody>
                    <a>
                      <div className="author">
                        <CardTitle tag="h4">Service Vendors</CardTitle>
                        <h6 className="card-category"></h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Our job is to make your event a success
                      <br />
                      We are Events Planning, Catering, Baking, Drink supply, Servers & Waiters,
                      Make-up,
                      <br /> Venues, Hall decoration, Photography, Aso-ebi, Printing, Souvenirs, etc
                      experts for you.
                    </p>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Col className="ml-auto mr-auto download-area" md="5">
                      <Link to="/vendor-register">
                        {!Cookies.get("auth_token_admin") &&
                          !Cookies.get("auth_token_vendor") &&
                          !Cookies.get("auth_token_customer") && (
                            <Button className="btn-round" color="success">
                              Hire Service Vendors
                            </Button>
                          )}
                      </Link>
                    </Col>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Message Us?</h2>
                <Form className="contact-form" onSubmit={handleSubmitMessage}>
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Name"
                          type="text"
                          name="fullname"
                          value={inputFieldsMessage.fullname}
                          onChange={handleChangeMessage}
                        />
                      </InputGroup>
                      <p className="text-tertiary" id="error-message">
                        <span>{errorsMessage.fullname}</span>
                      </p>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={inputFieldsMessage.email}
                          onChange={handleChangeMessage}
                        />
                      </InputGroup>
                      <p className="text-tertiary" id="error-message">
                        <span>{errorsMessage.email}</span>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Message</label>
                      <Input
                        placeholder="Tell us your queries, comments, thoughts, and feelings..."
                        type="textarea"
                        rows="4"
                        value={inputFieldsMessage.message}
                        onChange={handleChangeMessage}
                        name="message"
                      />
                      <p className="text-tertiary" id="error-message">
                        <span>{errorsMessage.message}</span>
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button
                        className="btn-fill"
                        color="danger"
                        size="lg"
                        disabled={loadingMessage}
                      >
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="section section-dark section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">About us</h2>
              <br />
              <p className="description">
                At Victruth Limo Ltd, We Are Committed To Providing Exceptional Services That Cater
                To Your Specific Needs. We Understand That Every Client Has Unique Requirements,
                Which Is Why We Offer A Wide Range Of Services To Meet Those Needs.
              </p>
              <br />
              {loading && websiteName[4].value && (
                <div className="typography-line" id="address">
                  <h6>ADDRESS:</h6>
                  <h6>{websiteName[4].value}</h6>
                </div>
              )}
              <Row className="justify-content-md-center sharing-area text-center">
                <Col className="text-center" lg="8" md="12">
                  <h3>Thank you for supporting us!</h3>
                </Col>

                <Col className="text-center" lg="8" md="12" id="text-center">
                  {loadingSocial && websiteSocial[1].social_media_url && (
                    <>
                      <Button
                        className="twitter-sharrre btn-round"
                        color="twitter-bg"
                        id="tooltip3373767"
                        href={websiteSocial[1].social_media_url}
                        target="_blank"
                      >
                        <i className="fa fa-twitter" /> Twitter
                      </Button>

                      <UncontrolledTooltip delay={0} target="tooltip3373767">
                        follow us!
                      </UncontrolledTooltip>
                    </>
                  )}

                  {loadingSocial && websiteSocial[0].social_media_url && (
                    <>
                      <Button
                        className="facebook-sharrre btn-round ml-2"
                        color="facebook-bg"
                        id="tooltip68961360"
                        href={websiteSocial[0].social_media_url}
                        target="_blank"
                      >
                        <i className="fa fa-facebook-square" /> Facebook
                      </Button>

                      <UncontrolledTooltip delay={0} target="tooltip68961360">
                        Like us!
                      </UncontrolledTooltip>
                    </>
                  )}

                  {loadingSocial && websiteSocial[2].social_media_url && (
                    <>
                      <Button
                        className="linkedin-sharrre btn-round  ml-2"
                        color="google-bg"
                        href={websiteSocial[2].social_media_url}
                        id="tooltip840791273"
                        target="_blank"
                      >
                        <i className="fa fa-instagram" /> Instagram
                      </Button>

                      <UncontrolledTooltip delay={0} target="tooltip840791273">
                        Follow us!
                      </UncontrolledTooltip>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <i className="nc-icon nc-time-alarm" />
                <i className="nc-icon nc-atom" />
                <i className="nc-icon nc-camera-compact" />
                <i className="nc-icon nc-watch-time" />
                <i className="nc-icon nc-key-25" />
                <i className="nc-icon nc-diamond" />
                <i className="nc-icon nc-user-run" />
                <i className="nc-icon nc-layout-11" />
                <i className="nc-icon nc-badge" />
                <i className="nc-icon nc-bulb-63" />
                <i className="nc-icon nc-favourite-28" />
                <i className="nc-icon nc-planet" />
                <i className="nc-icon nc-tie-bow" />
                <i className="nc-icon nc-zoom-split" />
                <i className="nc-icon nc-cloud-download-93" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;
