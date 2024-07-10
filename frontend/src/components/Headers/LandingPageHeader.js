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
import { Link, Element, Events, animateScroll as scroll } from "react-scroll";
import axios from "axios";
// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  Form,
  CardBody,
  CardFooter,
  CardTitle,
} from "reactstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// const items = [
//   {
//     src: require("assets/img/soroush-karimi.jpg"),
//     altText: "Somewhere",
//     caption: "Somewhere",
//   },
// ];

function LandingPageHeader() {
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
    const nextIndex = activeIndex === 3 - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? 3 - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform = "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const [websiteName, setWebsiteName] = useState("");
  const [chooseSlides, setChooseSlides] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-appearance")
        .then(function (response) {
          if (response.data.status === 200) {
            setChooseSlides(
              response.data.appearance.filter((item) => item.id >= 4 && item.id <= 6)
            );
            setWebsiteName(response.data.appearance);

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
    <>
      <div ref={pageHeader}></div>
      {loading && (
        <Card className="page-carousel">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
              items={chooseSlides}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {chooseSlides.map((item) => {
              return (
                <CarouselItem onExiting={onExiting} onExited={onExited} key={item.name}>
                  <img src={BASE_URL + item.value} alt={item.name} />

                  {
                    <CarouselCaption
                      captionText={websiteName[0].value}
                      captionHeader={websiteName[1].value}
                    />
                  }
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
      )}
      {loading && (
        <div className="section section-dark text-center section2" id="slider-to-section">
          <Container>
            <div className="motto text-center" id="motto_id">
              {/* <h1>{websiteName[0].value}</h1>
              <h3>{websiteName[1].value}</h3>
              <h3>{websiteName[2].value}</h3> */}

              <br />
              <div className="section landing-section" style={{ backgroundColor: "transparent" }}>
                <Col className="ml-auto mr-auto" md="8">
                  <Form className="contact-form">
                    <Row>
                      <Col className="ml-auto mr-auto" md="4">
                        <Link to="section1" smooth={true} duration={500}>
                          <Button className="btn-fill" color="info" size="lg" id="hire_now">
                            Hire a Limo now!!!
                          </Button>
                        </Link>
                        <span id="or">Or</span>
                        <Link to="vendor-section" smooth={true} duration={500}>
                          <Button className="btn-fill" color="success" size="lg" id="hire_now">
                            Hire a Vendor!!!
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </div>
            </div>
          </Container>
        </div>
      )}
      {/* <Container>
                <div className="motto text-center" id="motto_id">
                  <h1>{websiteName[0].value}</h1>
                  <h3>{websiteName[1].value}</h3>
                  <h3>{websiteName[2].value}</h3>

                  <br />
                  <div
                    className="section landing-section"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Col className="ml-auto mr-auto" md="8">
                      <Form className="contact-form">
                        <Row>
                          <Col className="ml-auto mr-auto" md="4">
                            <Link to="section1" smooth={true} duration={500}>
                              <Button className="btn-fill" color="info" size="lg" id="hire_now">
                                Hire a Limo now!!!
                              </Button>
                            </Link>
                            <span id="or">Or</span>
                            <Link to="section2" smooth={true} duration={500}>
                              <Button className="btn-fill" color="success" size="lg" id="hire_now">
                                Hire a Vendor!!!
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </div>
                </div>
              </Container> */}
      {/* {loading && (
        <div
          style={{
            backgroundImage: `url(${BASE_URL}${websiteName[3].value})`,
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center" id="motto_id">
              <h1>{websiteName[0].value}</h1>
              <h3>{websiteName[1].value}</h3>
              <h3>{websiteName[2].value}</h3>

              <br />
              <div className="section landing-section" style={{ backgroundColor: "transparent" }}>
                <Col className="ml-auto mr-auto" md="8">
                  <Form className="contact-form">
                    <Row>
                      <Col className="ml-auto mr-auto" md="4">
                        <Link to="section1" smooth={true} duration={500}>
                          <Button className="btn-fill" color="info" size="lg" id="hire_now">
                            Hire a Limo now!!!
                          </Button>
                        </Link>
                        <span id="or">Or</span>
                        <Link to="section2" smooth={true} duration={500}>
                          <Button className="btn-fill" color="success" size="lg" id="hire_now">
                            Hire a Vendor!!!
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </div>
            </div>
          </Container>
        </div>
      )} */}
    </>
  );
}

export default LandingPageHeader;
