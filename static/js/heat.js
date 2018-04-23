var pluralize = function(word, num) {
  return (num == 1) ? word : word + "s";
};

var margin = { top: 50, right: 0, bottom: 100, left: 70 };
var width = 1200;
var height = 430;
var gridSize = Math.floor((width - margin.left - margin.right) / 24);
var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//make day labels
svg.selectAll(".dayLabel")
  .data(days)
  .enter().append("text")
  .text(function (d) { return d; })
  .attr("x", -5)
  .attr("y", function (d, i) { return (i + 0.5) * gridSize; })
  .style("text-anchor", "end")
  .attr("class", function (d, i) { return "dayLabel mono axis axis-workweek"; });

//make time labels
svg.selectAll(".timeLabel")
  .data(times)
  .enter().append("text")
  .text(function(d) { return d; })
  .attr("x", function(d, i) { return (i + 0.5) * gridSize; })
  .attr("y", -5)
  .style("text-anchor", "middle")
  .attr("class", function(d, i) { return "timeLabel mono axis axis-worktime"; });

var heatmapChart = function(csvFile) {
  d3.csv(csvFile,
         function(d) {
           return {
             day: +d.day,
             hour: +d.hour,
             value: +d.value
           };
         },
         function(error, data) {
           var colorScale = d3.scale.quantile()
               .domain([0, 8, d3.max(data, function (d) { return d.value; })])
               .range(colors);

           var cards = svg.selectAll(".hour").data(data);

           cards.enter().append("rect")
             .attr("x", function(d) { return (d.hour) * gridSize; })
             .attr("y", function(d) { return (d.day) * gridSize; })
             .attr("rx", 4)
             .attr("ry", 4)
             .attr("class", "hour bordered")
             .attr("width", gridSize)
             .attr("height", gridSize)
             .style("fill", colors[0])
             .append("title");

           cards.transition().duration(1000)
             .style("fill", function(d) { return colorScale(d.value); });

           cards.select("title").html(function(d) {
             return d.value + " Yelp " + pluralize("Check-In", d.value) + " on " + days[d.day] + " at " +  times[d.hour];
           });

           cards.exit().remove();

         });
};

var datapicker = $("#dataset");
var update = function(e) {
  $.ajax({
    url: '/get_bid',
    type: 'POST',
    data: {"name": datapicker.val()},
    success: function(d) {
      heatmapChart("/data/csv/" + d);
    }
  });
};
datapicker.select2();
datapicker.on("change", update);
update();
