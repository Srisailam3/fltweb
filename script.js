document.getElementById('search-btn').addEventListener('click', () => {
    const from = document.getElementById('from-city').value.toUpperCase();
    const to = document.getElementById('to-city').value.toUpperCase();
    
    document.getElementById('loading').style.display = 'block';  // Show loading
    document.getElementById('flight-info').innerHTML = '';  // Clear previous results

    const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=7d4b92c5bb8166d346f881417b396869&dep_iata=${from}&arr_iata=${to}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';  // Hide loading
            if (data.data && data.data.length > 0) {
                const flightDetails = data.data.map(flight => `
                    <div class="flight">
                        <p><strong>Airline:</strong> ${flight.airline.name}</p>
                        <p><strong>Flight:</strong> ${flight.flight.number}</p>
                        <p><strong>Departure:</strong> ${flight.departure.airport} at ${new Date(flight.departure.scheduled).toLocaleString()}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival.airport} at ${new Date(flight.arrival.scheduled).toLocaleString()}</p>
                    </div>
                `).join('');
                document.getElementById('flight-info').innerHTML = flightDetails;
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
