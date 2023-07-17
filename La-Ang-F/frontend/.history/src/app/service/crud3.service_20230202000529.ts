import { Injectable } from '@angular/core';
import{Donation} from './Donation';
import{catchError,map} from 'rxjs/operators';
import{Observable,throwError} from 'rxjs';
import{HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Crud3Service { 

    REST_API: string = 'http://127.0.0.1:8000/api/donations';
  
    httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  
    constructor(private httpClient: HttpClient) { }
  
  addEnfant(data:Enfant): Observable<any>{
    let API_URL =  `${this.REST_API}`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }
  
  
  getEnfants(){
    return this.httpClient.get(`${this.REST_API}`);
  }
  
  getEnfant(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
    }
  
    updateEnfant(id: any, data: Enfant): Observable<any> {
      let API_URL = `${this.REST_API}/${id}`;
      return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
        .pipe(catchError(this.handleError))
    }
  
    deleteEnfant(id: any ): Observable<any> {
      let API_URL = `${this.REST_API}/${id}`;
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
  