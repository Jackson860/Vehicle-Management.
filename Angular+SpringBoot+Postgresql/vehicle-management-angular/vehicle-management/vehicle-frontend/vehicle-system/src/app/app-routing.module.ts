import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogRegComponent } from './log-reg/log-reg.component';
import { VLogsuccessComponent } from './v-logsuccess/v-logsuccess.component';
import { VFormComponent } from './v-form/v-form.component';
import { VListComponent } from './v-list/v-list.component';
import { VEditComponent } from './v-edit/v-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: 'log-reg', component: LogRegComponent },
  { path: 'login', component: LogRegComponent },
  
  { path: 'v-logsuccess', component: VLogsuccessComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'v-form', component: VFormComponent },
  { path: 'v-list', component: VListComponent , canActivate: [AuthGuard]},
  { path: 'v-edit/:id', component: VEditComponent },
  { path: 'v-edit', component: VEditComponent },
  { path: 'change-password', component: ChangePasswordComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
