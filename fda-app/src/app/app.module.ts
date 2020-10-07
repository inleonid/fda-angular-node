import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContinentComponent } from './continent/continent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContinentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,   
    HttpClientModule, GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
