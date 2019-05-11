import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from 'src/app/shared/order';
import { map } from 'rxjs/operators';
import { Server } from 'src/app/shared/server';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private orders: Order[] = [];

  constructor(private http: HttpClient) { }

  getOrders()
  {
      this.http.get("https://localhost:5001/orders")
      .subscribe((response: Order[]) => this.orders = response);
  }

  getCustomerOrders()
  {
    return this.http.get("https://localhost:5001/customer")
      .pipe(map((data: any[]) => { return data;}));
  }

  getServers()
  {
    return this.http.get("https://localhost:5001/servers")
      .pipe(map((data: Server[]) => { return data; }));
  }

  setServerStatus(server: Server)
  {
    let body: any = JSON.stringify(server);
    console.log(body);
    let headerOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post("https://localhost:5001/change", body, { 'headers': headerOptions})
    .pipe(map((data: boolean) => { return data; }));
  }

  getMonthlySales(): Observable<any[]>
  {
    return this.http.get("https://localhost:5001/monthly")
    .pipe(map((data: any[]) => { return data; }));
  }
}
