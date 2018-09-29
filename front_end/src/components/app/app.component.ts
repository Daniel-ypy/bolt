import { Component } from '@angular/core';
import { GenerateChart } from '../../service/d3/generate.chart'
import { RaindropDataService } from '../../service/raindrop.data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(private raindropDataService: RaindropDataService) { };

  ngAfterContentInit() {
    //GenerateChart.creatRaindrop("testBand1");
    this.test() ;
  }
  public test() {
    let width = 700;
    let height = 400;
    let margin = 40;

    let svg = d3.select("#testBand1").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("padding", margin + "px");
      

    d3.csv("../../../assets/resources/raindrop.csv").then(function (data) {
      let yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height - 2 * margin, 0]);
      let yAxis = d3.axisLeft(yScale).scale(yScale).ticks(5).tickFormat(function (d) { return d * 100 + "%" });

      let xScale = d3.scaleTime()
        .domain([d3.min(data, function (d) { return Date.parse(d.time) }), 
          d3.max(data, function (d) { return Date.parse(d.time) })])
          .range([0,width-margin]).nice();
      let xAxis=d3.axisBottom(xScale).scale(xScale).ticks(6);
      svg.append("g")
      .call(yAxis)
      .selectAll(".tick line")
      .attr("x2",width-margin)
      .style("color","#ccc")
      ;
      let xAxisLine=svg.append("g").call(xAxis).attr("transform","translate(0,"+(height-2*margin)+")");
      xAxisLine.selectAll(".tick line")
      .attr("y2",-(height-2*margin))
      .style("color","#ccc")
      .attr("stroke","green")
      .attr("stroke-dasharray","2.2");
      xAxisLine.selectAll("text")
      .attr("transform","translate(0,"+-(height-2*margin-20)+")rotate(90)")
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
