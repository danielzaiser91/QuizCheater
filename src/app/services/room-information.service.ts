import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomInfo } from '../interfaces/RoomInfo.api';

@Injectable({
  providedIn: 'root'
})
export class RoomInformationService {
  roomInformation$ = new BehaviorSubject<RoomInfo>({});
  constructor() {}
}
