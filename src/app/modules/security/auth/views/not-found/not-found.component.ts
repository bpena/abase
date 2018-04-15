import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  host: { 'class': 'view-component' },
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
