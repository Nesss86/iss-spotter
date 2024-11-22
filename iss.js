const needle = require('needle');

/**
 * Makes a single API request to retrieve upcoming ISS flyover times for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The flyover times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords; // Destructure coordinates
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);  // If there's an error, pass it to the callback
      return;
    }

    // Check if the API returned an error or invalid status
    if (response.statusCode !== 200) {
      callback(Error(`Failed to fetch flyover times. Status code: ${response.statusCode}`), null);
      return;
    }

    try {
      // If the body is already an object, we don't need to parse it
      const responseBody = typeof body === 'object' ? body : JSON.parse(body);
      const flyOverTimes = responseBody.response;

      // Pass the flyover times to the callback
      callback(null, flyOverTimes);
    } catch (parseError) {
      callback(Error(`Failed to parse response body: ${parseError.message}`), null);
    }
  });
};

// Export the fetchISSFlyOverTimes function
module.exports = { fetchISSFlyOverTimes };


