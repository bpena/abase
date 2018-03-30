import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WarningSnackbarType } from '@core/components/warning-snackbar/warning-snackbar-type.enum'
import { WarningSnackbarComponent } from '@core/components/warning-snackbar/warning-snackbar.component';

@Injectable()
export class ConnectionService {

  constructor(private http: Http, public snackBar: MatSnackBar) { }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  private handleSuccess(value: any, _this?: any): void {
  }

  private handleError(error: any, _this?: any): void {
    const errTitle = error.title ? error.title :
      error.status ? error.status : 'Server Error';
    
    const errMsg = error.message ? error.message : 
      error.status ? `${error.status} - ${error.statusText}` : 'Internal server error!';

    _this.snackBar.openFromComponent(WarningSnackbarComponent, {
      data: {
        type: WarningSnackbarType.ERROR,
        title: errTitle,
        message: errMsg
      },
      duration: 15000
    });
  }
}
