// SEO.js
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SEO = ({ title, description, name, type }) => {
  const [websiteName, setWebsiteName] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/sanctum/csrf-cookie").then(async () => {
      await axios
        .get("/api/show-website-settings")
        .then(function (response) {
          setLoading(true);
          if (response.data.status === 200) {
            setWebsiteName(response.data.website_setting[1].value);
            setLoading(true);
          }
        })
        .catch(function (error) {
          setLoading(true);
        });
    });
  }, []);

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
      {loading && <link rel="shortcut icon" href={BASE_URL + websiteName} />}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

SEO.defaultProps = {
  title: "Victruth",
  description:
    "Explore our premium limo rental service. Be it for birthday, weddings, etc. And also connect with us for  reliable vendor services like event decorators, catering, etc to make your events a success. Discover a wide range of opportunity using our services.",
  name: "Victruth",
  type: "website",
};

export default SEO;
