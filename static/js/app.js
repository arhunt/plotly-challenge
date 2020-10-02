// Some code from bargraph, infocard, dropchng, pageload functions
// from office hours discussions with Dom

// **Placeholder for bar graph
function bargraph(subject)
{
    console.log("Bar graph for:", subject);
    
    d3.json("samples.json").then
    ( (data) =>
    {   // Define data pertaining to subject
        var subjsmpl = data.samples.filter(s => s.id == subject)[0];
        // Ensure sample populates correctly for subject
        console.log(subjsmpl);
        // Grab remaining results -- do we need to sort here?
        var otuIDs = subjsmpl.otu_ids;
        var otunames = subjsmpl.otu_labels;
        var measures = subjsmpl.sample_values;
        // Construct plot
        var barYticks = otuIDs.slice(0, 10).map(i => `OTU ${i} `).reverse();
        // Ensure ticks populate correctly
        console.log(barYticks);
        // Construct graph
        var barData = {
            x: measures.slice(0,10).reverse(),
            y: barYticks,
            type: "bar",
            text: otunames.slice(0,10).reverse(),
            orientation: "h",
            marker: {color: otuIDs.slice(0,10).reverse()}
            // marker: {color: "tan"}
        };
        // Provide layout
        var barLayout = {
            title: "Top 10 Microbial Species Present",
            xaxis: {title: "SAMPLE VALUES"},
            margin: {t: 30},
            // margin: {t: 30, 1: 150},
        };
        // Plot
        Plotly.newPlot("bar", [barData], barLayout)
    }
    );
} 

// **Placehlolder for bubble plot
function bubbplot(subject) 
{
    console.log("Bubble plot for:", subject)
    d3.json("samples.json").then
    ( (data) =>
    {
        var subjsmpl = data.samples.filter(s => s.id == subject)[0];
        var otuIDs = subjsmpl.otu_ids;
        var otunames = subjsmpl.otu_labels;
        var measures = subjsmpl.sample_values;

        var bubData = {
            x: otuIDs,
            y: measures,
            marker: {size: measures, color: otuIDs},
            text: otunames,
            mode: "markers"
        };

        var bubLayout = {
            title: "Microbial Cultures in Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "SAMPLE VALUES"}
        };

        Plotly.newPlot("bubble", [bubData], bubLayout);
    }
    );

}

// **Placeholder for info box
function infocard(subject)
{
    console.log("Info card for:", subject)
    
    d3.json("samples.json").then
    ( (data) =>
    {
        // Define metadata pertaining to subject
        var subjmeta = data.metadata.filter(md => md.id == subject)[0];
        console.log(subjmeta);

        var card = d3.select("#sample-metadata");
        card.html("");

        Object.entries(subjmeta).forEach
        (([key, value]) =>
        {
            var lineID = `${key}: ${value}`;
            card.append("h6").text(lineID);
            // card.append("h6").text(key);
            // card.append("h6").text(value);
        }        
        );
    }
    );
}

// **Placeholder for gauge
function gaugecht(subject)
{
    console.log("Gauge for:", subject)
}

// Refresh when changing option from dropdown
function dropchng(newSubject)
{
    console.log("Subject selected:", newSubject);
    bargraph(newSubject);
    bubbplot(newSubject);
    infocard(newSubject);
    gaugecht(newSubject);
}

function pageload()
{
    // Grab the selector
    var selector = d3.select("#selDataset");
    // Use the info from the json to load the page
    d3.json("samples.json").then
    ( (data) =>
    {   // Make sure the data loads
        console.log(data);
        // Define the list of test subjects
        var subjects = data.names;
        // Make sure the subject list loads
        console.log(subjects);
        // Load the subject list into the selector
        subjects.forEach
        ((subject) =>
        {
            selector.append("option")
            .text(subject)
            .property("value");
        }
        );
        // Initial sample information
        var firstSubject = subjects[0];
        console.log("Starting sample:", firstSubject);
        // Draw the graphs
        bargraph(firstSubject);
        bubbplot(firstSubject);
        infocard(firstSubject);
        gaugecht(firstSubject);
    }
    );
}

pageload();