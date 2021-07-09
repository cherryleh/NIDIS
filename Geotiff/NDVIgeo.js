$(document).ready(function () {
  // MAP
  var latitude = 19.612606725040024;
  var longitude = -155.52124099048822;


  const map = L.map("map").setView([latitude, longitude], 9);
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const ET = "../Geotiff/NDVI_Feb.tif";


  const plottyRenderer = L.LeafletGeotiff.plotty({
    displayMin: -1,
    displayMax: 1,
    clampLow: false,
    clampHigh: false,
  });
  const ETLayer = L.leafletGeotiff(ET, {
    renderer: plottyRenderer,
  }).addTo(map);


  let popup;
  map.on("click", function (e) {
    if (!popup) {
      popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).openOn(map);
    } else {
      popup.setLatLng([e.latlng.lat, e.latlng.lng]);
    }
    const value = ETLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
    popup
      .setContent(`Possible value at point (experimental/buggy): ${value}`)
      .openOn(map);
  });
});
