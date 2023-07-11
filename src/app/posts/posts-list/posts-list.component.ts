import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  postsList: Post[] = [];
  constructor(private _postService: PostService) {
    this.$postSubsciption = this._postService.postAddTrigger.subscribe(() => {
      this.postsList = this._postService.getPosts();
    });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.$postSubsciption) {
      this.$postSubsciption.unsubscribe();
    }
  }
}
