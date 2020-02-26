import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ApiWeatherService } from '../../services';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  dataset: any;

  constructor(private api: ApiWeatherService) { }

  ngOnInit() {
    this.loadData();
  }

  @HostBinding('class')
  get className() {
    return 'group-weather';
  }

  loadData() {
    this.api.get().subscribe(res=>{
      this.dataset = res.data;
    });
  }

}
