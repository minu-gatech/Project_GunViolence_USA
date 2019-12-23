// Creating map object
var myMap = L.map("map", {
  center: [ 37.09, -95.71 ],
    zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// csv file 
csv_file = 'static/data/Heatmap_2013_2018_data.csv'

// Grab the data with d3
d3.csv(csv_file).then(data => 
//d3.json(jsonData).then(data => 
{
   var heatArray = [];
  //Loop through data
  data.forEach( row => {

    var lat = row.latitude;
    var long = row.longitude;
    if (lat && long) 
    {
      heatArray.push([lat, long]);
    }
  })
  

  console.log(heatArray)
  // Add heat cluster layer to the map
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 15
  }).addTo(myMap);
  console.log("INSIDE")
});
