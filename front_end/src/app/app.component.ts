import { Component } from '@angular/core';
import { GenerateChart } from '../service/d3/generate.chart'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngAfterContentInit() {
    GenerateChart.creatRaindrop("testBand1");
  }
}
