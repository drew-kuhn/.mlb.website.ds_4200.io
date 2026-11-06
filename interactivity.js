// Draws a simple D3 bar chart of 2024 home runs into the element with id "chart"
function drawHomeRunChart() {
    var data = [
        { player: "Aaron Judge", hr: 58 },
        { player: "Shohei Ohtani", hr: 54 },
        { player: "Anthony Santander", hr: 44 },
        { player: "Juan Soto", hr: 41 },
        { player: "Jose Ramirez", hr: 39 }
    ];

    var width = 600, height = 300;
    var margin = { top: 20, right: 30, bottom: 40, left: 140 };

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);

    var x = d3.scaleLinear().domain([0, 65]).range([margin.left, width - margin.right]);
    var y = d3.scaleBand().domain(data.map(function (d) { return d.player; }))
        .range([margin.top, height - margin.bottom]).padding(0.2);

    svg.selectAll("rect").data(data).join("rect")
        .attr("x", margin.left)
        .attr("y", function (d) { return y(d.player); })
        .attr("width", function (d) { return x(d.hr) - margin.left; })
        .attr("height", y.bandwidth())
        .attr("fill", "firebrick");

    svg.selectAll(".label").data(data).join("text")
        .attr("class", "label")
        .attr("x", function (d) { return x(d.hr) + 5; })
        .attr("y", function (d) { return y(d.player) + y.bandwidth() / 2 + 5; })
        .text(function (d) { return d.hr; });

    svg.append("g").attr("transform", "translate(" + margin.left + ",0)").call(d3.axisLeft(y));
    svg.append("g").attr("transform", "translate(0," + (height - margin.bottom) + ")").call(d3.axisBottom(x));
    svg.append("text").attr("x", width / 2).attr("y", height - 5).text("Home runs");
}

window.addEventListener("load", drawHomeRunChart);
