import { Injectable } from "@angular/core";
import { ConnectedResponse, JoinGameRequest, NewGameRequest, NewGameResponse, RequestTypes, ResponseTypes, RoomClosedResponse, ServerRequest, ServerResponse } from "../interfaces/WebSocketService.api";
import { BehaviorSubject } from "rxjs";
import { RoomInformationService } from "./room-information.service";

@Injectable()
export class WebsocketService {
  private ws!: WebSocket;
  private messageQueue: ServerRequest[] = [];
  connectionStatus$ = new BehaviorSubject(false);
  get isConnected() {
    return this.ws.readyState === this.ws.OPEN;
  }
  get isConnecting() {
    return this.ws.readyState === this.ws.CONNECTING;
  }

  constructor(private roomInformationService: RoomInformationService) {
    this.connect();
  }

  send(msgObject: ServerRequest) {
    if (this.isConnected) {
      this.ws.send(JSON.stringify(msgObject));
    } else {
      this.messageQueue.push(msgObject);
    }
  }

  newGame(data: Omit<NewGameRequest, 'type'>) {
    this.send({
      type: RequestTypes.newGame,
      ...data
    });
  }

  joinGame(data: Omit<JoinGameRequest, 'type'>) {
    this.send({
      type: RequestTypes.joinGame,
      ...data
    })
  }

  private handleNewGameResponse(response: NewGameResponse) {
    if (!response.success) {
      console.error(response.msg);
      return;
    }
    console.log(response);
    this.roomInformationService.roomInformation$.next({
      roomID: response.roomID
    });
  }

  private handleRoomClosedResponse(response: RoomClosedResponse) {
    console.log(response.msg);
  }

  private handleConnectedResponse(response: ConnectedResponse) {
    console.log(response.msg);
  }

  private connect() {
    const ws = new WebSocket('ws://localhost:8080/');
    ws.addEventListener('open', () => {
      if (this.messageQueue.length) {
        const msgObj = this.messageQueue[this.messageQueue.length - 1];
        this.send(msgObj);
        this.messageQueue = [];
      }
    });
    ws.addEventListener('close', () => {
      setTimeout((() => this.connect()).bind(this), 1000);
      console.warn('ws connection closed');
    });
    ws.addEventListener('message', msg => {
      if (typeof msg?.data !== 'string') {
        console.error('server tried to send us invalid message...');
        return;
      }
      try {
        const serverResponse = JSON.parse(msg.data) as ServerResponse;
        switch(serverResponse.type) {
          case ResponseTypes.newGame: return this.handleNewGameResponse(serverResponse as NewGameResponse);
          case ResponseTypes.connectionSuccess: return this.handleConnectedResponse(serverResponse as ConnectedResponse);
          case ResponseTypes.roomClosed: return this.handleRoomClosedResponse(serverResponse as RoomClosedResponse);
          default:
            console.log('message from server:', serverResponse.msg);
            break;
        }
      } catch(e) {
        console.error(e);
      }
    });
    ws.addEventListener('error', () => {
      console.error('ws connection errored');
    });

    this.ws = ws;
  }
}
