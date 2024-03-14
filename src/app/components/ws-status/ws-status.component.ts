import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-ws-status',
  templateUrl: './ws-status.component.html',
  styleUrls: ['./ws-status.component.scss']
})
export class WsStatusComponent {
  constructor(public wsService: WebsocketService) {}
}
