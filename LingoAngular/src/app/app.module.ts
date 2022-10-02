import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { GameComponent } from './components/game/game.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { WordComponent } from './components/content/word/word.component';
import { FinalWordComponent } from './components/content/final-word/final-word.component';
import { AddWordComponent } from './components/content/add-word/add-word.component';
import { AddFinalWordComponent } from './components/content/add-final-word/add-final-word.component';
import { FinalWordFormComponent } from './components/game/final-word-form/final-word-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    GameComponent,
    GameListComponent,
    WordComponent,
    FinalWordComponent,
    AddWordComponent,
    AddFinalWordComponent,
    FinalWordFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
