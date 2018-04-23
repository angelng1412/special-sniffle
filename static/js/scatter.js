var pluralize = function(word, num) {
  return (num == 1) ? word : word + "s";
};

var xdata = [];
var ydata = [];

var get_data = function() {
  $.ajax({
    url: 'http://localhost:5000/get_scatter',
    success: function(d) {
      var j = JSON.parse(d);
      Object.keys(j).forEach(function(key) {
        xdata.push(j[key]["rating"]);
        ydata.push(j[key]["num_photos"]);
      });
    },
    async: false
  });
};
get_data();

var margin = {top: 20, right: 15, bottom: 60, left: 60};
var width = 960 - margin.left - margin.right;
var height = 850 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, d3.max(xdata)])
    .range([ 0, width ]);

var y = d3.scale.linear()
    .domain([0, d3.max(ydata)])
    .range([ height, 0 ]);

var chart = d3.select('#chart')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart');

var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main');

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

main.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .attr('class', 'main axis date')
  .call(xAxis);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

main.append('g')
  .attr('transform', 'translate(0,0)')
  .attr('class', 'main axis date')
  .call(yAxis);

var g = main.append("svg:g");

g.selectAll("scatter-dots")
  .data(ydata)
  .enter().append("svg:circle")
  .attr("cy", function (d) { return y(d); } )
  .attr("cx", function (d,i) { return x(xdata[i]); } )
  .attr("r", 10)
  .attr("fill", "lightsteelblue")
  .append("title")
  .html(function(d, i) { return d + pluralize(" Photo", d) + ", " + xdata[i] + pluralize(" Star", xdata[i]); });

g.selectAll("x-axis").data(["Rating"]).enter().append("text").attr("x", width/2).attr("y", height+50).attr("text-anchor","middle").text(function(d) { return d; });
g.selectAll("y-axis").data(["Number of Photos"]).enter().append("text").attr("x", 15).attr("y", height/2 - 50).attr("text-anchor", "middle").attr("transform", function() { return "rotate(270 15 " + height/2 + ")"; }).text(function(d) { return d; });
