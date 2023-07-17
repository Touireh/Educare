import { Injectable } from '@angular/core';
import{Book} from './Book';
import { Activite } from './Activite';
import{catchError,map} from 'rxjs/operators';
import{Observable,throwError} from 'rxjs';
import{HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  REST_API: string = 'http://127.0.0.1:8000/api/books';
  REST_API2: string = 'http://127.0.0.1:8000/api/activites';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient: HttpClient) { }

addBook(data:Book): Observable<any>{
  let API_URL =  `${this.REST_API}`;
  return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
}

addActivite(data:Activite): Observable<any>{
  let API_URL =  `${this.REST_API2}`;
  return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
}


getBooks(){
  return this.httpClient.get(`${this.REST_API}`);
}

getActivites(){
  return this.httpClient.get(`${this.REST_API2}`);
}

getBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
  return this.httpClient.get(API_URL, { headers: this.httpHeaders})
  .pipe(map((res:any)=>{
    return res || {}
  }),
    catchError(this.handleError))
  }

  getActivite(id: any): Observable<any> {
    let API_URL = `${this.REST_API2}/${id}`;
  return this.httpClient.get(API_URL, { headers: this.httpHeaders})
  .pipe(map((res:any)=>{
    return res || {}
  }),
    catchError(this.handleError))
  }


  updateBook(id: any, data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError))
  }

  
  updateBook(id: any, data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError))
  }

  deleteBook(id: any ): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL,  { headers: this.httpHeaders })
      .pipe(catchError(this.handleError))
  }

  deleteActivite(id: any ): Observable<any> {
    let API_URL = `${this.REST_API2}/${id}`;
    return this.httpClient.delete(API_URL,  { headers: this.httpHeaders })
      .pipe(catchError(this.handleError))
  }
  
  handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
