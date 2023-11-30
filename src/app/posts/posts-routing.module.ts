import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../auth/guards/auth-guard.guard';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  { path: '', component: PostCreateComponent, canActivate: [AuthGuardGuard] },
  { path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class PostsRoutingModule { }
