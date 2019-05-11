import { Component, OnInit, InputDecorator, Input } from '@angular/core';
import { Server } from '../shared/server';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  color: string;
  buttonText: string;
  @Input() serverInput: Server;

  ngOnInit() {
    this.serverInput.isOnline = !this.serverInput.isOnline;
    this.setServerStatus();
  }

  setServerStatus() {
    if (this.serverInput.isOnline) {
      this.serverInput.isOnline = false;
      this.color = "#FF6b6B";
      this.buttonText = "Start";
    } else {
      this.serverInput.isOnline = true;
      this.color = "#66BB6A";
      this.buttonText = "Shut Down";
    }
  }

  toggleStatus() {
    this._apiService.setServerStatus(this.serverInput)
      .subscribe((data: boolean) => {
        if (data) this.setServerStatus();
        else console.log("error");
      });
  }

}
