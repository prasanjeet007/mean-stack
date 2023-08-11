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
  getPostById(id: string) {
    return this._httpService.get("http://localhost:3000/getpost/" + id);
  }
  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', content);
    postData.append('image', image, title)
    return this._httpService.post("http://localhost:3000/createpost", postData);
  }
  editPost(id: string, title: string, description: string) {
    return this._httpService.put("http://localhost:3000/updatepost/" + id, { title, description });
  }
  deletePost(postId: string | undefined) {
    return this._httpService.delete("http://localhost:3000/deletepost/" + postId);
  }
}
