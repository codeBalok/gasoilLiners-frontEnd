import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private endpoint = 'https://localhost:44387/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  public Get(url: string): Observable<any> {
    return this.httpClient.get(this.endpoint  + url, this.httpOptions).pipe(map(this.extractData));
  }

  public Post(url: string, body: any): Observable<any> {
    return this.httpClient.post(this.endpoint + url, body, this.httpOptions).pipe(map(this.extractData));
  }

  public Put(url: string, body: any): Observable<any> {
    return this.httpClient.put(this.endpoint + url, body, this.httpOptions).pipe(map(this.extractData));
  }


  private extractData(res: Response) {
    console.log(res);
    let body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
