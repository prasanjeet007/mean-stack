import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  constructor(private _postService: PostService, private _router: Router) {
  }
  ngOnInit(): void {
    this.postsList = this._postService.getPosts();
    this.$postSubsciption = this._postService.postAddTrigger.subscribe(() => {
      this.postsList = this._postService.getPosts();
    });
  }
  trackPost(index: number, post: any) {
    return post;
  }
  deletePost(post: Post) {
    this.isLoading = true;
    this._postService.deletePost(post._id).subscribe((postResult) => {
      this.isLoading = false;
      this.postsList = this._postService.getPosts();
    })
  }
  postEdit(id: string) {
    this._router.navigateByUrl('posts/edit/' + id);
  }
  ngOnDestroy(): void {
    if (this.$postSubsciption) {
      this.$postSubsciption.unsubscribe();
    }
  }
}
