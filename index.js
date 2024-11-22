const needle = require('needle');
const { fetchISSFlyOverTimes } = require('./iss');

// Example coordinates (you can replace these with real coordinates later)
const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// Fetch the ISS flyover times using the coordinates
fetchISSFlyOverTimes(exampleCoords, (error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned ISS flyover times:', flyOverTimes);
});

// Example to test with an invalid IP
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





