import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { WarningSnackbarType } from '@core/components/warning-snackbar/warning-snackbar-type.enum'
import { WarningSnackbarComponent } from '@core/components/warning-snackbar/warning-snackbar.component';

@Injectable()
export class ConnectionService {

  constructor(private http: Http, public snackBar: MatSnackBar) { }

  private updateOptions(options: RequestOptionsArgs): RequestOptionsArgs {
    const token = localStorage.getItem('token');

    options = options ? options : {};
    options.headers = options.headers ? options.headers : new Headers({});
    options.headers.set('Content-Type', 'application/json');
    if (token) {
      options.headers.set('token', token);
    }
    return options;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.updateOptions(options);
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.updateOptions(options);
    return this.http.post(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.updateOptions(options);
    return this.http.put(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.updateOptions(options);
    return this.http.delete(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.updateOptions(options);
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
    const errorObj = error.json();

    const errTitle = error.title ? error.title :
      error.statusText ? error.statusText : 'Server Error';
    
    const errMsg = errorObj.message ? `${errorObj.message} <br /> ${errorObj.error}` : 
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
