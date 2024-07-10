import React, { useState, useEffect } from "react";
//
import { EmailPregMatch } from "general/emailpregmatch.js";

//
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
//
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

//
import { FormGroup, Label, Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
//

//
import { Link, useNavigate } from "react-router-dom";
//
import Loader from "loader/loader";
//
import SEO from "seo/seo.js";

function Login() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    remember_token: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setInputFields({ ...inputFields, [name]: newValue });
  };

  const validate = (inputValues) => {
    let errors = {};
    const regex = EmailPregMatch;

    if (!regex.test(inputValues.email)) {
      errors.email = "Enter a valid email address";
    }

    if (inputValues.password.length < 6) {
      errors.password = "Password should not be less than 6 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(inputFields));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  const finishSubmit = () => {
    setLoading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/customer-login", inputFields)
        .then(function (response) {
          if (response.data.status === 200) {
            const expirationTime = response.data.remember_me ? 30 : 1;
            Cookies.set("auth_token_customer", response.data.token, {
              expires: expirationTime,
              secure: true,
              sameSite: "lax",
            });

            setLoading(false);

            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/user-dashboard");
          } else if (response.data.status === 401) {
            setLoading(false);

            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (response.data.status === 500) {
            setLoading(false);

            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
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
  };
  const seoProps = {
    title: "Login",
    name: "Login",
    type: "website",
  };

  return (
    <>
      <SEO {...seoProps} />

      {loading && <Loader />}

      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="main">
          <div className="section" id="main-div-wrapper">
            <Container id="register-container">
              <Row>
                <Col className="ml-auto mr-auto">
                  <Card className="card-register ml-auto mr-auto" id="register-card">
                    <h3 className="title mx-auto" id="title-register">
                      Login
                    </h3>
                    <Form className="register-form" onSubmit={handleSubmit}>
                      <label>Email</label>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={inputFields.email}
                        onChange={handleChange}
                      />

                      <p className="text-tertiary" id="error-message">
                        <span>{errors.email}</span>
                      </p>

                      <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                          id="examplePassword"
                          name="password"
                          placeholder="Password"
                          type="password"
                          value={inputFields.password}
                          onChange={handleChange}
                        />
                        <p className="text-tertiary" id="error-message">
                          <span>{errors.password}</span>
                        </p>
                      </FormGroup>
                      <FormGroup check>
                        <Input
                          type="checkbox"
                          id="login-remember"
                          value={inputFields.remember_token}
                          onChange={handleChange}
                          name="remember_token"
                        />
                        <Label check id="remember-label" for="login-remember">
                          Remember me
                        </Label>
                      </FormGroup>
                      <Button block className="btn-round" color="danger" disabled={loading}>
                        Login {/* {loading ? 'Submitting...' : 'Submit'} */}
                      </Button>
                    </Form>
                    <div className="forgot">
                      <Link to="/customer-password-reset-form">
                        <Button className="btn-link" color="black" href="#pablo">
                          Forgot password?
                        </Button>
                      </Link>
                    </div>
                    <br />
                    <div className="forgot">
                      <Link to="/vendor-login">
                        <Button className="btn-round" color="success" id="vendor-button-text">
                          Login as Vendor
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default Login;
