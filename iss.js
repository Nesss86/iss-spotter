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

    let responseBody;
    try {
      // Check if the response body is already a valid object, otherwise parse it
      responseBody = typeof body === 'object' ? body : JSON.parse(body);
    } catch (parseError) {
      callback(Error(`Failed to parse response body: ${parseError.message}`), null);
      return;
    }

    // Ensure responseBody.response exists before using it
    if (!responseBody.response) {
      callback(Error('Invalid response from server'), null);
      return;
    }

    // If everything is good, pass the fly over times to the callback
    callback(null, responseBody.response);
  });
};

module.exports = { fetchISSFlyOverTimes };
