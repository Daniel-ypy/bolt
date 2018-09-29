import {
  Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'app-raindrop',
  templateUrl: './raindrop.component.html',
  styleUrls: ['./raindrop.component.css']
})
export class RaindropComponent implements OnInit {
  @Input() public data: any;
  constructor() { }
  
  ngOnInit() {
    let raindropDataService
  }

}
