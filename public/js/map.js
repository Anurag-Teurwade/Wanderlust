mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom: 9,
});

// Create a custom marker element
const markerElement = document.createElement('div');
markerElement.className = 'marker'; 
markerElement.innerHTML = '<i class="fa-solid fa-house white-icon"></i>'; 

// Style for the marker element
markerElement.style.backgroundColor = 'red'; 
markerElement.style.borderRadius = '50%'; 
markerElement.style.padding = '5px'; 
markerElement.style.display = 'flex';
markerElement.style.alignItems = 'center';
markerElement.style.justifyContent = 'center';
markerElement.style.width = '30px'; 
markerElement.style.height = '30px';

// Create and add the custom marker to the map
const marker = new mapboxgl.Marker(markerElement)
    .setLngLat(listing.geometry.coordinates)
    .addTo(map);

// Create a popup with a custom class for styling
const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
    .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking.</p>`);

// Add hover effect
markerElement.addEventListener('mouseenter', () => {
    markerElement.innerHTML = '<i class="fa-brands fa-airbnb red-icon white-icon"></i>'; 
    popup.addTo(map); 
    popup.setLngLat(listing.geometry.coordinates); 
});

markerElement.addEventListener('mouseleave', () => {
    markerElement.innerHTML = '<i class="fa-solid fa-house white-icon"></i>'; 
    popup.remove(); 
});
