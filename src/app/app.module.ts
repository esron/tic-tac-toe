import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { Player2Service } from './player-2.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule
  ],
  providers: [Player2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
