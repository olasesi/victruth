import React from "react";

// reactstrap components
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
//
import SEO from "seo/seo.js";

function Services() {
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

  const seoProps = {
    title: "Services",
    name: "Services",
    type: "website",
  };

  return (
    <>
      {" "}
      <SEO {...seoProps} />
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section text-center">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title">ALL SERVICES</h2>

              <br />
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
                        Parties in and around are very popular. Just imagine a posh limo pulling up
                        at your house or school
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
                        Our airport transfers and business limo hire service is ideal for all types
                        of business travel.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a onClick={(e) => e.preventDefault()}>
                        <img alt="..." src={require("assets/img/faces/hen-parties.png")} />
                      </a>
                    </div>
                    <CardBody>
                      <a onClick={(e) => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">
                            <h5 className="card-category">Hen or Stag Parties</h5>
                          </CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        Your hen or stag night should be a night to remember as you leave your
                        single life.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a onClick={(e) => e.preventDefault()}>
                        <img alt="..." src={require("assets/img/faces/sports.jpg")} />
                      </a>
                    </div>
                    <CardBody>
                      <a onClick={(e) => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">
                            <h5 className="card-category">Sporting Events and Rides</h5>
                          </CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        Top sporting events in and around Abuja are an ideal opportunity to hire a
                        limo with a group of friends.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default Services;
