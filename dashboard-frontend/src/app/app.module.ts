import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,      // needed for ngModel in forms
    HttpClientModule, // needed for HTTP requests
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}