var pieChartSection = document.getElementById("pieChart");
var dataset = null;
var canvas = document.getElementsByTagName("canvas")[0];
var getPostalCode = function(key){
	return dataset[key]["state"];
};
var makePieChartData = function(data){
	var count = {};
	var pie = [];
	var total = 0;
	for(key in data){
		var state = getPostalCode(key)
		if( count[state] == undefined ){
			count[state] = 1;
			total += 1;
		}
		else{
			count[state] += 1;
			total += 1;
		}
	}
	for(key in count){
		pie.push([key, (count[key] / total) * 2 * Math.PI]);
	}
	return pie
};

var drawPieChart = function(canvas,pieData){
	var ctx = canvas.getContext("2d");
	var start = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	for(var i = 0; i < pieData.length; i++){
		ctx.beginPath();
		var end = start + pieData[i][1];
		ctx.moveTo(centerX,centerY);
		ctx.arc(centerX, centerY, centerX, start, end);
		ctx.lineTo(centerX,centerY);
		ctx.stroke();
		ctx.fill();
		start = end;
	}
};

var createPieChart = function(){
	d3.json("scatter.json", function(data){
		dataset = data;
	});
	var pieData = makePieChartData(dataset);
	drawPieChart(canvas, pieData);
};
