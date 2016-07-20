 $ ->
    body = d3.select("body");
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
            .attr("dx",()->
                return (xScale.rangeBand() - rectPadding)/2;
            )
            .attr("dy",(d)->
                return 20;
            )
            .attr("text-anchor","middle")
            .attr("fill","#fff")
            .text((d)->
                return d;
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
