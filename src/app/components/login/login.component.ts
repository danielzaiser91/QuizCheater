import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject, filter, fromEvent, takeUntil, takeWhile } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  @ViewChild('dialog', { static: true}) dialogEl!: ElementRef<HTMLDialogElement>

  dialogType: 'new' | 'join' = 'new';
  private destroy$ = new Subject<void>();

  constructor(private websocketService: WebsocketService) {
    fromEvent(window, 'keydown').pipe(filter(() => this.dialogEl.nativeElement.open), takeUntil(this.destroy$)).subscribe((event: any) => {
      if (event.key === 'Escape') {
        this.closeDialog();
      }
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
  }

  onClickNewGame() {
    this.dialogType = 'new';
    this.showDialog();
  }

  onClickJoinGame() {
    this.dialogType = 'join';
    this.showDialog();

  }

  onSubmit(ev: Event) {
    if (this.dialogType === 'join') {
      this.joinGame(ev);
    } else if (this.dialogType === 'new') {
      this.newGame(ev);
    }
  }

  onClickDialogConfirm() {
    //
  }

  onClickDialogCancel() {
    this.closeDialog();
  }

  onInvalid(ev: Event) {
    const element = ev.target as HTMLInputElement;
    // console.log(element.value);
    // TODO: Translate error messages https://jsfiddle.net/zpkKv/2/
  }

  private showDialog() {
    this.dialogEl.nativeElement.show();
  }

  private closeDialog() {
    this.dialogEl.nativeElement.close();
  }

  private joinGame(ev: Event) {
    const formEl = ev.target as HTMLFormElement;
    this.websocketService.joinGame({
      session: formEl['session'].value
    });
  }

  private newGame(ev: Event) {
    const formEl = ev.target as HTMLFormElement;
    this.websocketService.newGame({
      hostName: formEl['hostName'].value,
      sessionPassword: formEl['sessionPassword'].value,
      maxPlayer: formEl['count'].value
    });
  }
}
