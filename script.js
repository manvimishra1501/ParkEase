// Simulating fetching parking spots from the server
const parkingSpots = [
    { id: 1, available: true },
    { id: 2, available: false },
    { id: 3, available: true }
];

// Display parking spots availability
const parkingSpotSelect = document.getElementById("parkingSpot");
parkingSpots.forEach(spot => {
    const option = document.createElement("option");
    option.value = spot.id;
    option.text = `Spot ${spot.id} - ${spot.available ? "Available" : "Not Available"}`;
    parkingSpotSelect.appendChild(option);
});

// Reserve a parking spot
const reserveSpotBtn = document.getElementById("reserveSpotBtn");
const paymentSection = document.getElementById("paymentSection");

reserveSpotBtn.addEventListener("click", () => {
    const selectedSpot = parkingSpotSelect.value;
    const selectedSpotDetails = parkingSpots.find(spot => spot.id === parseInt(selectedSpot));

    if (selectedSpotDetails && selectedSpotDetails.available) {
        alert(`Parking Spot ${selectedSpot} reserved!`);
        paymentSection.style.display = "block";
    } else {
        alert("Sorry, this parking spot is not available.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const reserveSpotBtn = document.getElementById("reserveSpotBtn");
    const paymentSection = document.getElementById("paymentSection");

    reserveSpotBtn.addEventListener("click", function () {
        const reservationDate = document.getElementById("reservationDate").value;

        if (reservationDate) {
            alert("Spot reserved successfully! Proceed to payment.");
            paymentSection.style.display = "block"; // Show payment section
        } else {
            alert("Please select a valid date and time for reservation.");
        }
    });

    // Handle Payment Button Click (UPI Payment)
    document.getElementById("payNowBtn").addEventListener("click", function () {
        const upiLink = "upi://pay?pa=yourupi@upi&pn=ParkEase&mc=0000&tid=123456&tr=987654321&tn=Parking Payment&am=15&cu=INR";
        window.location.href = upiLink; // Redirect user to UPI payment
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const locationBtn = document.getElementById("getLocationBtn");
    const parkingResult = document.getElementById("parkingResult");

    const parkingSpots = [
        { name: "Mall Parking", lat: 28.7041, lon: 77.1025 },
        { name: "Office Complex", lat: 28.5355, lon: 77.3910 },
        { name: "Stadium Parking", lat: 28.6139, lon: 77.2090 },
    ];

    if (locationBtn) {
        locationBtn.addEventListener("click", function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                parkingResult.innerHTML = "Geolocation is not supported by your browser.";
            }
        });
    }

    function showPosition(position) {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        let nearest = null;
        let minDistance = Number.MAX_VALUE;

        parkingSpots.forEach((spot) => {
            const distance = Math.sqrt(
                Math.pow(spot.lat - userLat, 2) + Math.pow(spot.lon - userLon, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearest = spot;
            }
        });

        if (nearest) {
            parkingResult.innerHTML = `<strong>Nearest Parking:</strong> ${nearest.name}`;
        } else {
            parkingResult.innerHTML = "No nearby parking spots found.";
        }
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                parkingResult.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                parkingResult.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                parkingResult.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                parkingResult.innerHTML = "An unknown error occurred.";
                break;
        }
    }
});


document.getElementById("getLocationBtn").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showParkingSpots, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showParkingSpots(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Show nearby parking in Google Maps
    let mapsUrl = `https://www.google.com/maps/search/parking/@${latitude},${longitude},15z`;

    // Display result
    document.getElementById("parkingResult").innerHTML = "Showing nearby parking...";
    
    // Enable "Open in Google Maps" button
    let mapsBtn = document.getElementById("openMapsBtn");
    mapsBtn.href = mapsUrl;
    mapsBtn.style.display = "inline-block";
}

function showError(error) {
    let errorMessage = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied location access.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    document.getElementById("parkingResult").innerHTML = errorMessage;
}

