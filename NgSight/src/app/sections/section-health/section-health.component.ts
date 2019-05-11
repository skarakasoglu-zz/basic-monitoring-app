import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/shared/server';
import { ApiService } from 'src/app/services/api/api.service';

const SAMPLE_SERVERS = [
  {id: 1, name: 'dev-web', isOnline: true},
  {id: 1, name: 'dev-mail', isOnline: false},
  {id: 1, name: 'prod-web', isOnline: true},
  {id: 1, name: 'prod-mail', isOnline: true}
];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  servers: Server[] = [];

  ngOnInit() {
    this._apiService.getServers()
      .subscribe((data: Server[]) => this.servers = data);
  }

}
