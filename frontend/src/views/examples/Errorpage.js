import React from "react";

function Errorpage() {
  // useEffect(() => {
  //   // Extract the path from the current URL
  //   const currentPath = location.pathname;
  //   // Check if the desired route exists in your application based on the current path
  //   const isRouteAvailable = isRouteAvailableForPath(currentPath);
  //   if (isRouteAvailable) {
  //     // If the route exists, redirect to the desired page
  //     window.location.href = currentPath;
  //   } else {
  //     // If the route doesn't exist, set the state to indicate "Page not found"
  //     setPageNotFound(true);
  //   }
  // }, [location.pathname]);

  // const isRouteAvailableForPath = (path) => {
  //   // Replace this logic with your actual check for route availability based on the path
  //   // For example, you might check against a list of valid routes in your application
  //   const validRoutesWithoutParams = ["/user-dashboard", "/dashboard"];
  //   const validRoutesWithParams = [
  //     "/customer-enter-new-password",
  //     "/verify-payment",
  //     "/vendor-verify-email",
  //     "/enter-new-password",
  //   ];

  //   // Check if the path matches any valid route without parameters
  //   const matchingRouteWithoutParams = validRoutesWithoutParams.find(
  //     (route) => path === route || path.startsWith(`${route}/`)
  //   );

  //   // Check if the path matches any valid route with parameters
  //   const matchingRouteWithParams = validRoutesWithParams.find((route) => path.startsWith(route));

  //   // If a match is found in either category, return true
  //   return !!matchingRouteWithoutParams || !!matchingRouteWithParams;
  // };

  return (
    // <>
    //   {pageNotFound && (
    //     <div style={{ textAlign: "center", fontSize: "2em", paddingTop: "20px" }}>
    //       Page not found
    //     </div>
    //   )}
    // </>
    <div style={styles.body}>
      <div style={styles.errorContainer}>
        <div style={styles.errorCode}>404</div>
        <div style={styles.errorMessage}>Page Not Found</div>
        <div style={styles.errorDetails}>Sorry, the requested page could not be found.</div>
      </div>
    </div>
  );
}
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  errorContainer: {
    textAlign: "center",
  },
  errorCode: {
    fontSize: "4em",
    fontWeight: "bold",
    color: "#dc3545",
  },
  errorMessage: {
    fontSize: "1.5em",
    marginTop: "10px",
    color: "#495057",
  },
  errorDetails: {
    marginTop: "20px",
    color: "#6c757d",
  },
};

export default Errorpage;
