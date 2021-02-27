import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "login",component: LoginComponent},
  {path: "profile",component: ProfileComponent, canActivate:[AuthGuard]},//canActivate
  {path: "register",component: SingUpComponent},
  {path: "**", redirectTo: "/register"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
