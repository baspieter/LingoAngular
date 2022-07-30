import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ContentComponent } from './components/content/content.component';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'content', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
