import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkPageComponent } from './work-page/work-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", redirectTo: '/login', pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"work-page", component:WorkPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
