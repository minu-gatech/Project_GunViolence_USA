

/*********************************************************************/
// Function to create display metdata
function buildMetadata(year) {  // 1

  console.log(`Inside buildMetaData Function - ${year}`)
  
  // Using `d3.json` to fetch the metadata for a sample
  //d3.json(`/metadata/${year}`).then(metaData => {   // 2
  d3.csv("../static/data/Years_Data_2014_2019.csv").then(metaData =>{
      
      console.log(metaData);

      // Selecting div elelment to append metadata into it
      metaData_panel = d3.select('#sample-metadata');

      // Clearing metaData panel
      metaData_panel.html("");

      // Fetching keys and values from metaData of sample
      
      metaData.forEach((row) => {
        console.log(row.year);
        if(row.year == year)
        {
      
          Object.entries(row).forEach((key,value) => {
            
            var sample_labels = key;
            console.log(sample_labels[0]);
            console.log(sample_labels[1]);
            metaData_panel.append("h5").text(`${sample_labels[0]}: ${sample_labels[1]}`)
            
           })
           
        }
      }
    )

  } // 2
  ) // then() ends
  
}   // 1




/*******************************************************/
// Function to plot charts 
function buildCharts(year) {   // 1
  console.log("Inside buildCharts Function")
  console.log(year)

  d3.csv("../static/data/Years_Data_2014_2019.csv").then(sampleData =>{
       console.log(sampleData);
     
       sampleData.forEach((row) => {
        console.log(row.year);
        if(row.year == year)
        {
          console.log("Matched---------------------------------")
          
          sample_values_new = []
          sample_labels_new = []
          //console.log(Object.entries(row))
          Object.entries(row).forEach((key,value) => {
            console.log(key)
            if(key[0] !== 'year')
            {
            console.log("START****************")
            console.log(key)
            sample_labels_new.push(key[0])
            sample_values_new.push(key[1])
            console.log("END*************")
            }
            else
            {
            console.log("WRONG WAY")
            }
           })
           console.log(sample_labels_new);
          console.log(sample_values_new);
        }
      }
      ) 
   

      //// Building a Pie Chart
      var pieData = [{ values: sample_values_new,
                    labels : sample_labels_new,
                    /* hovertext : sample_hoverText_10,
                    hoverinfo:"hovertext", */
                    type:"pie"}]

      var pieLayout = {
        height: 700,
        width: 700,
        title : "Types of Gun Shootings"
      };        
      
      Plotly.newPlot("pie", pieData, pieLayout);


  }  // 2
  ) // then() ends
       
}  // 1


/******************************************************************/
// function to display default contents
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  //d3.json("/years").then((years) => {
  d3.csv("../static/data/Years_Data_2014_2019.csv").then(data =>{
      console.log("inside init.....................")  
      //console.log(data)
    data.forEach((row) => {
      console.log(row);
      selector
        .append("option")
        .text(row.year)
        .property("value", row.year);
      console.log(row.year);  
    });

    // Use the first sample from the list to build the initial plots
    const firstYear = data[0].year;
    //console.log(firstYear)
    buildCharts(firstYear);
    buildMetadata(firstYear);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
