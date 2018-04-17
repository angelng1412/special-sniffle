var dataset = null;
var getState = function(){};
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

};

var createPieChart = function(){
	var canvas = makeCanvas(1000,1000);
	var pieData = makePieChartData(dataset);
	drawPieChart(canvas, pieData);
	//to be implemented, insert pie chart to dom
};
