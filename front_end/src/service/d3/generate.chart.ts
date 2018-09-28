import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class GenerateChart{
    constructor() {
    }

    private static width = 700;
    private static height = 400;
    private static margin = 40;
    private static yAxis;
    private static xAxis;

    public static creatRaindrop(id){
        let svg = d3.select("#"+id).append("svg")
        .attr("width", GenerateChart.width)
        .attr("height", GenerateChart.height)
        .style("padding", GenerateChart.margin + "px")
        
  
      d3.csv("../../assets/resources/raindrop.csv").then(function (data) {
        let yScale = d3.scaleLinear()
          .domain([0, 1])
          .range([GenerateChart.height - 2 * GenerateChart.margin, 0]);
        let yAxis = d3.axisLeft(yScale).scale(yScale).ticks(5).tickFormat(function (d) { return d * 100 + "%" });
  
        let xScale = d3.scaleTime()
          .domain([d3.min(data, function (d) { return Date.parse(d.time) }), 
            d3.max(data, function (d) { return Date.parse(d.time) })])
            .range([0,GenerateChart.width-GenerateChart.margin]).nice();
        let xAxis=d3.axisBottom(xScale).scale(xScale).ticks(6);
        svg.append("g")
        .call(yAxis)
        .selectAll(".tick line")
        .attr("x2",GenerateChart.width-GenerateChart.margin)
        .style("color","#ccc");

        let xAxisLine=svg.append("g").call(xAxis).attr("transform","translate(0,"+(GenerateChart.height-2*GenerateChart.margin)+")");
        xAxisLine.selectAll(".tick line")
        .attr("y2",-(GenerateChart.height-2*GenerateChart.margin))
        .style("color","#ccc")
        .attr("stroke","green")
        .attr("stroke-dasharray","2.2");
        xAxisLine.selectAll("text")
        .attr("transform","translate(0,"+-(GenerateChart.height-2*GenerateChart.margin-20)+")rotate(90)")
        let color=d3.scaleOrdinal(d3.schemeCategory10);
  
        let g=svg.append("g");
        g.selectAll("path").data(data)
        .enter()
        .append("path")
        .attr("d", function () { return raindrop(150); })
        .attr("transform", function (d) {
          return  "translate(" + xScale(Date.parse( d.time) )+ "," + yScale(d.rate) + ")"
          
          //"rotate(" + d.rate + ")"
            // + "translate(" + (height / 4 + Math.random() * height / 6) + ",0)"
            
            //+ "rotate(" + 360 * Math.random() + ")";
            + "rotate("+d.angle+")";
        })
        .attr("fill",function(){
          let random=(100*Math.random())%3;
          console.log(random);
          return color(Math.floor(random) )
        })
        .on("mouseover",function(d,i){
          let tooltip=d3.select(".tooltip");
          tooltip.html( "时间"+d.time+"<br />费率"+d.rate + "<br />测试"  + d.angle + "")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 20) + "px")
          .style("opacity",1.0);
      })
    .on("mouseout",function(d,i){
        let tooltip=d3.select(".tooltip");
        tooltip.style("opacity",0.0);
    });
        function raindrop(size) {
          var r = Math.sqrt(size / Math.PI);
          return "M" + r + ",0"
            + "A" + r + "," + r + " 0 1,1 " + -r + ",0"
            + "C"
            + -r + "," + -r + " 0," + -r + " 0," + -10 * r
            + "C0," + -r + " " + r + "," + -r + " " + r + ",0"
            + "Z";
        }
      });
    }

}