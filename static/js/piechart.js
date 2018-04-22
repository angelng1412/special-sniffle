var data, tmp, pie;

var update_piechart = function(rating) {
  $.ajax({
    url: '/get_scatter',
    success: function(d) {
      data = [];
      tmp = {};
      if (pie) pie.destroy();
      var j = JSON.parse(d);
      Object.keys(j).forEach(function(key) {
        var postal_code = j[key]["postal_code"];
        var cur_rating = j[key]["rating"];
        if (cur_rating == rating) {
          (tmp[postal_code] == undefined) ? tmp[postal_code] = 1 : tmp[postal_code] +=1;
        };
      });
      Object.keys(tmp).forEach(function(key) {
        data.push({
          label: key,
          value: tmp[key]
        });
      });
      pie = new d3pie("pieChart", {
        "size": {
          "canvasHeight": 700,
          "canvasWidth": 700
        },
        "data": {
          "sortOrder": "value-desc",
          "content": data
        },
        "labels": {
          "outer": {
            "pieDistance": 32
          },
          "inner": {
            "hideWhenLessThanPercentage": 3
          },
          "mainLabel": {
            "fontSize": 11
          },
          "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
          },
          "value": {
            "color": "#adadad",
            "fontSize": 11
          },
          "lines": {
            "enabled": true
          },
          "truncation": {
            "enabled": true
          }
        },
        "tooltips": {
          "enabled": true,
          "type": "placeholder",
          "string": "{label}: {value} Businesses"
        },
        "effects": {
          "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 8
          }
        },
        "misc": {
          "gradient": {
            "enabled": true,
            "percentage": 100
          }
        }
      });
    },
    async: false
  });
};

var rating_picker = document.getElementById("rating");
var update = function(){
  update_piechart(rating_picker.value);
};
rating_picker.addEventListener("change", update);
update();
