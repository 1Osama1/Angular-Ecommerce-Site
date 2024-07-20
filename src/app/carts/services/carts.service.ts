import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  sendCart(userID:number , date:any , products:any ){
    return this.http.post("https://fakestoreapi.com/carts",{userID,date,products});
  }
}
