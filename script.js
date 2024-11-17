const apiKey = "b4LgkewqmfQOXJga4vA7OZc7GIoyDym7";

document.getElementById("flightForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const results = document.getElementById("results");

  results.innerHTML = "Searching for free flights...";

  try {
    const response = await fetch(`https://test.api.amadeus.com/v1/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&adults=1`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flight data");
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      results.innerHTML = "<
