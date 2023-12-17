import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  postAddTrigger = new Subject();
  constructor(private _httpService: HttpClient) { }
  getPosts(pageSize: number, currentPage: number) {
    const queryParameters = `?pagesize=${pageSize}&page=${currentPage}`;
    return this._httpService.get(`${environment.api_Url}getposts` + queryParameters);
  }
  getPostById(id: string) {
    return this._httpService.get(`${environment.api_Url}getpost/` + id);
  }
  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', content);
    postData.append('image', image, title)
    return this._httpService.post(`${environment.api_Url}createpost`, postData);
  }
  editPost(id: string, title: string, description: string, image: File | string) {
    if (typeof (image) === 'string') {
      return this._httpService.put(`${environment.api_Url}updatepost/` + id, { title, description, image });
    } else {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("image", image, title);
      return this._httpService.put(`${environment.api_Url}updatepost/` + id, fd);
    }
  }
  deletePost(postId: string | undefined) {
    return this._httpService.delete(`${environment.api_Url}deletepost/` + postId);
  }
}
