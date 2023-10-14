import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '../cone.service';
import { ConeService } from '../cone.service';

@Component({
  selector: 'app-cone-form',
  templateUrl: './cone-form.component.html',
  styleUrls: ['./cone-form.component.css'],
})
export class ConeFormComponent implements OnInit {
  form: FormGroup;
  formData: Params;
  @Output() onAdd: EventEmitter<Params> = new EventEmitter();

  constructor(private _coneServise: ConeService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      height: new FormControl('', [Validators.required]),
      radius: new FormControl('', [Validators.required]),
      segments: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.formData = { ...this.form.value };
    this._coneServise.putParams(this.formData);
    this.onAdd.emit();
  }
}
