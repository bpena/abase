import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';
import { Bus } from '@bus/model/bus';
import { BusService } from '@bus/services/bus.service';

@Component({
  selector: 'app-bus-edit',
  templateUrl: './bus-edit.component.html',
  styleUrls: ['./bus-edit.component.scss']
})
export class BusEditComponent implements OnInit {

  editForm: FormGroup;

  constructor(private busService: BusService,
            private router: Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      number: new FormControl(null, Validators.required),
      numberPlate: new FormControl(null, Validators.required),
      alias: new FormControl(null, Validators.required),
      owner: new FormControl(null, Validators.required)
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { number, numberPlate, alias, owner } = form.value;
      const bus: Bus = {
        number,
        numberPlate,
        alias,
        owner
      };
      
      this.busService.createBus(bus)
        .subscribe(
          value => {
            console.log(value);
          },
          error => console.log('bus-edit ::: ', error)
        );
    }
  }
}
