import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
//
import Cookies from "js-cookie";
// reactstrap components
import {
  FormGroup,
  Label,
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
//
import DemoFooter from "components/Footers/DemoFooter.js";

//
import { EmailPregMatch } from "general/emailpregmatch.js";
//
import Loader from "loader/loader";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    remember_token: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setInputFields({ ...inputFields, [name]: newValue });
  };
  // const handleCheck = (e) => {
  //   const { name, checked } = e.target;
  //   setInputFields({ ...inputFields, [name]: checked });
  // };

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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    setSubmitting(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/admin-login", inputFields)
        .then(function (response) {
          if (response.data.status === 200) {
            const expirationTime = response.data.remember_me ? 30 : 1;
            Cookies.set("auth_token_admin", response.data.token, {
              expires: expirationTime,
              secure: true,
              sameSite: "lax",
              httpOnly: false,
            });

            setSubmitting(false);

            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });

            navigate("/dashboard");
          } else if (response.data.status === 401) {
            setSubmitting(false);

            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setSubmitting(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      {submitting && <Loader />}
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Admin Login</h3>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={inputFields.email}
                    onChange={handleChange}
                  />
                  <p className="text-tertiary" id="error-message">
                    <span>{errors.email}</span>
                  </p>
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={inputFields.password}
                    onChange={handleChange}
                  />
                  <p className="text-tertiary" id="error-message">
                    <span>{errors.password}</span>
                  </p>
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

                  <Button block className="btn-round" color="danger" disabled={submitting}>
                    Login
                  </Button>
                </Form>
                <div className="forgot">
                  <Link to="/password-reset-form-admin">
                    <Button className="btn-link" color="black" href="#pablo">
                      Forgot password?
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default AdminLoginPage;
