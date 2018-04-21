var svg = document.getElementById("slate");
var width = Number(svg.getAttribute("width"));
var height = Number(svg.getAttribute("height"));
var container = d3.select("svg");
x.length = 500;
y.length = 500;
var x_max = Math.max(...x), y_max = Math.max(...y);
var x_axis = "Rating";
var y_axis = "Number of Photos";

var clear_svg = function() {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
};

var graph = function (numx, numy, xlabels, ylabels, pointlabels) {
  clear_svg();
  var num_xticks = numx, num_yticks = numy;
  var y_scale = y_max/(height - (height/num_yticks));
  var x_scale = x_max/((num_xticks-1)*(width/num_xticks));
  var points = container.selectAll("circle").data(x).enter();
  points.append("circle").attr("cx", function(d) { return 50 + d/x_scale; }).attr("cy", function(d, i) { return -25 + height - (y[i]/y_scale); }).attr("fill", "lightsteelblue").attr("r", 10).attr("class", "point");
  if (xlabels) {
    var x_label_data = [];
    for (var i = 0; i<num_xticks; i++) {
      x_label_data.push( ((i*x_max)/(num_xticks-1)).toFixed(2) );
    }
    var x_labels = container.selectAll("#x_label").data(x_label_data).enter();
    x_labels.append("text").attr("x", function(d,i) { return 25 + i*(width/num_xticks); } ).attr("y", height - 25).text(function(d) { return d; });
    container.selectAll("#x_axis").data([x_axis]).enter().append("text").attr("x", width/2).attr("y", height).attr("text-anchor","middle").text(function(d) { return d; });
  }
  if (ylabels) {
    var y_label_data = [];
    for (i = 0; i<num_yticks; i++) {
      y_label_data.push( ((i*y_max)/(num_yticks-1)).toFixed(2) );
    }
    var y_labels = container.selectAll("#y_label").data(y_label_data).enter();
    y_labels.append("text").attr("x", 25).attr("y", function(d,i) { return -25 + (num_yticks-i)*(height/num_yticks); } ).text(function(d) { return d; });
    container.selectAll("#y_axis").data([y_axis]).enter().append("text").attr("x", 15).attr("y", height/2).attr("text-anchor", "middle").attr("transform", function() { return "rotate(270 15 " + height/2 + ")"; }).text(function(d) { return d; });
  }
  if (pointlabels) {
    var point_labels = container.selectAll("#point_label").data(x).enter();
    point_labels.append("text").attr("x", function(d) { return 50 + d/x_scale; }).attr("y", function(d, i) { return -25 + height - (y[i]/y_scale); }).text(function(d, i) { return "" + d + ", " + y[i]; }).attr("text-anchor", "middle");
  }
};

var includex = document.getElementById("x");
var includey = document.getElementById("y");
var includep = document.getElementById("point");
var xtick = document.getElementById("xt");
var ytick = document.getElementById("yt");

var update_graph = function() {
  graph(Number(xtick.value), Number(ytick.value), includex.checked, includey.checked, includep.checked);
};
includex.addEventListener("change", update_graph);
includey.addEventListener("change", update_graph);
includep.addEventListener("change", update_graph);
xtick.addEventListener("change", update_graph);
ytick.addEventListener("change", update_graph);

update_graph();
