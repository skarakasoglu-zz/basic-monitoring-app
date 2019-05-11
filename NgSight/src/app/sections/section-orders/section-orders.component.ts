import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  pageSize = 50;
  page = 1;

  ngOnInit() {
    this._apiService.getOrders();
  }

}
