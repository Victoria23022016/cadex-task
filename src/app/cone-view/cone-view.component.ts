import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ConeService, Triangle } from '../cone.service';

@Component({
  selector: 'app-cone-view',
  templateUrl: './cone-view.component.html',
  styleUrls: ['./cone-view.component.css'],
})
export class ConeViewComponent {
  constructor(private _coneService: ConeService) {}
}
