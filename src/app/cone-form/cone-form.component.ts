import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Params, Triangle } from '../cone.service';
import { ConeService } from '../cone.service';

@Component({
  selector: 'app-cone-form',
  templateUrl: './cone-form.component.html',
  styleUrls: ['./cone-form.component.css'],
})
export class ConeFormComponent implements OnInit {
  form: FormGroup;
  formData: Params;
  updateParams: Params;
  @Output() onAdd: EventEmitter<Params> = new EventEmitter();

  constructor(private _coneServise: ConeService) {}

  ngOnInit(): void {
    this._coneServise.getParams().subscribe((resp) => {
      this.updateParams = resp;
    });

    this.form = new FormGroup({
      height: new FormControl(''),
      radius: new FormControl(''),
      segments: new FormControl(''),
    });
  }

  submit() {
    this.formData = { ...this.form.value };
    //this._coneServise.putParams(this.formData);
    this.onAdd.emit(this.formData);
    console.log(this._coneServise.onCalc(this.formData));
  }
}
