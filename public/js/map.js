mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 13, // starting zoom
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

// Create the marker and add to map
const marker = new mapboxgl.Marker(markerElement)
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);

// Create the popup
const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
  .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`);

// Add hover effect to marker
markerElement.addEventListener('mouseenter', () => {
  markerElement.innerHTML = '<i class="fa-brands fa-airbnb red-icon white-icon"></i>';
  popup.addTo(map);
  popup.setLngLat(listing.geometry.coordinates);
});

markerElement.addEventListener('mouseleave', () => {
  markerElement.innerHTML = '<i class="fa-solid fa-house white-icon"></i>';
  popup.remove();
});

// Add scale and zoom controls
map.addControl(new mapboxgl.ScaleControl());
map.addControl(new mapboxgl.NavigationControl());
