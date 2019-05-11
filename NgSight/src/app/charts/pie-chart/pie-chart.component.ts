import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  pieChartData: number[] = [];
  pieChartLabels: string[] = [];
  colors: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', '#ffd166'],
      borderColor: '#111'
    }
  ];
  pieChartType = 'doughnut';

  ngOnInit() {
    this._apiService.getCustomerOrders().subscribe(
      (data: any[]) => 
      {
        this.pieChartData = data.map((value: any) => { return value.orderCount });
        this.pieChartLabels = data.map((value: any) => { return value.customer.name });
      });
  }

}
