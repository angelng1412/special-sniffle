var data = null;
var getState = function(){};
var count = {};
var pie = [];
var makePieChartData = function(){
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
	keys = pie.keys()
	while(i < keys.length){
		pie.append([keys[i], (count[keys[i]] / total) * 2 * Math.PI]);
	}
};
