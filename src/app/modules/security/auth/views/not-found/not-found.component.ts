import { Component, OnInit } from '@angular/core';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-not-found',
  host: { 'class': 'view-component' },
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private i18n: AuthI18NService) { }

  ngOnInit() {
  }

}
