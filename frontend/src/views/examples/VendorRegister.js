import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//
import { EmailPregMatch } from "general/emailpregmatch.js";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
//
//
import DemoFooter from "components/Footers/DemoFooter.js";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//

import Loader from "loader/loader";

function VendorRegister() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [inputFields, setInputFields] = useState({
    firstname: "",
    lastname: "",
    business_name: "",
    category_section_id: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [getCategorySection, setGetCategorySection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const validate = (inputValues) => {
    let errors = {};
    const regex = EmailPregMatch;

    if (inputValues.firstname.length < 3) {
      errors.firstname = "Enter a valid firstname";
    }

    if (inputValues.lastname.length < 3) {
      errors.lastname = "Enter a valid lastname";
    }

    if (inputValues.business_name.length < 3) {
      errors.business_name = "Enter a valid business name";
    }

    if (inputValues.category_section_id === "0") {
      errors.category_section_id = "Please select a category";
    }

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

  const finishSubmit = () => {
    setLoadingRegistration(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/save-register", inputFields)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoadingRegistration(false);
            Swal.fire({
              icon: "success",
              title:
                "Registration was successful. An email has been sent to you allowing you to verify your email address. If you cannot find the mail in your inbox, please check your spam",
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          } else if (response.data.status === 401) {
            setLoadingRegistration(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (response.data.status === 500) {
            setLoadingRegistration(false);
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(function (error) {
          setLoadingRegistration(false);

          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-category-section")
        .then(function (response) {
          if (response.data.status === 200) {
            setGetCategorySection(response.data);
            setLoading(true);
          }
        })
        .catch(function (error) {
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
      {loadingRegistration && <Loader />}
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="main">
          <div className="section" id="main-div-wrapper-vendor">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto">
                  <Card className="card-register ml-auto mr-auto" id="vendor-register-vendor">
                    <h3 className="title mx-auto">Vendor Register</h3>

                    <Form className="register-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <label>Firstname</label>
                          <Input
                            placeholder="Firstname"
                            type="text"
                            value={inputFields.firstname}
                            onChange={handleChange}
                            name="firstname"
                          />

                          <p className="text-tertiary" id="error-message">
                            <span>{errors.firstname}</span>
                          </p>
                        </Col>
                        <Col md="6">
                          <label>Lastname</label>
                          <Input
                            name="lastname"
                            placeholder="Lastname"
                            type="text"
                            value={inputFields.lastname}
                            onChange={handleChange}
                          />
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.lastname}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <label>Business name</label>
                          <Input
                            name="business_name"
                            placeholder="Business name"
                            type="text"
                            value={inputFields.business_name}
                            onChange={handleChange}
                          />
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.business_name}</span>
                          </p>
                        </Col>
                        <Col md="12">
                          <label>Email</label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={inputFields.email}
                            onChange={handleChange}
                          />
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.email}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <label>Vendor category</label>
                          <Input
                            type="select"
                            name="category_section_id"
                            placeholder="Vendor category"
                            value={inputFields.category_section_id}
                            onChange={handleChange}
                          >
                            <option value="0">Select vendor category</option>
                            {loading &&
                              getCategorySection.category_section.map((category) => {
                                return (
                                  <option key={category.id} value={category.id}>
                                    {category.category}
                                  </option>
                                );
                              })}
                          </Input>
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.category_section_id}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <label>Password</label>
                          <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={inputFields.password}
                            onChange={handleChange}
                          />
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.password}</span>
                          </p>
                          <p className="text-tertiary" id="error-message">
                            <span>{errors.password_confirmation}</span>
                          </p>
                        </Col>
                        <Col md="6">
                          <label>Confirm password</label>
                          <Input
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            type="password"
                            value={inputFields.password_confirmation}
                            onChange={handleChange}
                          />
                          <p className="text-tertiary" id="error-message"></p>
                        </Col>
                      </Row>
                      <Button
                        block
                        className="btn-round"
                        color="danger"
                        disabled={loadingRegistration}
                      >
                        Register
                      </Button>
                    </Form>
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

export default VendorRegister;
