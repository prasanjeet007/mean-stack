import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  postAddTrigger = new Subject();
  constructor(private _httpService: HttpClient) { }
  getPosts() {
    return this._httpService.get("http://localhost:3000/getposts");
  }
  addPosts(title: string, content: string) {
    return this._httpService.post("http://localhost:3000/createpost", { title, description: content });
  }
  deletePost(postId: string | undefined) {
    return this._httpService.delete("http://localhost:3000/deletepost/" + postId);
  }
}
