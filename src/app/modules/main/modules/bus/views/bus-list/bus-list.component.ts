import { Component, OnInit } from '@angular/core';
import { Bus } from '@bus/model/bus';
import { BusService } from '@bus/services/bus.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {
  buses: Bus[] = [];
  loading: boolean = true;

  constructor(private busService: BusService) { }

  ngOnInit() {
    this.busService.getBuses()
      .subscribe(buses => this.buses = buses);
  }

}
