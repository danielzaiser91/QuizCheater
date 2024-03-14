import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket.service';
import { LoginComponent } from './components/login/login.component';
import { I18nPipe } from './pipes/i18n.pipe';
import { WsStatusComponent } from './components/ws-status/ws-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AppComponent, LoginComponent, I18nPipe, WsStatusComponent],
  imports: [BrowserModule, MatTooltipModule],
  providers: [WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
