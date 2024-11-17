document.getElementById("fetchFlights").addEventListener("click", fetchFlightData);

function fetchFlightData() {
    const flightsTableBody = document.getElementById("flightsTableBody");
    flightsTableBody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    // Fetch flight data from OpenSky API
    fetch("https://opensky-network.org/api/states/all")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const flights = data.states.map(state => ({
                callsign: state[1] || "N/A",
                country: state[2] || "N/A",
                latitude: state[5] || "N/A",
                longitude: state[6] || "N/A",
                altitude: state[7] || "N/A",
                velocity: state[9] || "N/A"
            }));

            // Clear the table before inserting new rows
            flightsTableBody.innerHTML = "";

            // Add rows to the table
            flights.forEach(flight => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${flight.callsign}</td>
                    <td>${flight.country}</td>
                    <td>${flight.latitude}</td>
                    <td>${flight.longitude}</td>
                    <td>${flight.altitude}</td>
                    <td>${flight.velocity}</td>
                `;
                flightsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching flight data:", error);
            flightsTableBody.innerHTML = "<tr><td colspan='6'>Failed to load data. Try again later.</td></tr>";
        });
}
