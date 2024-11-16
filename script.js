// Define the source and destination airport IATA codes
const from = 'BOM'; // Mumbai
const to = 'JFK'; // New York

// Your AviationStack API key
const apiKey = '7d4b92c5bb8166d346f881417b396869';

// Construct the API URL for fetching flight data
const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${from}&arr_iata=${to}`;

// Fetch the flight data from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Check if there is any flight data returned
    if (data.data && data.data.length > 0) {
      const flightDetails = data.data.map(flight => {
        return `
          <div class="flight">
            <p><strong>Flight:</strong> ${flight.airline.name}</p>
            <p><strong>Departure:</strong> ${flight.departure.scheduled}</p>
            <p><strong>Arrival:</strong> ${flight.arrival.scheduled}</p>
          </div>
        `;
      }).join('');

      // Display the flight details on the page
      document.getElementById('flight-info').innerHTML = flightDetails;
    } else {
      document.getElementById('flight-info').innerHTML = 'No flights found.';
    }
  })
  .catch(error => {
    console.error('Error fetching flight data:', error);
    document.getElementById('flight-info').innerHTML = 'Failed to fetch flight data.';
  });
