const apiKey = "b4LgkewqmfQOXJga4vA7OZc7GIoyDym7";
const apiSecret = "YELFuLnr9vAttO6s";

async function getAccessToken() {
  try {
    const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to obtain access token");
    }

    const data = await response.json();
    return data.access_token; // Return the access token
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

document.getElementById("flightForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const results = document.getElementById("results");

  results.innerHTML = "Fetching free flight offers...";

  try {
    // Step 1: Get the access token
    const accessToken = await getAccessToken();

    // Step 2: Use the access token to fetch flight offers
    const response = await fetch(`https://test.api.amadeus.com/v1/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&adults=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flight data");
    }

    const data = await response.json();

    // Display flight data
    if (data.data && data.data.length > 0) {
      results.innerHTML = "<h2>Available Free Flights:</h2>";
      data.data.forEach((flight, index) => {
        const { itineraries } = flight;
        const { departure, arrival } = itineraries[0].segments[0];
        results.innerHTML += `
          <div>
            <strong>Flight ${index + 1}:</strong><br>
            ${departure.iataCode} to ${arrival.iataCode}<br>
            Departure: ${departure.at}<br>
            Arrival: ${arrival.at}
          </div>
          <hr>
        `;
      });
    } else {
      results.innerHTML = "No free flights available for the selected route.";
    }
  } catch (error) {
    results.innerHTML = "An error occurred while fetching flight data.";
    console.error(error);
  }
});
