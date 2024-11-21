const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// Fetch the user's IP address
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  
  // Use an invalid IP for testing
/*
  const invalidIP = '42'; // This simulates an invalid IP address for testing
  
  fetchCoordsByIP(invalidIP, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error.message); // Add .message for clearer error output
      return;
    }

    console.log('It worked! Returned coordinates:', coords);
  });
  */
});


