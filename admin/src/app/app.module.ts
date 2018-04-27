import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpModule
  ],
  exports: [
    // MatButtonModule,
    // MatTableModule,
    // MatCheckboxModule,
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
