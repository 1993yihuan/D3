$(function() {
  var appendF, body, color, datumF, svgA, svgB, svgForce, svgMap, svgPie, svgTree;
  body = d3.select("body");
  color = d3.scale.category20();
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
    }).attr("dy", function(d) {
      return 20;
    }).attr("text-anchor", "middle").attr("fill", "#fff").text(function(d) {
      return d;
    }).attr("dx", function() {
      return (xScale.rangeBand() - rectPadding) / 2;
    });
    svg.append("g").attr("class", "axis yaxis").call(yAxis);
    d3.select(".svgB").append('svg').attr('class', 'axis').attr('height', '20').attr('width', '100%').append("g").attr("class", "axis").attr("transform", "translate(40,0)").call(xAxis);
    $('.yaxis').find('g:first').hide();
    return true;
  };
  svgB();
  svgPie = function() {
    var arc, arcs, innerRadius, outerRadius, pie, pieData, piesvg, svg;
    pieData = {
      dataset: [20, 10, 43, 55, 13]
    };
    pie = d3.layout.pie();
    piesvg = pie(pieData.dataset);
    outerRadius = 150;
    innerRadius = 0;
    arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    svg = d3.select(".svgPie").append('svg').attr('height', '400').attr('width', '400');
    arcs = svg.selectAll("g").data(piesvg).enter().append("g").on('mouseover', function() {
      return $(this).css('opacity', 1);
    }).on('mouseout', function() {
      return $(this).css('opacity', 0.6);
    }).style('opacity', 0.6).attr("transform", "translate(150,150)");
    arcs.append("path").attr("fill", function(d, i) {
      return color(i);
    }).attr("d", function(d) {
      return arc(d);
    });
    arcs.append("text").attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    }).attr("text-anchor", "middle").text(function(d) {
      return d.data;
    });
    return true;
  };
  svgPie();
  svgForce = function() {
    var force, forceData, svg, svg_edges, svg_nodes, svg_texts;
    forceData = {
      nodes: [
        {
          name: "桂林"
        }, {
          name: "广州"
        }, {
          name: "厦门"
        }, {
          name: "杭州"
        }, {
          name: "上海"
        }, {
          name: "青岛"
        }, {
          name: "天津"
        }
      ],
      edges: [
        {
          source: 0,
          target: 1
        }, {
          source: 0,
          target: 2
        }, {
          source: 0,
          target: 3
        }, {
          source: 0,
          target: 4
        }, {
          source: 0,
          target: 5
        }, {
          source: 5,
          target: 6
        }, {
          source: 6,
          target: 0
        }
      ]
    };
    svg = d3.select(".svgForce").append('svg').attr('height', '500').attr('width', '100%');
    force = d3.layout.force().nodes(forceData.nodes).links(forceData.edges).size([500, 500]).linkDistance(150).charge([-1000]);
    force.start();
    svg_edges = svg.selectAll("line").data(forceData.edges).enter().append("line").style("stroke", "#ccc").style("stroke-width", 1);
    svg_nodes = svg.selectAll("circle").data(forceData.nodes).enter().append("circle").on('mousedown', function() {
      $(this).parent().find('circle').css('opacity', 0.3);
      $(this).parent().find('line').css('opacity', 0.3);
      $(this).css('opacity', 1);
      $(this).attr('r', 30);
      return $(this).parent().find('text[data-link=' + $(this).attr("text-link") + ']').attr('dx', 30);
    }).on('mouseup', function() {
      $(this).parent().find('circle').css('opacity', 1);
      $(this).attr('r', 20);
      return $(this).parent().find('text[data-link=' + $(this).attr("text-link") + ']').attr('dx', 20);
    }).attr("r", 20).attr('text-link', function(d, i) {
      return i;
    }).style("fill", function(d, i) {
      return color(i);
    }).call(force.drag);
    svg_texts = svg.selectAll("text").data(forceData.nodes).enter().append("text").style("fill", function(d, i) {
      return color(i);
    }).attr("dx", 20).attr("dy", 8).attr('data-link', function(d, i) {
      return i;
    }).text(function(d) {
      return d.name;
    });
    force.on("tick", function() {
      svg_edges.attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });
      svg_nodes.attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
      return svg_texts.attr("x", function(d) {
        return d.x;
      }).attr("y", function(d) {
        return d.y;
      });
    });
    return true;
  };
  svgForce();
  svgTree = function() {
    var diagonal, height, svg, tree, width;
    width = 500;
    height = 500;
    tree = d3.layout.tree().size([width, height - 200]).separation(function(a, b) {
      return (a.parent === b.parent ? 1 : 2);
    });
    diagonal = d3.svg.diagonal().projection(function(d) {
      return [d.y, d.x];
    });
    svg = d3.select(".svgTree").append("svg").attr("width", width).attr("height", height);
    d3.json('city_tree.json', function(error, root) {
      var link, links, node, nodes;
      nodes = tree.nodes(root);
      links = tree.links(nodes);
      console.log(links);
      link = svg.selectAll(".link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal);
      node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
      node.append("circle").attr("r", 4.5);
      return node.append("text").attr("dx", function(d) {
        if (d.children) {
          return -8;
        } else {
          return 8;
        }
      }).attr("dy", 3).style("text-anchor", function(d) {
        if (d.children) {
          return "end";
        } else {
          return "start";
        }
      }).text(function(d) {
        return d.name;
      });
    });
    return true;
  };
  svgTree();
  svgMap = function() {
    var height, path, projection, svg, width;
    width = 1000;
    height = 1000;
    svg = d3.select(".svgMap").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(0,0)");
    projection = d3.geo.mercator().center([107, 31]).scale(850).translate([width / 2, height / 2]);
    path = d3.geo.path().projection(projection);
    d3.json("china.geojson", function(error, root) {
      if (error) {
        return console.error(error);
      }
      console.log(root.features);
      return svg.selectAll("path").data(root.features).enter().append("path").attr("stroke", "#000").attr("stroke-width", 1).attr("fill", function(d, i) {
        return color(i);
      }).attr("d", path).attr("text", function(d, i) {
        return d.properties.name;
      }).on("mouseover", function(d, i) {
        d3.select(this).attr("fill", "yellow");
        return d3.select('.mapText').text(d3.select(this).attr("text"));
      }).on("mouseout", function(d, i) {
        d3.select(this).attr("fill", color(i));
        return d3.select('.mapText').text('');
      });
    });
    return true;
  };
  return svgMap();
});
