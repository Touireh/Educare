import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    constructor(private http:HttpClient)
    {

    }
    private baseUrl="http://127.0.0.1:8000/api/";
    public add(form)
    {
        return this.http.post(this.baseUrl+"add",form);
    }

    public delete(id)
    {
        return this.http.post(this.baseUrl+"delete?id"+id,null);
    }

    public update(form)
    {
        return this.http.post(this.baseUrl+"update"+form);
    }
}