import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarwarsComponent } from './starwars/starwars.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'fetch',
    component: StarwarsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
