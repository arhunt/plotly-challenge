console.log("This is app.js");

function optionChanged(newSubject)
{
    console.log("Subject selected:",newSubject);
}

function pageload()
{

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
    }
    );

}

pageload();