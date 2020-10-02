console.log("This is app.js");

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
        var barData = {
            x: measures.slice(0,10).reverse(),
            y: barYticks,
            type: "bar",
            text: otunames.slice(0,10).reverse(),
            orientation: "h",
            marker: {color: "tan"}
        }
        var barLayout = {
            title: "Top 10 Microbial Species Present",
            margin: {t: 30},
            // margin: {t: 30, 1: 150},
        };

        Plotly.newPlot("bar", [barData], barLayout)
    }
    );
} 

// **Placehlolder for bubble plot
function bubbplot(subject) 
{
    console.log("Bubble plot for:", subject)
}

// **Placeholder for info box
function infocard(subject)
{
    console.log("Info card for:", subject)
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