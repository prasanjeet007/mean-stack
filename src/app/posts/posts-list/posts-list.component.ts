import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  $postSubsciption!: Subscription;
  panelOpenState = false;
  postsList!: Observable<any>;
  isLoading: boolean = false;
  totalPosts: number = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private _postService: PostService, private _router: Router, private _authService: AuthService) {
  }
  ngOnInit(): void {
    this.postsList = this._postService.getPosts(this.postsPerPage, this.currentPage);
    this.$postSubsciption = this._postService.postAddTrigger.subscribe(() => {
      this.postsList = this._postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
  trackPost(index: number, post: any) {
    return post;
  }
  deletePost(post: Post) {
    this.isLoading = true;
    this._postService.deletePost(post._id).subscribe((postResult) => {
      this.isLoading = false;
      this.postsList = this._postService.getPosts(this.postsPerPage, this.currentPage);
    })
  }
  postEdit(id: string) {
    this._router.navigateByUrl('posts/edit/' + id);
  }
  onChangePage(page: PageEvent) {
    this.postsPerPage = page?.pageSize;
    this.currentPage = page?.pageIndex + 1;
    this.postsList = this._postService.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy(): void {
    if (this.$postSubsciption) {
      this.$postSubsciption.unsubscribe();
    }
  }
}
