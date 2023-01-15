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
import { GameComponent } from './components/game/game.component';
import { FinalWordFormComponent } from './components/game/final-word-form/final-word-form.component';
import { WordFormComponent } from './components/game/word-form/word-form.component';
import { DashboardComponent } from './components/game/dashboard/dashboard.component';
import { AppModule } from './app.module';

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
    CdTimerModule
  ],
  declarations: [
    GameComponent,
    FinalWordFormComponent,
    DashboardComponent,
    WordFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class GameModule { }
