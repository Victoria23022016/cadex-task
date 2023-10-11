import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConeFormComponent } from './cone-form/cone-form.component';
import { ConeViewComponent } from './cone-view/cone-view.component';
import { ExprComponent } from './expr/expr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConeService } from './cone.service';

@NgModule({
  declarations: [
    AppComponent,
    ConeFormComponent,
    ConeViewComponent,
    ExprComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [ConeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
