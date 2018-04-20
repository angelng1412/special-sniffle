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

//got this function from stack overflow
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

var drawPieChart = function(canvas,pieData){
	var ctx = canvas.getContext("2d");
	var start = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	for(var i = 0; i < pieData.length; i++){
		var end = start + pieData[i][1];
		ctx.beginPath();
		ctx.moveTo(centerX,centerY);
		ctx.arc(centerX, centerY, centerX, start, end);
		ctx.fillStyle = rainbow(pieData.length,i);
		ctx.fill();
		start = end;
	}
};

var sortDataH = function(data,index){
	for(var i = index; i >= 0; i--){
		if(data[index][1] > data[i][1]){
			
		}
	}
};

var sortData = function(data){
	//insertion sort
	if(data.length <= 1){
		return data;
	}
	for(var i = 0; i < data.length; i++){
		data.splice(sortDataH(data,i),0,data.pop(i));
	}
	return data
};

var createPieChart = function(){
	d3.json("scatter.json", function(data){
		dataset = sortData(data);
		var pieData = makePieChartData(dataset);
		drawPieChart(canvas, pieData);
	});
};
