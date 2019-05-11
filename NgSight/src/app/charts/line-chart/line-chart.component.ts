import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors'
import { ApiService } from 'src/app/services/api/api.service';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis' },
  { data: [12, 14, 46, 23, 38, 26], label: 'Image Recognition' },
  { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting' }
];

const LINE_CHART_LABELS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  lineChartData: any[] = [ {data: [], label: ''}];
  lineChartLabels: string[] = LINE_CHART_LABELS;
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend= true;
  lineChartType= 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
    let counter: number = 0;
    let labels: string[] = [];
    this._apiService.getMonthlySales()
    .subscribe((data: any[]) => 
    {
      for (let i: number = 0; i < data.length; i++) {
        let currentData: any = data[i];
        if (labels.includes(currentData.label)) {
          let index = data.indexOf(currentData);
          data.splice(index, 1);
          console.log(labels);
        }
        else {
          labels.push(currentData.label);
        }
      }
      this.lineChartData = data;
      console.log(this.lineChartData);
    console.log(counter);
  });
  }

}
