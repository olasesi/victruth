import React, { useState, useEffect } from "react";
//
import { EmailPregMatch } from "general/emailpregmatch.js";
//
import { useParams, useNavigate } from "react-router-dom";
//
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
//
import axios from "axios";
import Swal from "sweetalert2";

//
import { FormGroup, Label, Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

import Loader from "loader/loader";
//

function CustomerPasswordChange() {
  const navigate = useNavigate();
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const { id } = useParams();

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    forget_password: id,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showform, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputFields({ ...inputFields, [name]: value });
  };

  const validate = (inputValues) => {
    let errors = {};
    const regex = EmailPregMatch;

    if (!regex.test(inputValues.email)) {
      errors.email = "Enter a valid email address";
    }

    if (inputValues.password.length < 6) {
      errors.password = "Password should not be less than 6 characters";
    } else if (inputValues.password !== inputValues.password_confirmation) {
      errors.password_confirmation = "Password and confirm password did not match";
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

  useEffect(() => {
    setConfirmLoading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/confirm-password-code-customer", { forget_password: id })
        .then(function (response) {
          if (response.data.status === 200) {
            setShowForm(true);
            setConfirmLoading(false);
          } else if (response.data.status === 401) {
            setConfirmLoading(false);

            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
                //window.location.href = "/login"; // Redirect to the homepage
              }
            });
          }
        })
        .catch(function (error) {
          setConfirmLoading(false);
          Swal.fire({
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  }, []);

  const finishSubmit = () => {
    setLoading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/customer-new-password", inputFields)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
                // window.location.href = "/login"; // Redirect to the homepage
              }
            });
          } else if (response.data.status === 401) {
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

  return (
    <>
      {loading && <Loader />}
      {confirmLoading && <Loader />}
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        {showform && (
          <div className="main">
            <div className="section" id="main-div-wrapper">
              <Container id="register-container">
                <Row>
                  <Col className="ml-auto mr-auto">
                    <Card className="card-register ml-auto mr-auto" id="register-card">
                      <h3 className="title mx-auto" id="title-register">
                        New Password
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
                        <FormGroup>
                          <Label for="examplePassword2">Confirm Password</Label>
                          <Input
                            id="examplePassword2"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            type="password"
                            value={inputFields.password_confirmation}
                            onChange={handleChange}
                          />
                        </FormGroup>
                        <Button block className="btn-round" color="danger" disabled={loading}>
                          Submit {/* {loading ? 'Submitting...' : 'Submit'} */}
                        </Button>
                      </Form>

                      <br />
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
      <DemoFooter />
    </>
  );
}

export default CustomerPasswordChange;
