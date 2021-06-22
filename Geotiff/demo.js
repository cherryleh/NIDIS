$(document).ready(function () {
  // MAP
  var latitude = 19.612606725040024;
  var longitude = -155.52124099048822;


  const map = L.map("map").setView([latitude, longitude], 9);
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const windSpeedUrl = "../Geotiff/ET_Feb.tif";
  // const windSpeedUrl =
  //   "https://danwild.github.io/leaflet-geotiff-2/wind_speed.tif";

  const plottyRenderer = L.LeafletGeotiff.plotty({
    displayMin: 11,
    displayMax: 50,
    clampLow: false,
    clampHigh: false,
  });
  const windSpeedLayer = L.leafletGeotiff(windSpeedUrl, {
    renderer: plottyRenderer,
  }).addTo(map);

  /*// VECTOR ARROW EG
  const windDirUrl = "wind_direction.tif";
  // const windDirUrl =
  //   "https://danwild.github.io/leaflet-geotiff-2/wind_direction.tif";
  const arrowRenderer = L.LeafletGeotiff.vectorArrows({
    arrowSize: 20,
  });
  const windDirLayer = L.leafletGeotiff(windDirUrl, {
    renderer: arrowRenderer,
  }).addTo(map);*/

  let popup;
  map.on("click", function (e) {
    if (!popup) {
      popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).openOn(map);
    } else {
      popup.setLatLng([e.latlng.lat, e.latlng.lng]);
    }
    const value = windSpeedLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
    popup
      .setContent(`Possible value at point (experimental/buggy): ${value}`)
      .openOn(map);
  });
});
