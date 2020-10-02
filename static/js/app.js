console.log("This is app.js");

// **Placeholder for bar graph
function bargraph(subject)
{
    console.log("Bar graph for:", subject);
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
function dropchg(newSubject)
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