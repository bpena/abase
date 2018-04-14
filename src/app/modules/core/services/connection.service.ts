import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { WarningSnackbarType } from '@core/components/warning-snackbar/warning-snackbar-type.enum'
import { WarningSnackbarComponent } from '@core/components/warning-snackbar/warning-snackbar.component';
import { Router } from '@angular/router';

@Injectable()
export class ConnectionService {

  constructor(private http: Http, 
            private router: Router,
            public snackBar: MatSnackBar) { }

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

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    options = this.updateOptions(options);
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    options = this.updateOptions(options);
    return this.http.post(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    options = this.updateOptions(options);
    return this.http.put(url, body, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    options = this.updateOptions(options);
    return this.http.delete(url, options)
      .map(response => response.json())
      .catch((error: Response) => {
        this.handleError(error, this);
        return Observable.throw(error.json());
      });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
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
    const { errName, errMsg, redirectTo } = error.json();

    const errTitle = errName || 'Server Error';
    let _errMsg = '';

    if (errName === 'TokenExpiredError') {
      _errMsg = 'Tu sesión ha expirado';
    } else if (errName === 'JsonWebTokenError') {
      _errMsg = 'Ha habido un problema con tu sesión';
    } else {
      _errMsg = errMsg || 'Ha ocurrido un error. Inténtalo nuevamente';
    }
    
    _this.snackBar.openFromComponent(WarningSnackbarComponent, {
      data: {
        type: WarningSnackbarType.ERROR,
        title: errTitle,
        message: errMsg
      },
      duration: 15000
    });

    if (redirectTo) {
      this.router.navigateByUrl(redirectTo);
    }
  }
}
