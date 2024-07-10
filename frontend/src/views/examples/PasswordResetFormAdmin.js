import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, FormGroup } from "reactstrap";
//Footer
import DemoFooter from "components/Footers/DemoFooter.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
// email validation
import { EmailPregMatch } from "general/emailpregmatch.js";
//
import Loader from "loader/loader";
//
import { useNavigate } from "react-router-dom";

function PasswordResetFormAdmin() {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      axios
        .post("/api/admin-forget-password", inputFields)
        .then(function (response) {
          if (response.data.status === 200) {
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: "Password reset link has been sent!!!",
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
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

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      {loading && <Loader />}
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
                <h3 className="title mx-auto">Admin Password Reset</h3>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <FormGroup className="has-danger">
                    <label>Email</label>
                    <Input
                      placeholder="Email"
                      type="text"
                      name="email"
                      value={inputFields.email}
                      onChange={handleChange}
                    />
                    <div className="form-control-feedback">
                      <b>{errors.email}</b>
                    </div>
                  </FormGroup>
                  <Button block className="btn-round" disabled={loading} color="danger">
                    Reset Password
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default PasswordResetFormAdmin;
