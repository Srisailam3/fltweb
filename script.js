document.getElementById('search-btn').addEventListener('click', () => {
    const from = document.getElementById('from-city').value.toUpperCase();  // Get 'From' city input
    const to = document.getElementById('to-city').value.toUpperCase(); // Get 'To' city input
    
    // Show the loading text
    document.getElementById('loading').style.display = 'block';
    document.getElementById('flight-info').innerHTML = '';  // Clear previous results

    const apiKey = '7d4b92c5bb8166d346f881417b396869'; // Your API Key
    const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${from}&arr_iata=${to}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none'; // Hide the loading text

            if (data.data && data.data.length > 0) {
                const flightDetails = data.data.map(flight => `
                    <div class="flight">
                        <p><strong>Flight:</strong> ${flight.airline.name}</p>
                        <p><strong>Departure:</strong> ${flight.departure.scheduled}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival.scheduled}</p>
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
