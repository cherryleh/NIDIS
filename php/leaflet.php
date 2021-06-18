<!DOCTYPE html>
<html>
    <head>
        <title>Hawai‘i Ranches</title>
        <link 
            rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" 
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""
        />
        <link rel = "stylesheet" href = "leaflet.css">
        
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossorigin=""
        ></script>
        <script src="../leaflet.ajax.min.js"></script>
        
	</head>
    <body>
        <div id="map" style="width: 700px; height: 500px; margin-left:auto; margin-right:auto;"></div>
        <div id="map"></div>
        <script>
            var latitude = 19.612606725040024
            var longitude = -155.52124099048822

            var map = L.map('map').setView([latitude, longitude], 9);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

            var geojson;

            function highlightFeature(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });

                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
            }

            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }

            function onEachFeature(feature,layer){
                layer.bindPopup(feature.properties.majorowner);
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature,
                })
                };
    
            function style(feature){
                return {
                    fillColor: 'blue',
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.5
                }
            }

            var geojson = L.geoJSON.ajax('HI_Ranches.geojson',{
                onEachFeature: onEachFeature,
                style:style

            }).addTo(map);

        </script>
        
	</body>
</html>