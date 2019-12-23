
// Creating map object
var myMap = L.map("map", {
  center: [ 37.09, -95.71 ],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Load in geojson data
var geoData = "static/data/us-states.geojson";
var geojson;


// Grab data with d3
d3.json(geoData, function(data) {

   // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "mass_shooting_count",
  // Defining the scale
    scale: ['#FFEDA0','#FED976','#FD8D3C','#FC4E2A', '#BD0026','#800026'],
    // Number of breaks in step range
    steps: 5,
    dashArray: '3',
    // q for quartile, e for equidistant, k for k-means
    mode: "e",
    // Defining the style
    style: {
      // Border color
      color: "#fff",
      weight: 2,
      fillOpacity: 0.8,
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h5>" + feature.properties.name +"</h5> "+ "<hr><h5>Mass Shootings Incidents:</h5> <h5>" + feature.properties.mass_shooting_count + "</h5>");
    }
  }).addTo(myMap);



// Set up the legend
// ['#FFEDA0','#FED976','#FD8D3C','#FC4E2A', '#BD0026','#800026'], 
function getColor(d) {
    return d > 40 ? '#800026' :
           d > 30  ? '#BD0026' :
           d > 20  ? '#FC4E2A' :
           d > 10  ? '#FD8D3C' :
           d > 0   ? '#FED976' :
                    '#FFEDA0';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        
        grades = [0, 1, 10, 20, 30, 40],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      if( i == 0){
          div.innerHTML +=
            '<i style="background: #FFEDA0"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      else{
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    }

    return div;
};

legend.addTo(myMap);



});   // d3.json ends
