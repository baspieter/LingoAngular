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
import { ContentComponent } from './components/content/content.component';
import { WordComponent } from './components/content/word/word.component';
import { FinalWordComponent } from './components/content/final-word/final-word.component';
import { AddWordComponent } from './components/content/add-word/add-word.component';
import { AddFinalWordComponent } from './components/content/add-final-word/add-final-word.component';
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
    ContentComponent,
    WordComponent,
    FinalWordComponent,
    AddWordComponent,
    AddFinalWordComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ContentModule { }
