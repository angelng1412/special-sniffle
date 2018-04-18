var pieChartSection = document.getElementById("pieChart");
var dataset = null;
var getState = function(key){};
var makePieChartData = function(data){
	var count = {};
	var pie = [];
	var keys = data.keys();
	var i = 0;
	var total = 0;
	while(i < keys.length){
		var state = getState(keys[i])
		if( state == undefined ){
			count[state] = 1;
			total += 1;
		}
		else{
			count[state] += 1;
			total += 1;
		}
	}
	i = 0;
	keys = count.keys()
	while(i < keys.length){
		pie.append([keys[i], (count[keys[i]] / total) * 2 * Math.PI]);
	}
	return pie
};

var makeCanvas = function(width, height){
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
};

var drawPieChart = function(canvas,pieData){
	var ctx = canvas.getContext("2d");
	var start = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	for(var i = 0; i < pie.length; i++){
		var end = start + pie[i][1];
		ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, start, end);
		ctx.stroke();
		ctx.fill();
		start = end;
	}
};

var createPieChart = function(){
	var canvas = makeCanvas(1000,1000);
	d3.json("../../data/scatter.json", function(data){
		dataset = data;
	}
	var pieData = makePieChartData(dataset);
	pieChartSection.appendChild(canvas);
	drawPieChart(canvas, pieData);
};
