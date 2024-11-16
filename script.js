const apiKey = '7d4b92c5bb8166d346f881417b396869'; // Internal API Key
const endpoint = 'https://api.aviationstack.com/v1/flights';

// Fetch and display flights based on input and enable real-time updates
const fetchFlights = async () => {
    const flightsContainer = document.getElementById('flights');
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    flightsContainer.innerHTML = 'Fetching data...';

    try {
        // Build query string dynamically based on user input
        const query = `${endpoint}?access_key=${apiKey}&dep_iata=${from}&arr_iata=${to}`;
        const response = await fetch(query);

        if (!response.ok) {
            throw new Error('Failed to fetch flight data');
        }

        const data = await response.json();

        // Filter and display flights
        const flights = data.data || [];
        if (flights.length === 0) {
            flightsContainer.innerHTML = 'No matching flights found.';
            return;
        }

        flightsContainer.innerHTML = flights
            .slice(0, 10) // Limit to 10 results
            .map(flight => `
                <p>
                    Flight: ${flight.airline.name} (${flight.flight.iata})<br>
                    Departure: ${flight.departure.airport} at ${flight.departure.scheduled}<br>
                    Arrival: ${flight.arrival.airport} at ${flight.arrival.scheduled}<br>
                    Status: ${flight.flight_status}<br>
                </p>
            `)
            .join('');

    } catch (error) {
        console.error(error);
        flightsContainer.innerHTML = 'Error fetching data. Try again later.';
    }
};

// Lucky Ticket Functionality
const playLuckyDraw = () => {
    const prizes = [
        '10% Discount!',
        '20% Discount!',
        '50% Discount!',
        'Free Upgrade to Business Class!',
        'Free Ticket!'
    ];
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('result').innerText = `🎉 You won: ${result}`;
};

// Enable periodic updates (real-time effect)
setInterval(fetchFlights, 10000); // Fetch data every 10 seconds
