import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:4300/api/";
  private ALL_REGIONS = "allregions";
  private REGION = "region";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRegions(){
    return this.httpClient.get(this.REST_API_SERVER + this.ALL_REGIONS).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRegion(id: string){
    return this.httpClient.get(this.REST_API_SERVER + this.REGION +'/' + id).pipe(retry(3), catchError(this.handleError));
  }
}
