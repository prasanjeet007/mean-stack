import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  postAddTrigger = new Subject();
  constructor() { }
  getPosts() {
    return [...this.posts];
  }
  addPosts(title: string, content: string) {
    const post: Post = { post_title: title, post_description: content };
    this.posts.push(post);
  }
}
