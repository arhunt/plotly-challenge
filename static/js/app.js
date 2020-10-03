// Some code from bargraph, infocard, dropchng, pageload functions
// from office hours discussions with Dom

// BAR GRAPH of Top 10
function bargraph(subject) {
    console.log("Bar graph for:", subject);
    d3.json("samples.json").then
    ( (data) =>
    {   // Define data pertaining to subject
        var subjsmpl = data.samples.filter(s => s.id == subject)[0];
            // Ensure sample populates correctly for subject
            // console.log(subjsmpl);
        // Grab remaining results -- these seem to be already sorted?
        var otuIDs = subjsmpl.otu_ids;
        var otunames = subjsmpl.otu_labels;
        var measures = subjsmpl.sample_values;
        // Construct plot
        var barYticks = otuIDs.slice(0, 10).map(i => `OTU ${i} `).reverse();
            // Ensure ticks populate correctly
            // console.log(barYticks);
        // Construct graph
        var barData = {
            x: measures.slice(0,10).reverse(),
            y: barYticks,
            type: "bar",
            text: otunames.slice(0,10).reverse(),
            orientation: "h",
            marker: {color: otuIDs.slice(0,10).reverse()}
        };
        // Construct layout with labels, align top
        var barLayout = {
            title: "Top 10 Microbial Species Present",
            xaxis: {title: "SAMPLE VALUES"},
            margin: {t: 30},
        };
        // Plot
        Plotly.newPlot("bar", [barData], barLayout)
    });
} 

// BUBBLE PLOT of all OTUs
function bubbplot(subject) {
    console.log("Bubble plot for:", subject)

    d3.json("samples.json").then
    ( (data) =>
    {   // Define data pertaining to subject
        var subjsmpl = data.samples.filter(s => s.id == subject)[0];
        // Retrieve IDs, Labels, and Values
        var otuIDs = subjsmpl.otu_ids;
        var otunames = subjsmpl.otu_labels;
        var measures = subjsmpl.sample_values;
            // Test retrieval
            // console.log(otuIDs);
        // Construct plot with marker size/color corresponding to data
        var bubData = {
            x: otuIDs,
            y: measures,
            marker: {size: measures, color: otuIDs},
            text: otunames,
            mode: "markers"
        };
        // Construct layout with labels
        var bubLayout = {
            title: "Microbial Cultures in Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "SAMPLE VALUES"}
        };
        Plotly.newPlot("bubble", [bubData], bubLayout);
    });
}

// INFO BOX containing demographic info
function infocard(subject)
{
    console.log("Info card for:", subject)
    
    d3.json("samples.json").then
    ( (data) =>
    {
        // Define metadata pertaining to subject
        var subjmeta = data.metadata.filter(md => md.id == subject)[0];
            // Test retrieval
            // console.log(subjmeta);

        var card = d3.select("#sample-metadata");
        card.html("");

        Object.entries(subjmeta).forEach
        ( ([key, value]) =>
        {
            var lineID = `${key}: ${value}`;
            card.append("h6").text(lineID);
            // card.append("h6").text(key);
            // card.append("h6").text(value);
        });
    });
}

// BONUS: GAUGE showing wash frequency

function gaugecht(subject)
{
    console.log("Gauge for:", subject)
    d3.json("samples.json").then
    ( (data) =>
    {   // Define frequency of wash for subject within metadata entry
        var washfreq = data.metadata.filter(md => md.id == subject)[0].wfreq;
        console.log("Wash Frequency for", subject, "is:", washfreq, "/ week");

        // Determine range of gauge, max is 9 as provided in instructions
        var allwashes = data.metadata.map(md => md.wfreq);
        var maxwash = d3.max(allwashes)
        // console.log(maxwash)

        // Construct gauge with 
        // much of the code below lifted from
            // example at https://plotly.com/javascript/gauge-charts/
        var gagData = {
                domain: { x: [0, 1], y: [0, 1] },
                value: washfreq,
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, maxwash], dtick: 1 },
                    bar: { color: "rgb(180,64,64)" , thickness: 0.4},
                    bgcolor: "rgb(252, 232, 209)",
                    steps: [
                        { range: [0, maxwash/3],
                            color:"rgb(255, 192, 192)",
                            line: {color: "black", width: "0.25"}},
                        { range: [maxwash/3, maxwash*2/3],
                            color:"rgb(255, 224, 192)",
                            line: {color: "black", width: "0.25"}},
                        { range: [maxwash*2/3, maxwash],
                            color:"rgb(240, 232, 224)",
                            line: {color: "black", width: "0.25"}},
                    ]
                }
        }
        // Layout with title and top alignment
        var gagLayout = {
            title: "Weekly Wash Frequency",
            height: 350,
            margin: { t: 30 }
        };
        Plotly.newPlot("gauge", [gagData], gagLayout);
    });
}

// Refresh when changing option from dropdown
function dropchng(newSubject) {
    console.log("Subject selected:", newSubject);
    bargraph(newSubject);
    bubbplot(newSubject);
    infocard(newSubject);
    gaugecht(newSubject);
}

function pageload() {
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
        ( (subject) =>
        {
            selector.append("option")
            .text(subject)
            .property("value");
        });
        // Initial sample information
        var firstSubject = subjects[0];
        console.log("Starting sample:", firstSubject);
        // Draw the graphs
        bargraph(firstSubject);
        bubbplot(firstSubject);
        infocard(firstSubject);
        gaugecht(firstSubject);
    });
}

pageload();