import React, { useState, useEffect } from "react";
//

//
import { useNavigate, useParams } from "react-router-dom";
//
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
//
import axios from "axios";
import Swal from "sweetalert2";

import Loader from "loader/loader";
//

function VerifyPayment() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const { id } = useParams();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setConfirmLoading(true);
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .post("/api/payment-callback")
        .then(function (response) {
          if (response.data.status === 200) {
            setConfirmLoading(false);
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/user-dashboard");
              }
            });
          } else if (response.data.status === 401) {
            setConfirmLoading(false);

            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: true, // Show the "OK" button
              allowOutsideClick: false, // Prevent closing by clicking outside the dialog
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/user-dashboard"); // Redirect to the homepage
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

  return (
    <>
      {confirmLoading && <Loader />}
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      ></div>
      <DemoFooter />
    </>
  );
}

export default VerifyPayment;
