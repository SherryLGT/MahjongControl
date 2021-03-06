import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewGameComponent} from './old/new-game/new-game.component';
import {WelcomeScreenComponent} from './old/welcome-screen/welcome-screen.component';
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {TablePageComponent} from "./table/table-page/table-page.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'table', component: TablePageComponent },

  // old
  { path: 'welcome-screen', component: WelcomeScreenComponent },
  { path: 'new-game', component: NewGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
