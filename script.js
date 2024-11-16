// City to IATA code mapping
const cityToIata = {
  "New York": "JFK",
  "London": "LHR",
  "Paris": "CDG",
  "Mumbai": "BOM",
  "Tokyo": "HND",
  // Add other cities here
};

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
  const fromCity = document.getElementById('from-city').value;
  const toCity = document.getElementById('to-city').value;
  
  const from = cityToIata[fromCity];
  const to = cityToIata[toCity];

  // Validate IATA codes
  if (!from || !to) {
    alert('Invalid city entered. Please enter valid cities.');
    return;
  }

  // Show loading message
  document.getElementById('loading').style.display = 'block';
  document.getElementById('flight-info').innerHTML = '';

  // Fetch flight data from the API
  const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=7d4b92c5bb8166d346f881417b396869&dep_iata=${from}&arr_iata=${to}&limit=100`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.display = 'none';
      if (data.data && data.data.length > 0) {
        const flights = data.data.map(flight => `
          <div class="flight">
            <p><strong>Airline:</strong> ${flight.airline.name}</p>
            <p><strong>Flight:</strong> ${flight.flight.number}</p>
            <p><strong>Departure:</strong> ${flight.departure.airport} at ${new Date(flight.departure.scheduled).toLocaleString()}</p>
            <p><strong>Arrival:</strong> ${flight.arrival.airport} at ${new Date(flight.arrival.scheduled).toLocaleString()}</p>
          </div>
        `).join('');
        document.getElementById('flight-info').innerHTML = flights;
      } else {
        document.getElementById('flight-info').innerHTML = 'No flights found.';
      }
    })
    .catch(error => {
      console.error('Error fetching flight data:', error);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('flight-info').innerHTML = 'Failed to fetch flight data.';
    });
});
