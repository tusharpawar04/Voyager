
mapboxgl.accessToken =maptoken;

  const map = new mapboxgl.Map({
      container: 'map', // container ID
      center:listing.geometry.coordinates, // starting position [lng, lat]
      zoom: 9 // starting zoom
  });
  console.log(listing.geometry.coordinates);
  const marker=new mapboxgl.Marker()
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`)) // add popups
  .addTo(map);
