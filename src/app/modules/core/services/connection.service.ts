import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConnectionService {

  constructor(private http: Http) { }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const get$ = this.http.get(url, options)
      .map(response => response.json());
    
    get$.subscribe(
      success => {},
      this.handleError
    );
    
    return get$;
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const post$ = this.http.post(url, body, options)
      .map(response => response.json());

    post$.subscribe(
      success => {},
      this.handleError
    );

    return post$;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const put$ = this.http.put(url, body, options)
      .map(response => response.json());
    
    put$.subscribe(
      success => {},
      this.handleError
    );
    
    return put$;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const delete$ = this.http.delete(url, options);

    delete$.subscribe(
      success => {},
      this.handleError
    );

    return delete$;
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const patch$ = this.http.patch(url, body, options)
      .map(response => response.json());
    
    patch$.subscribe(
      success => {},
      this.handleError
    );

    return patch$;
  }

  private handleError(error: any): void {

  }
}
