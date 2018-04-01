import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bus } from '@bus/model/bus';
import { BusService } from '@bus/services/bus.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.scss']
})
export class BusDetailComponent implements OnInit, OnDestroy {
  private bus: Bus;
  private loading = true;
  private subs: Subscription;

  constructor(private activateRoute: ActivatedRoute,
    private busService: BusService) { 
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      this.subs = this.busService.getBus(params.id)
        .subscribe(_bus => {
          this.bus = _bus;
          this.loading = false;
        });
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
