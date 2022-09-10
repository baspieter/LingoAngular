import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ContentComponent } from './components/content/content.component';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'content', component: ContentComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
