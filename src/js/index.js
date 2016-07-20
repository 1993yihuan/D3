$(function() {
  var appendF, body, datumF, svgA, svgB;
  body = d3.select("body");
  datumF = function() {
    var h, p;
    p = body.selectAll("p");
    p.datum('hello').text(function(d, i) {
      return "第 " + i + " 个元素绑定的数据是 " + d;
    });
    h = body.selectAll("h1");
    h.data([1, 2]).text(function(d, i) {
      return d;
    });
    return true;
  };
  appendF = function() {
    return body.selectAll(".sel").append('p').text('这个是插入的内容');
  };
  svgA = function() {
    var axis, dataset, linear, rectHeight, svg;
    rectHeight = 25;
    dataset = [1, 2.0, 1.7, 1.3, 0.9];
    linear = d3.scale.linear().domain([0, d3.max(dataset)]).range([0, 500]);
    axis = d3.svg.axis().scale(linear).orient("bottom").ticks(10);
    svg = d3.select(".svgA").append('svg').attr('height', 200).attr('width', '100%');
    svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", 0).attr("y", function(d, i) {
      return i * rectHeight;
    }).attr("width", function(d) {
      return linear(d);
    }).attr("height", rectHeight - 5).attr("fill", "#dcd");
    d3.select(".svgA").append('svg').attr('class', 'axis').attr('height', '20').attr('width', '100%').append("g").call(axis);
    return true;
  };
  svgA();
  svgB = function() {
    var rectPadding, svg, svgBdata, xAxis, xScale, yAxis, yScale;
    rectPadding = 4;
    svgBdata = {
      dataset: [20, 60, 30, 40, 53, 24, 32, 5],
      width: 400,
      height: 400
    };
    xScale = d3.scale.ordinal().domain(d3.range(svgBdata.dataset.length)).rangeRoundBands([0, svgBdata.width]);
    yScale = d3.scale.linear().domain([0, d3.max(svgBdata.dataset)]).range([svgBdata.height, 0]);
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    svg = d3.select(".svgB").append("svg").attr("width", svgBdata.width).attr("height", svgBdata.height).style("padding", "10 40 1 40");
    svg.selectAll(".MyRect").data(svgBdata.dataset).enter().append("rect").on("click", function() {
      return $(this).attr('fill', 'red');
    }).attr("class", "MyRect").attr("fill", "#dcd").attr("x", function(d, i) {
      return xScale(i) + rectPadding / 2;
    }).attr("y", 400).transition().ease('linear').duration(2000).delay(function(d, i) {
      return i * 100;
    }).attr("y", function(d) {
      return yScale(d);
    }).attr("width", xScale.rangeBand() - rectPadding).attr("height", function(d) {
      return svgBdata.height - yScale(d);
    });
    svg.selectAll(".MyText").data(svgBdata.dataset).enter().append("text").attr("class", "MyText").attr("x", function(d, i) {
      return xScale(i) + rectPadding / 2;
    }).attr("y", function(d) {
      return yScale(d);
    }).attr("dx", function() {
      return (xScale.rangeBand() - rectPadding) / 2;
    }).attr("dy", function(d) {
      return 20;
    }).attr("text-anchor", "middle").attr("fill", "#fff").text(function(d) {
      return d;
    });
    svg.append("g").attr("class", "axis yaxis").call(yAxis);
    d3.select(".svgB").append('svg').attr('class', 'axis').attr('height', '20').attr('width', '100%').append("g").attr("class", "axis").attr("transform", "translate(40,0)").call(xAxis);
    $('.yaxis').find('g:first').hide();
    return true;
  };
  return svgB();
});
