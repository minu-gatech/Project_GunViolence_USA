

d3.json("/monthlydata").then(function(data){
// Create the Traces
var trace1 = {
    x: data.map(row => row.date),
    y: data.map(row => row.n_killed),
    mode: "lines+markers",
    type: "scatter",
    name: "Count of Killed ",
    marker: {
      color: "#2077b4",
      symbol: "hexagram"
    }
  };
  
  var trace2 = {
    x: data.map(row => row.date),
    y: data.map(row => row.n_injured),
    mode: "lines+markers",
    type: "scatter",
    name: "Count of Injured",
    marker: {
      color: "orange",
      symbol: "diamond-x"
    }
  };
  
  var trace3 = {
    x: data.map(row => row.date),
    y: data.map(row => row.n_guns_involved),
    mode: "lines+markers",
    type: "scatter",
    name: "Count of Guns",
    marker: {
      color: "rgba(156, 165, 196, 1.0)",
      symbol: "cross"
    }
  };
  
  // Create the data array for the plot
  var data = [trace1, trace2, trace3];
  
  // Define the plot layout
  var layout = {
    title: "Gun Violence trends over the years",
    xaxis: { title: "Year" },
    yaxis: { title: "Gun Violence Data" }
  };
  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
  


})

// FOR BAR CHART

// This API call will be made to get data from PostGres db

d3.json("/yeardata").then( function (data){
  
  var trace1 = {
      x: data.map(row => row.year),
      y: data.map(row => row.injured),
      text: "Injured",
      name: "Injured",
      type: "bar"
    };
  
    var trace2 = {
      x: data.map(row => row.year),
      y: data.map(row => row.killed),
      text: "Killed",
      name:"Killed",
      type: "bar"
    }
  var data =[trace1, trace2];

  var layout = {
      title: "Gun Violence 2014 - 2017 ",
      xaxis: { title: "Years" },
      yaxis: { title: "Number of Incidents" }
  };
  
  
  Plotly.newPlot("barchart", data, layout);
  
})

// This API call will be made to get data from csv_file
d3.json("/barchartdata").then( function (data){
  
  var trace1 = {
      x: data.map(row => row.year),
      y: data.map(row => row.injured),
      text: "Injured",
      name: "Injured",
      type: "bar"
    };
  
    var trace2 = {
      x: data.map(row => row.year),
      y: data.map(row => row.killed),
      text: "Killed",
      name:"Killed",
      type: "bar"
    }
  var data =[trace1, trace2];

  var layout = {
      title: "Gun Violence 2014 - 2017 ",
      xaxis: { title: "Years" },
      yaxis: { title: "Number of Incidents" }
  };
  
  
  Plotly.newPlot("barchart", data, layout);
  
})
