import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConeFormComponent } from './cone-form/cone-form.component';
import { ConeViewComponent } from './cone-view/cone-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConeService } from './cone.service';

@NgModule({
  declarations: [AppComponent, ConeFormComponent, ConeViewComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [ConeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
