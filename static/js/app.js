// grab url and check json data 


const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
    console.log(data);
});


// grab data from JSON to plot out charts


var samples;
var meta_data;

d3.json(url).then(function(data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {selector.append("option").text(id).property("value", id);});
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function optionChanged(value) {
    const selectId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);
    metaData(demographicInfo);
    hbarChart(selectId);
    bubbleChart(selectId);
}


// function for the metadata chart


function metaData(demographicInfo) {
    let demo = d3.select("#sample-metadata");
    demo.html(
        `id: ${demographicInfo.id} <br>
        ethnicity: ${demographicInfo.ethnicity} <br>
        gender: ${demographicInfo.gender} <br>
        age: ${demographicInfo.age} <br>
        location: ${demographicInfo.location} <br>
        bbtype: ${demographicInfo.bbtype} <br>
        wfreq: ${demographicInfo.wfreq}`
    );
}


// function for the horizontal bar chart


function hbarChart(selectId) {
    let xAxis = selectId.sample_values.slice(0, 10).reverse();
    let yAxis = selectId.otu_ids.slice(0, 10).reverse().map((item) => `OTU ${item}`);
    let labels = selectId.otu_labels.slice(0, 10).reverse();

    traceBar = {
        x: xAxis,
        y: yAxis,
        text: labels,
        type: "bar",
        orientation: "h",
        marker: {
            color: "red"
        }
    };

    let layout = {
        height: 400,
        width: 500,
        margin: {
            t: 10
        }
    };

    let barData = [traceBar];
    Plotly.newPlot("bar", barData, layout);
}


// function for the bubble chart


function bubbleChart(selectId) {
    let xAxis = selectId.otu_ids;
    let yAxis = selectId.sample_values;
    let color = selectId.otu_ids;
    let labels = selectId.otu_labels;
    let markerSize = selectId.sample_values;

    traceBubble = {
        x: xAxis,
        y: yAxis,
        text: labels,
        type: "bubble",
        mode: "markers",
        marker: {
            color: color,
            size: markerSize,
            colorscale: "Portland"
        }
    };

    let layout = {
        height: 700,
        width: 1200,
        xaxis: {
            title: {
                text: "OTU ID"
            }
        }
    };

    let bubbleData = [traceBubble];
    Plotly.newPlot("bubble", bubbleData, layout);
}