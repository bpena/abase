import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';

import { WarningSnackbarType } from '@core/components/warning-snackbar/warning-snackbar-type.enum'
import { WarningSnackbarComponent } from '@core/components/warning-snackbar/warning-snackbar.component';

@Injectable()
export class ConnectionService {

  constructor(private http: Http, public snackBar: MatSnackBar) { }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const get$ = this.http.get(url, options)
      .map(response => response.json());
    
    get$.subscribe(
      value => this.handleSuccess(value, this),
      error => this.handleError(error, this)
    );
    
    return get$;
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const post$ = this.http.post(url, body, options)
      .map(response => response.json());

    post$.subscribe(
      value => this.handleSuccess(value, this),
      error => this.handleError(error, this)
    );

    return post$;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const put$ = this.http.put(url, body, options)
      .map(response => response.json());
    
    put$.subscribe(
      value => this.handleSuccess(value, this),
      error => this.handleError(error, this)
    );
    
    return put$;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const delete$ = this.http.delete(url, options);

    delete$.subscribe(
      value => this.handleSuccess(value, this),
      error => this.handleError(error, this)
    );

    return delete$;
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const patch$ = this.http.patch(url, body, options)
      .map(response => response.json());
    
    patch$.subscribe(
      value => this.handleSuccess(value, this),
      error => this.handleError(error, this)
    );

    return patch$;
  }

  private handleSuccess(value: any, _this?: any): void {
    console.log('handleSuccess: ', value);
  }

  private handleError(error: any, _this?: any): void {
    const message = `
      ${error.statusText} <br />
      ${error.url}
    `;
    _this.snackBar.openFromComponent(WarningSnackbarComponent, {
      data: {
        type: WarningSnackbarType.ERROR,
        title: `Error: ${error.status}`,
        message: message
      },
      duration: 15000
    });
  }
}
