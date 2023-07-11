import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class PostsModule { }
