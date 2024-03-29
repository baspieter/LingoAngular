import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './shared/modules/material/material.module';
import { CdTimerModule } from 'angular-cd-timer';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameModule } from './game.module';
import { ContentModule } from './content.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    CdTimerModule,
    GameModule,
    ContentModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
