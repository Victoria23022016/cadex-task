import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ConeService } from './cone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  coordinates: number[];

  constructor(
    private readonly _coneService: ConeService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  onUpdate(): void {
    this.coordinates = this._coneService.getCalc();
    this._cdr.detectChanges();
  }
}
