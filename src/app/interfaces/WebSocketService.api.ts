export enum ResponseTypes {
  newGame = 'newGame',
  connectionSuccess = 'connectionSuccess',
  roomClosed = 'roomClosed'
}
export enum RequestTypes {
  newGame = 'newGame',
  joinGame = 'joinGame'
}
export type ServerRequest = {
  type: RequestTypes;
  msg?: string
};
export interface NewGameRequest extends ServerRequest {
  type: RequestTypes.newGame;
  hostName: string;
  sessionPassword: string;
  maxPlayer: number;
}
export interface JoinGameRequest extends ServerRequest {
  type: RequestTypes.joinGame;
  session: string;
}

export interface ServerResponse {
  msg: string;
  type: ResponseTypes;
}
export interface NewGameResponse extends ServerResponse {
  type: ResponseTypes.newGame;
  success: boolean;
  roomID?: number;
}
export interface RoomClosedResponse extends ServerResponse {
  type: ResponseTypes.roomClosed;
  success: boolean;
  roomID?: number;
}
export interface ConnectedResponse extends ServerResponse {
  type: ResponseTypes.connectionSuccess;
}