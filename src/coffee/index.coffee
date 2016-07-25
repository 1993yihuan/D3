 $ ->
    body = d3.select("body");
    color = d3.scale.category20();
    #datum()
    datumF = () ->
        p = body.selectAll("p");
        p.datum('hello').text((d,i)->
            return "第 "+ i + " 个元素绑定的数据是 " + d;
        );
        #data()
        h = body.selectAll("h1");
        h.data([1,2]).text((d,i)->
            return d;
        );
        true;
    # append()
    appendF = ()->
        body.selectAll(".sel").append('p').text('这个是插入的内容');
    #SVG第一步
    svgA = ()->
        rectHeight = 25;
        dataset = [ 1 , 2.0 , 1.7 , 1.3 , 0.9 ]; #定义比例
        linear = d3.scale.linear() #线性分布
                .domain([0, d3.max(dataset)])
                .range([0, 500]); #数字范围
        axis = d3.svg.axis()
                .scale(linear)
                .orient("bottom")
                .ticks(10);

        svg = d3.select(".svgA").append('svg').attr('height',200).attr('width','100%');
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect") #增加不定数量的rect
            .attr("x",0)
            .attr("y",(d,i)->
                 return i * rectHeight;
            )
            .attr("width",(d)->
                 return linear(d);
            )
            .attr("height",rectHeight-5)
            .attr("fill","#dcd");
        d3.select(".svgA").append('svg').attr('class','axis').attr('height','20').attr('width','100%').append("g").call(axis);#插入坐标轴
        true;
    svgA();


    #SVG第二步
    svgB = ()->
        rectPadding = 4;
        svgBdata = {
            dataset: [20, 60, 30, 40, 53, 24, 32, 5],
            width: 400,
            height: 400
        };
        xScale = d3.scale.ordinal()
                .domain(d3.range(svgBdata.dataset.length))
                .rangeRoundBands([0, svgBdata.width]);#x轴比例尺
        yScale = d3.scale.linear()
                .domain([0,d3.max(svgBdata.dataset)])
                .range([svgBdata.height, 0]);#y轴比例尺
        xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");#x轴
        yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");#y轴
        svg = d3.select(".svgB").append("svg").attr("width", svgBdata.width).attr("height", svgBdata.height).style("padding","10 40 1 40");

        svg.selectAll(".MyRect")
            .data(svgBdata.dataset)
            .enter()
            .append("rect")
            .on("click",()->
                $(this).attr('fill','red')
            )
            .attr("class","MyRect")
            .attr("fill","#dcd")
            .attr("x",(d,i)->
                return xScale(i)+rectPadding/2;
            )

            .attr("y",400)
            .transition()
            .ease('linear')
            .duration(2000)
            .delay((d,i)->
                return i*100;
            )
            .attr("y",(d)->
                return yScale(d);
            )

            .attr("width", xScale.rangeBand()-rectPadding)
            .attr("height",(d)->
                return svgBdata.height - yScale(d);
            )


        svg.selectAll(".MyText")
            .data(svgBdata.dataset)
            .enter()
            .append("text")
            .attr("class","MyText")
            .attr("x",(d,i)->
                return xScale(i)+rectPadding/2;
            )
            .attr("y",(d)->
                return yScale(d);
            )

            .attr("dy",(d)->
                return 20;
            )
            .attr("text-anchor","middle")
            .attr("fill","#fff")
            .text((d)->
                return d;
            )
            .attr("dx",()->
                return (xScale.rangeBand() - rectPadding)/2;
            );

        svg.append("g")
          .attr("class","axis yaxis" )
          .call(yAxis);
        d3.select(".svgB").append('svg').attr('class','axis').attr('height','20').attr('width','100%').append("g")
            .attr("class","axis")
            .attr("transform","translate(40,0)")
            .call(xAxis);
        $('.yaxis').find('g:first').hide();
        true
    svgB();
    #饼状图
    svgPie = ()->
        #定义数据
        pieData = {
            dataset:[ 20 , 10 , 43 , 55 , 13 ],
        };
        pie = d3.layout.pie();
        piesvg = pie(pieData.dataset);

        #定义生成器
        outerRadius = 150;
        innerRadius = 0;
        arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        #添加元素
        svg = d3.select(".svgPie").append('svg').attr('height','400').attr('width','400');
        arcs = svg.selectAll("g")
            .data(piesvg)
            .enter()
            .append("g")
            .on('mouseover',()->
                $(this).css('opacity',1)
            )
            .on('mouseout',()->
                $(this).css('opacity',0.6)
            )
            .style('opacity',0.6)
            .attr("transform","translate(150,150)");

        arcs.append("path")
            .attr("fill",(d,i)->
                return color(i);
            )
            .attr("d",(d)->
                return arc(d);
            );
        arcs.append("text")
            .attr("transform",(d)->
                return "translate(" + arc.centroid(d) + ")";
            )
            .attr("text-anchor","middle")
            .text((d)->
                return d.data;
            );
        true
    svgPie();
    # 力导向图
    svgForce = ()->
        #定义数据
        forceData = {
            nodes : [ { name: "桂林" }, { name: "广州" },
                      { name: "厦门" }, { name: "杭州" },
                      { name: "上海" }, { name: "青岛" },
                      { name: "天津" }
                    ],
            edges : [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
                      { source : 0 , target: 3 } , { source : 0 , target: 4 } ,
                      { source : 0 , target: 5 } , { source : 5 , target: 6 }, { source : 6 , target: 0 }
                    ]
        };

        #定义生成器
        svg = d3.select(".svgForce").append('svg').attr('height','500').attr('width','100%');

        force = d3.layout.force()
            .nodes(forceData.nodes)
            .links(forceData.edges)
            .size([500,500])
            .linkDistance(150)
            .charge([-1000]);
        force.start();

        #绘图
        svg_edges = svg.selectAll("line")
            .data(forceData.edges)
            .enter()
            .append("line")
            .style("stroke","#ccc")
            .style("stroke-width",1);

        svg_nodes = svg.selectAll("circle")
            .data(forceData.nodes)
            .enter()
            .append("circle")
            .on('mousedown',()->
                $(this).parent().find('circle').css('opacity',0.3);
                $(this).parent().find('line').css('opacity',0.3);
                $(this).css('opacity',1);
                $(this).attr('r',30);
                $(this).parent().find('text[data-link='+$(this).attr("text-link")+']').attr('dx',30)
            )
            .on('mouseup',()->
                $(this).parent().find('circle').css('opacity',1);
                $(this).attr('r',20);
                $(this).parent().find('text[data-link='+$(this).attr("text-link")+']').attr('dx',20)
            )
            .attr("r",20)
            .attr('text-link',(d,i)->
                return i;
            )
            # .attr('data-source',(d,i)->
            #     data = [];
            #     for item in forceData.edges
            #         if item.target.index is i
            #             data.push(item.source.index)
            #     console.log(data);
            # )
            .style("fill",(d,i)->
                return color(i);
            )
            .call(force.drag);

        svg_texts = svg.selectAll("text")
            .data(forceData.nodes)
            .enter()
            .append("text")
            .style("fill", (d,i)->
                return color(i);
            )
            .attr("dx", 20)
            .attr("dy", 8)
            .attr('data-link',(d,i)->
                return i;
            )
            .text((d)->
               return d.name;
            );
        force.on("tick", ()->
            svg_edges.attr("x1",(d)-> return d.source.x; )
                .attr("y1",(d)-> return d.source.y; )
                .attr("x2",(d)-> return d.target.x; )
                .attr("y2",(d)-> return d.target.y; );

            svg_nodes.attr("cx",(d)-> return d.x; )
                .attr("cy",(d)-> return d.y; );

            svg_texts.attr("x", (d)-> return d.x; )
               .attr("y", (d)-> return d.y; );
        );
        true
    svgForce();
    # 树状图
    svgTree = ()->
        width = 500;
        height = 500;

        tree = d3.layout.tree()
            .size([width, height-200])
            .separation((a, b)->
                return (if a.parent == b.parent then 1 else 2);
            );

        diagonal = d3.svg.diagonal()
            .projection((d)->
                return [d.y, d.x];
            );

        svg = d3.select(".svgTree").append("svg")
        	.attr("width", width)
        	.attr("height", height);


        d3.json('city_tree.json', (error, root)->
            nodes = tree.nodes(root);
            links = tree.links(nodes);
            console.log(links);
            link = svg.selectAll(".link")
            	.data(links)
            	.enter()
            	.append("path")
            	.attr("class", "link")
            	.attr("d", diagonal);

            node = svg.selectAll(".node")
        	    .data(nodes)
        	    .enter()
        	    .append("g")
        	    .attr("class", "node")
        	    .attr("transform", (d)->
                    return "translate(" + d.y + "," + d.x + ")";
                )
            node.append("circle")
        	    .attr("r", 4.5);

            node.append("text")
        	    .attr("dx", (d)->
                    return  if d.children then -8 else 8;
                )
        	    .attr("dy", 3)
        	    .style("text-anchor", (d)->
                    return if d.children then "end" else "start";
                )
        	    .text( (d)->
                    return d.name;
                );
            )
        true
    svgTree();
    # 地图绘制
    svgMap = ()->
        width  = 1000;
        height = 1000;

        svg = d3.select(".svgMap").append("svg")
    	    .attr("width", width)
    	    .attr("height", height)
    	    .append("g")
    	    .attr("transform", "translate(0,0)");
        projection = d3.geo.mercator()
            .center([107, 31])
            .scale(850)
            .translate([width/2, height/2]);
        path = d3.geo.path()
            .projection(projection);

        d3.json("china.geojson", (error, root)->
            if (error)
                return console.error(error);
            console.log(root.features);
            svg.selectAll("path")
                .data( root.features )
                .enter()
                .append("path")
                .attr("stroke","#000")
                .attr("stroke-width",1)
                .attr("fill", (d,i)->
                    return color(i);
                )
                .attr("d", path )
                .attr("text", (d,i)->
                    return d.properties.name;
                )
                .on("mouseover",(d,i)->
                        d3.select(this).attr("fill","yellow");
                        d3.select('.mapText').text(d3.select(this).attr("text"));
                    )
                .on("mouseout",(d,i)->
                    d3.select(this).attr("fill",color(i));
                    d3.select('.mapText').text('');
                )
        );
        true
    svgMap();
